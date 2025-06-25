<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    header("Access-Control-Allow-Origin: http://localhost:3000");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        header("Access-Control-Allow-Origin: http://localhost:3000");
        echo json_encode(['message' => 'Неверный JSON']);
        exit;
    }

    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $deal = trim($input['deal'] ?? '');
    $telegram = trim($input['telegram'] ?? '');

    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || !in_array($deal, ['купить', 'арендовать'])) {
        http_response_code(400);
        header("Access-Control-Allow-Origin: http://localhost:3000");
        echo json_encode(['message' => 'Некорректные данные']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'rozo4ka23112006@gmail.com';
        $mail->Password = 'pbjv ixpl kesf noja';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->CharSet = 'UTF-8'; 
        $mail->Encoding = 'base64'; 

        $mail->setFrom('rozo4ka23112006@gmail.com', 'Форма обратной связи');
        $mail->addAddress('rozo4ka23112006@gmail.com'); 
        $mail->addReplyTo($email, $name); 

        // Кодируем тему в UTF-8
        $mail->Subject = '=?UTF-8?B?' . base64_encode("Новое сообщение от $name") . '?=';
        $mail->Body = "Сообщение от: $name ($email)\nТип сделки: $deal\nTelegram: $telegram";

        $mail->send();
        header("Access-Control-Allow-Origin: http://localhost:3000");
        echo json_encode(['status' => 'ok']);
    } catch (Exception $e) {
        http_response_code(500);
        header("Access-Control-Allow-Origin: http://localhost:3000");
        echo json_encode(['message' => 'Ошибка: ' . $mail->ErrorInfo]);
    }
} else {
    http_response_code(403);
    header("Access-Control-Allow-Origin: http://localhost:3000");
    echo json_encode(['message' => 'Доступ запрещен']);
}
?>