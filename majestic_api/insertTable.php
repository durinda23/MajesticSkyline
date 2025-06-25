<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$table = $data['table'] ?? '';
$fields = implode(', ', array_keys($data['data']));
$placeholders = implode(', ', array_map(function($key) { return ":$key"; }, array_keys($data['data'])));
$stmt = $pdo->prepare("INSERT INTO `$table` ($fields) VALUES ($placeholders)");
$stmt->execute($data['data']);
echo json_encode(['success' => true]);
?>