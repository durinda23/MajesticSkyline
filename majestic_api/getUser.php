<?php
header('Content-Type: application/json');
require 'db.php';

$userId = $_GET['userId'] ?? null;

if (!$userId) {
    http_response_code(400);
    echo json_encode(['message' => 'Не указан ID пользователя']);
    exit;
}

$stmt = $pdo->prepare('SELECT ID_client, first_name, email, role FROM client WHERE ID_client = ?');
$stmt->execute([$userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    http_response_code(404);
    echo json_encode(['message' => 'Пользователь не найден']);
    exit;
}

echo json_encode($user);
?>