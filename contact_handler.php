<?php
// Contact Form Handler for Visual Rehabilitation Research Website
// 시각재활 연구결과 웹사이트 연락처 폼 처리기

// 보안 설정
header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// POST 요청만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

// CSRF 보호를 위한 참조자 확인
$allowed_origins = [
    'http://localhost',
    'https://localhost',
    // 실제 도메인 추가 예정
];

$origin = $_SERVER['HTTP_REFERER'] ?? '';
$is_valid_origin = false;

foreach ($allowed_origins as $allowed) {
    if (strpos($origin, $allowed) === 0) {
        $is_valid_origin = true;
        break;
    }
}

if (!$is_valid_origin && !empty($origin)) {
    http_response_code(403);
    die('Forbidden');
}

// 폼 데이터 수집 및 검증
$errors = [];
$data = [];

// 필수 필드 정의
$required_fields = ['name', 'company', 'email', 'inquiry_type', 'subject', 'message'];

// 데이터 수집 및 기본 검증
foreach ($_POST as $key => $value) {
    $data[$key] = trim(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
}

// 필수 필드 검증
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[] = "필수 필드가 누락되었습니다: " . $field;
    }
}

// 이메일 형식 검증
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "올바른 이메일 형식이 아닙니다.";
}

// 전화번호 검증 (선택사항이지만 입력된 경우)
if (!empty($data['phone'])) {
    $phone_pattern = '/^[0-9\-\+\(\)\s]+$/';
    if (!preg_match($phone_pattern, $data['phone'])) {
        $errors[] = "올바른 전화번호 형식이 아닙니다.";
    }
}

// 개인정보 동의 확인
if (empty($data['privacy_agreement'])) {
    $errors[] = "개인정보 수집 및 이용에 동의해야 합니다.";
}

// 메시지 길이 검증
if (strlen($data['message']) > 2000) {
    $errors[] = "메시지는 2000자를 초과할 수 없습니다.";
}

// 오류가 있는 경우 처리
if (!empty($errors)) {
    $error_message = implode('<br>', $errors);
    echo "
    <!DOCTYPE html>
    <html lang='ko'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>오류 - 시각재활 연구결과</title>
        <link rel='stylesheet' href='css/style.css'>
    </head>
    <body>
        <div class='container' style='padding: 100px 20px; text-align: center;'>
            <h1 style='color: #dc2626; margin-bottom: 20px;'>문의 전송 실패</h1>
            <p style='color: #666; margin-bottom: 30px;'>$error_message</p>
            <a href='contact.html' class='btn btn-primary'>다시 시도하기</a>
        </div>
    </body>
    </html>";
    exit;
}

// 이메일 설정
$to_email = 'research@visualrehab.kr'; // 실제 이메일 주소로 변경 필요
$from_email = 'noreply@visualrehab.kr'; // 실제 도메인으로 변경 필요

// 이메일 제목 생성
$email_subject = '[시각재활 연구소] ' . $data['subject'] . ' - ' . $data['inquiry_type'];

// 이메일 본문 생성
$email_body = "
시각재활 연구소 웹사이트를 통해 새로운 문의가 접수되었습니다.

=== 문의자 정보 ===
성명: {$data['name']}
회사/기관: {$data['company']}
직책: " . ($data['position'] ?? '미입력') . "
이메일: {$data['email']}
연락처: " . ($data['phone'] ?? '미입력') . "

=== 문의 내용 ===
문의 유형: {$data['inquiry_type']}
제목: {$data['subject']}

메시지:
{$data['message']}

=== 추가 정보 ===
마케팅 수신 동의: " . (isset($data['marketing_agreement']) ? '동의' : '미동의') . "
접수 시간: " . date('Y-m-d H:i:s') . "
IP 주소: " . $_SERVER['REMOTE_ADDR'] . "
User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "

---
이 메시지는 시각재활 연구소 웹사이트(www.visualrehab.kr)에서 자동으로 생성되었습니다.
";

// 이메일 헤더
$headers = [
    'From: ' . $from_email,
    'Reply-To: ' . $data['email'],
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion()
];

// 파일 로깅 (선택사항)
$log_entry = date('Y-m-d H:i:s') . " | " . $data['email'] . " | " . $data['inquiry_type'] . " | " . $data['subject'] . PHP_EOL;
file_put_contents('logs/contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);

// 이메일 전송 시도
$mail_sent = false;
try {
    $mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));
} catch (Exception $e) {
    error_log("Contact form mail error: " . $e->getMessage());
}

// 결과 페이지 표시
if ($mail_sent) {
    // 성공 페이지
    echo "
    <!DOCTYPE html>
    <html lang='ko'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>문의 완료 - 시각재활 연구결과</title>
        <link rel='stylesheet' href='css/style.css'>
        <meta http-equiv='refresh' content='5;url=index.html'>
    </head>
    <body>
        <div class='container' style='padding: 100px 20px; text-align: center;'>
            <h1 style='color: #059669; margin-bottom: 20px;'>✅ 문의가 성공적으로 전송되었습니다!</h1>
            
            <div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 30px; margin: 30px auto; max-width: 600px;'>
                <h2 style='color: #059669; margin-bottom: 15px;'>접수 완료</h2>
                <p style='color: #166534; margin-bottom: 15px;'>
                    <strong>{$data['name']}</strong>님의 문의가 정상적으로 접수되었습니다.
                </p>
                <p style='color: #166534; margin-bottom: 15px;'>
                    문의 유형: <strong>{$data['inquiry_type']}</strong>
                </p>
                <p style='color: #166534; margin-bottom: 20px;'>
                    제목: <strong>{$data['subject']}</strong>
                </p>
                
                <div style='background: white; border-radius: 6px; padding: 20px; margin: 20px 0;'>
                    <h3 style='color: #059669; margin-bottom: 10px;'>다음 단계</h3>
                    <p style='color: #374151; margin-bottom: 10px;'>
                        📧 24시간 이내에 담당자가 <strong>{$data['email']}</strong>로 연락드립니다.
                    </p>
                    <p style='color: #374151; margin-bottom: 10px;'>
                        📞 긴급한 사안의 경우 02-1234-5678로 직접 연락해 주세요.
                    </p>
                    <p style='color: #374151;'>
                        📋 추가 자료가 필요한 경우 별도 안내해 드리겠습니다.
                    </p>
                </div>
            </div>
            
            <p style='color: #666; margin-bottom: 30px;'>
                5초 후 자동으로 홈페이지로 이동합니다.
            </p>
            
            <div>
                <a href='index.html' class='btn btn-primary' style='margin-right: 10px;'>홈으로 돌아가기</a>
                <a href='contact.html' class='btn btn-secondary'>추가 문의하기</a>
            </div>
        </div>
    </body>
    </html>";
} else {
    // 실패 페이지
    echo "
    <!DOCTYPE html>
    <html lang='ko'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>전송 실패 - 시각재활 연구결과</title>
        <link rel='stylesheet' href='css/style.css'>
    </head>
    <body>
        <div class='container' style='padding: 100px 20px; text-align: center;'>
            <h1 style='color: #dc2626; margin-bottom: 20px;'>❌ 일시적인 오류가 발생했습니다</h1>
            
            <div style='background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 30px; margin: 30px auto; max-width: 600px;'>
                <p style='color: #b91c1c; margin-bottom: 20px;'>
                    죄송합니다. 시스템 오류로 인해 문의를 전송하지 못했습니다.
                </p>
                
                <div style='background: white; border-radius: 6px; padding: 20px; margin: 20px 0;'>
                    <h3 style='color: #dc2626; margin-bottom: 10px;'>다른 연락 방법</h3>
                    <p style='color: #374151; margin-bottom: 10px;'>
                        📧 직접 이메일: research@visualrehab.kr
                    </p>
                    <p style='color: #374151; margin-bottom: 10px;'>
                        📞 전화 문의: 02-1234-5678
                    </p>
                    <p style='color: #374151;'>
                        💬 평일 09:00-18:00 운영
                    </p>
                </div>
            </div>
            
            <div>
                <a href='contact.html' class='btn btn-primary' style='margin-right: 10px;'>다시 시도하기</a>
                <a href='index.html' class='btn btn-secondary'>홈으로 돌아가기</a>
            </div>
        </div>
    </body>
    </html>";
}
?>