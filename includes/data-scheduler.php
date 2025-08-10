<?php
/**
 * MVR 실시간 데이터 업데이트 스케줄러
 * 자동으로 연구 데이터를 업데이트하고 캐시를 관리
 */

require_once '../config/server-config.php';

class MVRDataScheduler {
    private $db;
    private $cacheDir;
    private $logFile;
    
    public function __construct() {
        $this->db = DatabaseConfig::getConnection();
        $this->cacheDir = __DIR__ . '/../cache';
        $this->logFile = __DIR__ . '/../logs/scheduler.log';
        
        // 캐시 디렉토리 생성
        if (!file_exists($this->cacheDir)) {
            mkdir($this->cacheDir, 0755, true);
        }
    }
    
    public function runScheduledTasks() {
        $this->log("Scheduler started at " . date('Y-m-d H:i:s'));
        
        try {
            // 연구 진행률 업데이트
            $this->updateResearchProgress();
            
            // 통계 데이터 갱신
            $this->updateStatistics();
            
            // 캐시 정리
            $this->cleanupCache();
            
            // 시스템 상태 체크
            $this->checkSystemHealth();
            
            $this->log("All scheduled tasks completed successfully");
            
        } catch (Exception $e) {
            $this->log("Error in scheduled tasks: " . $e->getMessage(), 'ERROR');
        }
    }
    
    private function updateResearchProgress() {
        $this->log("Updating research progress data...");
        
        // 시뮬레이션된 진행률 업데이트 (실제로는 데이터베이스에서 가져옴)
        $progressData = [
            'myopia_control' => $this->calculateProgress('myopia_control'),
            'neural_stimulation' => $this->calculateProgress('neural_stimulation'),
            'visual_cognition' => $this->calculateProgress('visual_cognition'),
            'biometric_analysis' => $this->calculateProgress('biometric_analysis')
        ];
        
        // 캐시에 저장
        $this->saveToCache('research_progress', $progressData);
        
        $this->log("Research progress data updated");
    }
    
    private function calculateProgress($projectType) {
        // 실제 환경에서는 데이터베이스 쿼리 수행
        $baseProgress = [
            'myopia_control' => 75,
            'neural_stimulation' => 60,
            'visual_cognition' => 90,
            'biometric_analysis' => 45
        ][$projectType];
        
        // 랜덤 변화 시뮬레이션 (±2%)
        $change = (mt_rand(-200, 200) / 100);
        $newProgress = max(0, min(100, $baseProgress + $change));
        
        return round($newProgress, 1);
    }
    
    private function updateStatistics() {
        $this->log("Updating statistics...");
        
        $stats = [
            'total_participants' => $this->getParticipantCount(),
            'active_sessions' => $this->getActiveSessionCount(),
            'completion_rate' => $this->getCompletionRate(),
            'last_updated' => date('c')
        ];
        
        $this->saveToCache('statistics', $stats);
        
        $this->log("Statistics updated");
    }
    
    private function getParticipantCount() {
        // 시뮬레이션된 참가자 수 (실제로는 DB 쿼리)
        return 314 + mt_rand(0, 5); // 천천히 증가
    }
    
    private function getActiveSessionCount() {
        // 시간대별 활성 세션 시뮬레이션
        $hour = (int)date('H');
        if ($hour >= 9 && $hour <= 17) {
            return mt_rand(20, 40); // 업무시간
        } else {
            return mt_rand(5, 15); // 비업무시간
        }
    }
    
    private function getCompletionRate() {
        return round(87.3 + (mt_rand(-50, 50) / 100), 1);
    }
    
    private function cleanupCache() {
        $this->log("Cleaning up cache...");
        
        $cacheFiles = glob($this->cacheDir . '/*.json');
        $maxAge = 3600; // 1시간
        $cleaned = 0;
        
        foreach ($cacheFiles as $file) {
            if (time() - filemtime($file) > $maxAge) {
                unlink($file);
                $cleaned++;
            }
        }
        
        $this->log("Cache cleanup completed. Removed {$cleaned} old files");
    }
    
    private function checkSystemHealth() {
        $this->log("Checking system health...");
        
        $health = [
            'memory_usage' => memory_get_usage(true),
            'memory_peak' => memory_get_peak_usage(true),
            'disk_space' => disk_free_space('/'),
            'load_average' => sys_getloadavg(),
            'timestamp' => time()
        ];
        
        // 메모리 사용량 체크
        $memoryLimitBytes = $this->convertToBytes(ini_get('memory_limit'));
        $memoryUsagePercent = ($health['memory_usage'] / $memoryLimitBytes) * 100;
        
        if ($memoryUsagePercent > 80) {
            $this->log("WARNING: High memory usage detected: {$memoryUsagePercent}%", 'WARNING');
        }
        
        // 디스크 공간 체크
        $diskSpaceGB = round($health['disk_space'] / 1024 / 1024 / 1024, 2);
        if ($diskSpaceGB < 1) {
            $this->log("WARNING: Low disk space: {$diskSpaceGB}GB remaining", 'WARNING');
        }
        
        $this->saveToCache('system_health', $health);
        
        $this->log("System health check completed");
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
    
    private function saveToCache($key, $data) {
        $cacheFile = $this->cacheDir . '/' . $key . '.json';
        $cacheData = [
            'timestamp' => time(),
            'data' => $data
        ];
        
        file_put_contents($cacheFile, json_encode($cacheData, JSON_PRETTY_PRINT));
    }
    
    public function getFromCache($key, $maxAge = 300) {
        $cacheFile = $this->cacheDir . '/' . $key . '.json';
        
        if (!file_exists($cacheFile)) {
            return null;
        }
        
        $cacheData = json_decode(file_get_contents($cacheFile), true);
        
        if (!$cacheData || (time() - $cacheData['timestamp']) > $maxAge) {
            return null;
        }
        
        return $cacheData['data'];
    }
    
    private function log($message, $level = 'INFO') {
        $timestamp = date('Y-m-d H:i:s');
        $logEntry = "[{$timestamp}] [{$level}] {$message}" . PHP_EOL;
        
        file_put_contents($this->logFile, $logEntry, FILE_APPEND | LOCK_EX);
        
        // 콘솔 출력 (CLI 모드에서)
        if (php_sapi_name() === 'cli') {
            echo $logEntry;
        }
    }
    
    // 웹 인터페이스용 수동 실행
    public function manualUpdate() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
            switch ($_POST['action']) {
                case 'update_all':
                    $this->runScheduledTasks();
                    break;
                case 'clear_cache':
                    $this->clearAllCache();
                    break;
                case 'health_check':
                    $this->checkSystemHealth();
                    break;
            }
            
            header('Content-Type: application/json');
            echo json_encode(['status' => 'success', 'message' => 'Task completed']);
            exit;
        }
    }
    
    private function clearAllCache() {
        $files = glob($this->cacheDir . '/*.json');
        foreach ($files as $file) {
            unlink($file);
        }
        $this->log("All cache files cleared");
    }
}

// CLI에서 실행된 경우
if (php_sapi_name() === 'cli') {
    $scheduler = new MVRDataScheduler();
    $scheduler->runScheduledTasks();
} else {
    // 웹에서 접근한 경우
    $scheduler = new MVRDataScheduler();
    $scheduler->manualUpdate();
}
?>