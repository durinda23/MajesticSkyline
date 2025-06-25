<?php
header('Content-Type: application/json');
require 'db.php';

$stmt = $pdo->prepare('SELECT h.*, s.status AS house_status FROM house h LEFT JOIN status s ON h.ID_status = s.ID_status WHERE h.ID_status = ?');
$stmt->execute([2]); // Фильтруем по ID_status = 2 (доступен для аренды)

$houses = $stmt->fetchAll(PDO::FETCH_ASSOC);

$baseUrl = 'http://majesticapi/';
$imagesDir = 'img/';

foreach ($houses as &$house) {
    if (!empty($house['photos'])) {
        $house['photos'] = str_replace('\\', '/', $house['photos']);
        $house['photos'] = preg_replace('/^\.\.\//', '', $house['photos']);
        $house['photos'] = $baseUrl . $imagesDir . $house['photos'];
    }
}

echo json_encode($houses);
?>