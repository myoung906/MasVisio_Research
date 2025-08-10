<?php
echo "<h1>서버 정보</h1>";
echo "<p>현재 디렉토리: " . __DIR__ . "</p>";
echo "<p>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";
echo "<p>서버 시간: " . date('Y-m-d H:i:s') . "</p>";

echo "<h2>mvr 디렉토리 파일 목록:</h2>";
$files = scandir(__DIR__);
echo "<ul>";
foreach($files as $file) {
    if($file != '.' && $file != '..') {
        echo "<li>$file " . (is_dir($file) ? "[DIR]" : "[FILE]") . "</li>";
    }
}
echo "</ul>";

echo "<h2>index.html 파일 존재 여부:</h2>";
if(file_exists('index.html')) {
    echo "<p style='color: green;'>✅ index.html 파일이 존재합니다!</p>";
    echo "<p>파일 크기: " . filesize('index.html') . " bytes</p>";
    echo "<p><a href='index.html'>index.html로 이동</a></p>";
} else {
    echo "<p style='color: red;'>❌ index.html 파일을 찾을 수 없습니다!</p>";
}
?>