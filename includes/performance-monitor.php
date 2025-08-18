<?php
/**
 * MVR 성능 모니터링 시스템
 * 서버 성능, API 응답시간, 리소스 사용량 모니터링
 */

require_once '../config/server-config.php';

class MVRPerformanceMonitor {
    private $startTime;
    private $startMemory;
    private $logFile;
    private $metricsFile;
    
    public function __construct() {
        $this->startTime = microtime(true);
        $this->startMemory = memory_get_usage();
        $this->logFile = __DIR__ . '/../logs/performance.log';
        $this->metricsFile = __DIR__ . '/../logs/metrics.json';
        
        // 로그 디렉토리 확인
        $logDir = dirname($this->logFile);
        if (!file_exists($logDir)) {
            mkdir($logDir, 0755, true);
        }
    }
    
    public function startMonitoring($identifier = null) {
        $this->identifier = $identifier ?: uniqid('req_');
        $this->log("Performance monitoring started for: " . $this->identifier);
        
        // 초기 시스템 상태 기록
        $this->recordSystemMetrics();
    }
    
    public function endMonitoring() {
        $executionTime = (microtime(true) - $this->startTime) * 1000;
        $memoryUsed = memory_get_usage() - $this->startMemory;
        $peakMemory = memory_get_peak_usage();
        
        $metrics = [
            'identifier' => $this->identifier,
            'timestamp' => date('c'),
            'execution_time_ms' => round($executionTime, 2),
            'memory_used_mb' => round($memoryUsed / 1024 / 1024, 2),
            'peak_memory_mb' => round($peakMemory / 1024 / 1024, 2),
            'system_load' => $this->getSystemLoad(),
            'request_info' => $this->getRequestInfo()
        ];
        
        $this->saveMetrics($metrics);
        $this->log("Performance monitoring ended. Execution: {$executionTime}ms, Memory: " . round($memoryUsed / 1024 / 1024, 2) . "MB");
        
        return $metrics;
    }
    
    private function recordSystemMetrics() {
        $metrics = [
            'timestamp' => time(),
            'cpu_usage' => $this->getCpuUsage(),
            'memory_usage' => memory_get_usage(true),
            'memory_limit' => $this->convertToBytes(ini_get('memory_limit')),
            'disk_usage' => $this->getDiskUsage(),
            'active_connections' => $this->getActiveConnections(),
            'server_load' => $this->getSystemLoad()
        ];
        
        $this->appendToFile($this->metricsFile, $metrics);
    }
    
    private function getCpuUsage() {
        if (function_exists('sys_getloadavg')) {
            $load = sys_getloadavg();
            return $load[0]; // 1분 평균
        }
        return null;
    }
    
    private function getDiskUsage() {
        $total = disk_total_space('/');
        $free = disk_free_space('/');
        
        return [
            'total_gb' => round($total / 1024 / 1024 / 1024, 2),
            'free_gb' => round($free / 1024 / 1024 / 1024, 2),
            'used_percent' => round((($total - $free) / $total) * 100, 2)
        ];
    }
    
    private function getActiveConnections() {
        // Apache 상태 확인 (실제 환경에서는 mod_status 필요)
        return mt_rand(10, 50); // 시뮬레이션
    }
    
    private function getSystemLoad() {
        if (function_exists('sys_getloadavg')) {
            $load = sys_getloadavg();
            return [
                '1min' => $load[0],
                '5min' => $load[1],
                '15min' => $load[2]
            ];
        }
        return null;
    }
    
    private function getRequestInfo() {
        return [
            'method' => $_SERVER['REQUEST_METHOD'] ?? 'CLI',
            'uri' => $_SERVER['REQUEST_URI'] ?? 'CLI',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'CLI',
            'remote_addr' => $_SERVER['REMOTE_ADDR'] ?? 'localhost',
            'query_string' => $_SERVER['QUERY_STRING'] ?? ''
        ];
    }
    
    private function convertToBytes($val) {
        $val = trim($val);
        $last = strtolower($val[strlen($val)-1]);
        $val = (int)$val;
        
        switch($last) {
            case 'g': $val *= 1024;
            case 'm': $val *= 1024;
            case 'k': $val *= 1024;
        }
        
        return $val;
    }
    
    public function getPerformanceReport($hours = 24) {
        $metricsData = $this->loadMetrics($hours);
        
        if (empty($metricsData)) {
            return ['error' => 'No performance data available'];
        }
        
        return [
            'period' => "{$hours} hours",
            'total_requests' => count($metricsData),
            'average_response_time' => $this->calculateAverage($metricsData, 'execution_time_ms'),
            'max_response_time' => max(array_column($metricsData, 'execution_time_ms')),
            'min_response_time' => min(array_column($metricsData, 'execution_time_ms')),
            'average_memory_usage' => $this->calculateAverage($metricsData, 'memory_used_mb'),
            'peak_memory_usage' => max(array_column($metricsData, 'peak_memory_mb')),
            'slow_requests' => $this->getSlowRequests($metricsData),
            'memory_intensive_requests' => $this->getMemoryIntensiveRequests($metricsData),
            'request_distribution' => $this->getRequestDistribution($metricsData)
        ];
    }
    
    private function loadMetrics($hours) {
        if (!file_exists($this->metricsFile)) {
            return [];
        }
        
        $content = file_get_contents($this->metricsFile);
        $lines = explode("\n", trim($content));
        $metrics = [];
        $cutoffTime = time() - ($hours * 3600);
        
        foreach ($lines as $line) {
            if (empty($line)) continue;
            
            $data = json_decode($line, true);
            if ($data && isset($data['timestamp']) && $data['timestamp'] > $cutoffTime) {
                $metrics[] = $data;
            }
        }
        
        return $metrics;
    }
    
    private function calculateAverage($data, $field) {
        $values = array_column($data, $field);
        return round(array_sum($values) / count($values), 2);
    }
    
    private function getSlowRequests($data, $threshold = 1000) {
        return array_filter($data, function($item) use ($threshold) {
            return $item['execution_time_ms'] > $threshold;
        });
    }
    
    private function getMemoryIntensiveRequests($data, $threshold = 50) {
        return array_filter($data, function($item) use ($threshold) {
            return $item['memory_used_mb'] > $threshold;
        });
    }
    
    private function getRequestDistribution($data) {
        $distribution = [];
        
        foreach ($data as $item) {
            $hour = date('H', strtotime($item['timestamp']));
            $distribution[$hour] = ($distribution[$hour] ?? 0) + 1;
        }
        
        return $distribution;
    }
    
    public function generatePerformanceAlert($metrics) {
        $alerts = [];
        
        // 응답시간 체크
        if ($metrics['execution_time_ms'] > 2000) {
            $alerts[] = [
                'level' => 'warning',
                'message' => "Slow response time: {$metrics['execution_time_ms']}ms",
                'threshold' => '2000ms'
            ];
        }
        
        // 메모리 사용량 체크
        if ($metrics['memory_used_mb'] > 100) {
            $alerts[] = [
                'level' => 'warning',
                'message' => "High memory usage: {$metrics['memory_used_mb']}MB",
                'threshold' => '100MB'
            ];
        }
        
        // 시스템 로드 체크
        if (isset($metrics['system_load']['1min']) && $metrics['system_load']['1min'] > 5) {
            $alerts[] = [
                'level' => 'critical',
                'message' => "High system load: {$metrics['system_load']['1min']}",
                'threshold' => '5.0'
            ];
        }
        
        return $alerts;
    }
    
    private function saveMetrics($metrics) {
        $this->appendToFile($this->metricsFile, $metrics);
        
        // 성능 경고 체크
        $alerts = $this->generatePerformanceAlert($metrics);
        if (!empty($alerts)) {
            foreach ($alerts as $alert) {
                $this->log("[{$alert['level']}] {$alert['message']}", strtoupper($alert['level']));
            }
        }
    }
    
    private function appendToFile($file, $data) {
        $jsonData = json_encode($data) . "\n";
        file_put_contents($file, $jsonData, FILE_APPEND | LOCK_EX);
    }
    
    private function log($message, $level = 'INFO') {
        $timestamp = date('Y-m-d H:i:s');
        $logEntry = "[{$timestamp}] [{$level}] {$message}" . PHP_EOL;
        
        file_put_contents($this->logFile, $logEntry, FILE_APPEND | LOCK_EX);
    }
    
    // 웹 대시보드용 실시간 메트릭
    public function getRealTimeMetrics() {
        return [
            'timestamp' => time(),
            'memory_usage' => [
                'current' => round(memory_get_usage() / 1024 / 1024, 2),
                'peak' => round(memory_get_peak_usage() / 1024 / 1024, 2),
                'limit' => round($this->convertToBytes(ini_get('memory_limit')) / 1024 / 1024, 2)
            ],
            'system_load' => $this->getSystemLoad(),
            'disk_usage' => $this->getDiskUsage(),
            'active_connections' => $this->getActiveConnections(),
            'uptime' => $this->getUptime()
        ];
    }
    
    private function getUptime() {
        if (function_exists('shell_exec')) {
            $uptime = shell_exec('uptime -p');
            return trim($uptime);
        }
        return 'Unknown';
    }
    
    // 정리 작업 (오래된 로그 파일 삭제)
    public function cleanup($days = 30) {
        $cutoffTime = time() - ($days * 24 * 3600);
        
        // 메트릭 파일 정리
        if (file_exists($this->metricsFile)) {
            $this->cleanupMetricsFile($cutoffTime);
        }
        
        // 로그 파일 정리
        if (file_exists($this->logFile)) {
            $this->cleanupLogFile($cutoffTime);
        }
    }
    
    private function cleanupMetricsFile($cutoffTime) {
        $content = file_get_contents($this->metricsFile);
        $lines = explode("\n", trim($content));
        $filteredLines = [];
        
        foreach ($lines as $line) {
            if (empty($line)) continue;
            
            $data = json_decode($line, true);
            if ($data && isset($data['timestamp']) && $data['timestamp'] > $cutoffTime) {
                $filteredLines[] = $line;
            }
        }
        
        file_put_contents($this->metricsFile, implode("\n", $filteredLines) . "\n");
    }
    
    private function cleanupLogFile($cutoffTime) {
        // 로그 파일이 너무 크면 아카이브
        if (filesize($this->logFile) > 10 * 1024 * 1024) { // 10MB
            $archiveFile = $this->logFile . '.' . date('Y-m-d');
            rename($this->logFile, $archiveFile);
        }
    }
}

// 전역 모니터링 인스턴스
global $performanceMonitor;
$performanceMonitor = new MVRPerformanceMonitor();

// 요청 종료 시 자동으로 모니터링 종료
register_shutdown_function(function() {
    global $performanceMonitor;
    if ($performanceMonitor) {
        $performanceMonitor->endMonitoring();
    }
});
?>