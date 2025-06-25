<?php
session_set_cookie_params([
    'lifetime' => 0, // Сессия до закрытия браузера
    'path' => '/',
    'domain' => 'localhost',
    'secure' => false, 
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;

    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['message' => 'Все поля обязательны.']);
        exit;
    }

    // Поиск пользователя
    $stmt = $pdo->prepare("SELECT * FROM client WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['hashed_password'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Неверный email или пароль.']);
        exit;
    }

    // Сохранение данных пользователя в сессии
    $_SESSION['user'] = $user;
    $_SESSION['isAuthenticated'] = true;

    echo json_encode(['message' => 'Авторизация успешна.', 'user' => $user]);
}

// Проверка текущей сессии при GET (без logout)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['logout'])) {
    if (isset($_SESSION['user']) && $_SESSION['isAuthenticated']) {
        echo json_encode(['user' => $_SESSION['user']]);
    } else {
        echo json_encode(['user' => null]);
    }
    exit;
}

// Обработчик выхода
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['logout'])) {
    session_destroy(); // Уничтожение сессии
    http_response_code(200);
    echo json_encode(['message' => 'Выход выполнен успешно.']);
    exit;
}
?>