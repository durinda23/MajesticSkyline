<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? null;
$deal = $data['deal'] ?? null;
$content = $data['content'] ?? null;
$userId = $data['userId'] ?? null;

if (!$name || !$deal || !$content || !$userId) {
    http_response_code(400);
    echo json_encode(['message' => 'Все поля обязательны']);
    exit;
}

$stmt = $pdo->prepare('INSERT INTO review (name, deal, content, ID_client) VALUES (?, ?, ?, ?)');
$stmt->execute([$name, $deal, $content, $userId]);

echo json_encode(['message' => 'Отзыв успешно добавлен']);
?>
