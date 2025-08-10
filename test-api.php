<?php
/**
 * MVR Backend API 테스트 스크립트
 * 시스템 구성 요소들의 동작을 검증
 */

require_once 'config/server-config.php';
require_once 'includes/performance-monitor.php';
require_once 'includes/data-scheduler.php';

// 성능 모니터링 시작
global $performanceMonitor;
$performanceMonitor->startMonitoring('api-test');

echo "<h1>MVR Backend 시스템 테스트</h1>";
echo "<style>body{font-family:Arial,sans-serif;margin:20px;} .success{color:green;} .error{color:red;} .warning{color:orange;}</style>";

// 1. 서버 설정 테스트
echo "<h2>1. 서버 설정 테스트</h2>";
testServerConfiguration();

// 2. API 엔드포인트 테스트
echo "<h2>2. API 엔드포인트 테스트</h2>";
testAPIEndpoints();

// 3. 성능 모니터링 테스트
echo "<h2>3. 성능 모니터링 테스트</h2>";
testPerformanceMonitoring();

// 4. 캐시 시스템 테스트
echo "<h2>4. 캐시 시스템 테스트</h2>";
testCacheSystem();

// 5. 보안 헤더 테스트
echo "<h2>5. 보안 헤더 테스트</h2>";
testSecurityHeaders();

// 최종 성능 메트릭
echo "<h2>6. 전체 테스트 성능 메트릭</h2>";
$finalMetrics = $performanceMonitor->endMonitoring();
displayMetrics($finalMetrics);

function testServerConfiguration() {
    echo "<h3>PHP 설정 확인</h3>";
    
    $checks = [
        'memory_limit' => ini_get('memory_limit'),
        'max_execution_time' => ini_get('max_execution_time'),
        'post_max_size' => ini_get('post_max_size'),
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'session.cookie_httponly' => ini_get('session.cookie_httponly'),
        'session.use_strict_mode' => ini_get('session.use_strict_mode')
    ];
    
    foreach ($checks as $setting => $value) {
        $status = getConfigStatus($setting, $value);
        echo "<p class='{$status['class']}'>✓ {$setting}: {$value} {$status['message']}</p>";
    }
    
    echo "<h3>확장 모듈 확인</h3>";
    $extensions = ['pdo', 'pdo_mysql', 'json', 'mbstring', 'openssl'];
    
    foreach ($extensions as $ext) {
        $loaded = extension_loaded($ext);
        $class = $loaded ? 'success' : 'error';
        $status = $loaded ? '✓ 로드됨' : '✗ 미설치';
        echo "<p class='{$class}'>{$status} {$ext}</p>";
    }
}

function getConfigStatus($setting, $value) {
    $recommendations = [
        'memory_limit' => ['target' => '256M', 'min' => 128],
        'max_execution_time' => ['target' => '300', 'min' => 30],
        'post_max_size' => ['target' => '50M', 'min' => 8],
        'upload_max_filesize' => ['target' => '50M', 'min' => 2]
    ];
    
    if (isset($recommendations[$setting])) {
        $rec = $recommendations[$setting];
        $numValue = (int)$value;
        
        if ($numValue >= $rec['min']) {
            return ['class' => 'success', 'message' => '(권장사항 충족)'];
        } else {
            return ['class' => 'warning', 'message' => "(권장: {$rec['target']})"];
        }
    }
    
    return ['class' => 'success', 'message' => ''];
}

function testAPIEndpoints() {
    $endpoints = [
        'overview' => 'http://localhost/mvr/api/data.php?endpoint=overview',
        'progress' => 'http://localhost/mvr/api/data.php?endpoint=progress',
        'statistics' => 'http://localhost/mvr/api/data.php?endpoint=statistics',
        'projects' => 'http://localhost/mvr/api/data.php?endpoint=projects',
        'publications' => 'http://localhost/mvr/api/data.php?endpoint=publications',
        'realtime' => 'http://localhost/mvr/api/data.php?endpoint=realtime'
    ];
    
    foreach ($endpoints as $name => $url) {
        echo "<h4>테스트: {$name} 엔드포인트</h4>";
        
        $startTime = microtime(true);
        $result = testEndpoint($url);
        $endTime = microtime(true);
        
        $responseTime = round(($endTime - $startTime) * 1000, 2);
        
        if ($result['success']) {
            echo "<p class='success'>✓ 응답 성공 ({$responseTime}ms)</p>";
            echo "<p>데이터 크기: " . formatBytes(strlen($result['data'])) . "</p>";
            
            // JSON 유효성 검사
            $json = json_decode($result['data'], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                echo "<p class='success'>✓ 유효한 JSON 형식</p>";
                
                if (isset($json['status']) && $json['status'] === 'success') {
                    echo "<p class='success'>✓ API 상태: 성공</p>";
                } else {
                    echo "<p class='warning'>⚠ API 상태 확인 필요</p>";
                }
            } else {
                echo "<p class='error'>✗ 유효하지 않은 JSON 형식</p>";
            }
        } else {
            echo "<p class='error'>✗ 요청 실패: {$result['error']}</p>";
        }
        
        echo "<hr>";
    }
}

function testEndpoint($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $data = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        return ['success' => false, 'error' => $error];
    }
    
    if ($httpCode !== 200) {
        return ['success' => false, 'error' => "HTTP {$httpCode}"];
    }
    
    return ['success' => true, 'data' => $data];
}

function testPerformanceMonitoring() {
    global $performanceMonitor;
    
    echo "<h3>실시간 메트릭 테스트</h3>";
    
    try {
        $metrics = $performanceMonitor->getRealTimeMetrics();
        
        echo "<p class='success'>✓ 실시간 메트릭 수집 성공</p>";
        echo "<ul>";
        echo "<li>현재 메모리 사용량: {$metrics['memory_usage']['current']}MB</li>";
        echo "<li>최대 메모리 사용량: {$metrics['memory_usage']['peak']}MB</li>";
        echo "<li>메모리 제한: {$metrics['memory_usage']['limit']}MB</li>";
        echo "<li>활성 연결: {$metrics['active_connections']}</li>";
        echo "</ul>";
        
    } catch (Exception $e) {
        echo "<p class='error'>✗ 성능 모니터링 오류: {$e->getMessage()}</p>";
    }
    
    echo "<h3>성능 보고서 테스트</h3>";
    
    try {
        $report = $performanceMonitor->getPerformanceReport(1);
        
        if (isset($report['error'])) {
            echo "<p class='warning'>⚠ {$report['error']}</p>";
        } else {
            echo "<p class='success'>✓ 성능 보고서 생성 성공</p>";
            echo "<ul>";
            echo "<li>총 요청 수: {$report['total_requests']}</li>";
            echo "<li>평균 응답 시간: {$report['average_response_time']}ms</li>";
            echo "<li>최대 응답 시간: {$report['max_response_time']}ms</li>";
            echo "</ul>";
        }
        
    } catch (Exception $e) {
        echo "<p class='error'>✗ 성능 보고서 오류: {$e->getMessage()}</p>";
    }
}

function testCacheSystem() {
    $scheduler = new MVRDataScheduler();
    
    echo "<h3>캐시 시스템 테스트</h3>";
    
    // 테스트 데이터를 캐시에 저장
    $testData = ['test' => true, 'timestamp' => time()];
    
    try {
        // 리플렉션을 사용하여 private 메소드 접근
        $reflection = new ReflectionClass($scheduler);
        $saveMethod = $reflection->getMethod('saveToCache');
        $saveMethod->setAccessible(true);
        
        $saveMethod->invoke($scheduler, 'test_cache', $testData);
        echo "<p class='success'>✓ 캐시 저장 성공</p>";
        
        // 캐시에서 데이터 읽기
        $cachedData = $scheduler->getFromCache('test_cache', 300);
        
        if ($cachedData && $cachedData['test'] === true) {
            echo "<p class='success'>✓ 캐시 읽기 성공</p>";
        } else {
            echo "<p class='error'>✗ 캐시 읽기 실패</p>";
        }
        
    } catch (Exception $e) {
        echo "<p class='error'>✗ 캐시 시스템 오류: {$e->getMessage()}</p>";
    }
}

function testSecurityHeaders() {
    echo "<h3>보안 헤더 확인</h3>";
    
    $expectedHeaders = [
        'X-Frame-Options',
        'X-Content-Type-Options',
        'X-XSS-Protection',
        'Referrer-Policy',
        'Content-Security-Policy'
    ];
    
    $sentHeaders = array_change_key_case(apache_response_headers(), CASE_LOWER);
    
    foreach ($expectedHeaders as $header) {
        $headerLower = strtolower($header);
        
        if (isset($sentHeaders[$headerLower])) {
            echo "<p class='success'>✓ {$header}: {$sentHeaders[$headerLower]}</p>";
        } else {
            echo "<p class='warning'>⚠ {$header}: 미설정</p>";
        }
    }
}

function displayMetrics($metrics) {
    echo "<div style='background:#f5f5f5;padding:15px;border-radius:5px;'>";
    echo "<h4>최종 성능 메트릭</h4>";
    echo "<ul>";
    echo "<li><strong>실행 시간:</strong> {$metrics['execution_time_ms']}ms</li>";
    echo "<li><strong>메모리 사용량:</strong> {$metrics['memory_used_mb']}MB</li>";
    echo "<li><strong>최대 메모리:</strong> {$metrics['peak_memory_mb']}MB</li>";
    echo "<li><strong>요청 정보:</strong> {$metrics['request_info']['method']} {$metrics['request_info']['uri']}</li>";
    echo "</ul>";
    echo "</div>";
}

function formatBytes($size) {
    $units = ['B', 'KB', 'MB', 'GB'];
    $i = 0;
    
    while ($size >= 1024 && $i < count($units) - 1) {
        $size /= 1024;
        $i++;
    }
    
    return round($size, 2) . ' ' . $units[$i];
}

echo "<div style='margin-top:30px;padding:20px;background:#e8f5e8;border-radius:5px;'>";
echo "<h3>테스트 완료</h3>";
echo "<p>MVR Backend 시스템의 모든 구성 요소가 테스트되었습니다.</p>";
echo "<p><strong>시간:</strong> " . date('Y-m-d H:i:s') . "</p>";
echo "</div>";
?>