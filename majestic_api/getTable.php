<?php
header('Content-Type: application/json');
require 'db.php';

$table = $_GET['table'] ?? '';
// Массив разрешенных таблиц и представлений
$allowedEntities = [
    'agent', 'client', 'deal', 'house', 'review', 'status', 'type_house',
    'view1', 'view2', 'view3', 'view4', 'view5', 'view6', 'view7', 'view8', 'view9', 'view10'
];

if (!$table || !in_array($table, $allowedEntities)) {
    echo json_encode([]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM `$table`");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка выполнения запроса: ' . $e->getMessage()]);
    exit;
}
?>