<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $first_name = $input['first_name'] ?? null;
    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;

    if (!$first_name || !$email || !$password) {
        http_response_code(400);
        $missing = [];
        if (!$first_name) $missing[] = 'first_name';
        if (!$email) $missing[] = 'email';
        if (!$password) $missing[] = 'password';
        echo json_encode(['message' => 'Отсутствуют поля: ' . implode(', ', $missing)]);
        exit;
    }

    // Проверка существующего пользователя  
    $stmt = $pdo->prepare("SELECT * FROM client WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(['message' => 'Пользователь с таким email уже существует.']);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO client (first_name, email, hashed_password) VALUES (?, ?, ?)");
    $stmt->execute([$first_name, $email, $hashed_password]);

    echo json_encode(['message' => 'Регистрация успешна.']);

    error_log('Request input: ' . file_get_contents('php://input'));
}
