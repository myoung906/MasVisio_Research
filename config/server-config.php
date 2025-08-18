<?php
/**
 * MVR Backend Server Configuration
 * XAMPP 서버 최적화 설정
 */

// PHP 설정 최적화
ini_set('memory_limit', '256M');
ini_set('max_execution_time', 300);
ini_set('max_input_vars', 3000);
ini_set('post_max_size', '50M');
ini_set('upload_max_filesize', '50M');

// 세션 설정 최적화
ini_set('session.gc_maxlifetime', 3600);
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_httponly', 1);
ini_set('session.use_strict_mode', 1);

// 출력 버퍼링 활성화
if (!ob_get_level()) {
    ob_start('ob_gzhandler');
}

// 보안 헤더 설정
function setSecurityHeaders() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Content-Security-Policy: default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data:;');
}

// 캐시 제어 헤더
function setCacheHeaders($maxAge = 3600) {
    header('Cache-Control: public, max-age=' . $maxAge);
    header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $maxAge) . ' GMT');
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime(__FILE__)) . ' GMT');
}

// 정적 파일 캐시 설정
function setStaticFileCache($file) {
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    $cacheTime = match($ext) {
        'css', 'js' => 86400, // 1일
        'png', 'jpg', 'jpeg', 'gif', 'webp' => 604800, // 1주일
        'pdf', 'doc', 'docx' => 3600, // 1시간
        default => 1800 // 30분
    };
    setCacheHeaders($cacheTime);
}

// 압축 설정
function enableCompression() {
    if (extension_loaded('zlib') && !ini_get('zlib.output_compression')) {
        if (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip') !== false) {
            ob_start('ob_gzhandler');
        }
    }
}

// 성능 모니터링 변수
$_SERVER['REQUEST_START_TIME'] = microtime(true);
$_SERVER['MEMORY_START'] = memory_get_usage();

// 에러 로깅 설정
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/php_errors.log');

// 로그 디렉토리 생성
if (!file_exists(__DIR__ . '/../logs')) {
    mkdir(__DIR__ . '/../logs', 0755, true);
}

// 데이터베이스 연결 최적화 설정
class DatabaseConfig {
    const HOST = 'localhost';
    const USERNAME = 'root';
    const PASSWORD = '';
    const DATABASE = 'mvr_research';
    const CHARSET = 'utf8mb4';
    
    // 연결 풀 설정
    const MAX_CONNECTIONS = 10;
    const CONNECTION_TIMEOUT = 30;
    const RETRY_ATTEMPTS = 3;
    
    public static function getConnection() {
        try {
            $dsn = "mysql:host=" . self::HOST . ";dbname=" . self::DATABASE . ";charset=" . self::CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_PERSISTENT => true,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . self::CHARSET . " COLLATE utf8mb4_unicode_ci"
            ];
            
            return new PDO($dsn, self::USERNAME, self::PASSWORD, $options);
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            return null;
        }
    }
}

// API 응답 최적화
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    
    // CORS 헤더 (필요시)
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// 성능 측정 함수
function getPerformanceMetrics() {
    return [
        'execution_time' => round((microtime(true) - $_SERVER['REQUEST_START_TIME']) * 1000, 2),
        'memory_usage' => round((memory_get_usage() - $_SERVER['MEMORY_START']) / 1024 / 1024, 2),
        'memory_peak' => round(memory_get_peak_usage() / 1024 / 1024, 2)
    ];
}

// 자동 초기화
setSecurityHeaders();
enableCompression();
?>