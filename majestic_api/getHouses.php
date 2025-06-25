<?php
header('Content-Type: application/json');
require 'db.php';

$houseId = $_GET['houseId'] ?? null;
$category = $_GET['category'] ?? 'buy'; // По умолчанию 'buy'
$country = $_GET['country'] ?? '';

$stmt = $pdo->prepare('SELECT h.*, s.status AS house_status FROM house h LEFT JOIN status s ON h.ID_status = s.ID_status');
if ($houseId) {
    $stmt = $pdo->prepare('SELECT h.*, s.status AS house_status FROM house h LEFT JOIN status s ON h.ID_status = s.ID_status WHERE h.ID_house = ?');
    $stmt->execute([$houseId]);
} elseif ($category === 'buy') {
    $status = 1;
    if ($country === 'Другое') {
        $stmt = $pdo->prepare('SELECT h.*, s.status AS house_status FROM house h LEFT JOIN status s ON h.ID_status = s.ID_status WHERE h.ID_status = ? AND location NOT LIKE ? AND location NOT LIKE ?');
        $stmt->execute([$status, '%Россия%', '%Испания%']);
    } else {
        $stmt = $pdo->prepare('SELECT h.*, s.status AS house_status FROM house h LEFT JOIN status s ON h.ID_status = s.ID_status WHERE h.ID_status = ? AND location LIKE ?');
        $stmt->execute([$status, "%$country%"]);
    }
} elseif ($category === 'rent') {
    $status = 2;
    if ($country === 'Другое') {
        $stmt = $pdo->prepare('SELECT h.*, s.status AS house_status FROM house h LEFT JOIN status s ON h.ID_status = s.ID_status WHERE h.ID_status = ? AND location NOT LIKE ? AND location NOT LIKE ?');
        $stmt->execute([$status, '%Россия%', '%Испания%']);
    } else {
        $stmt = $pdo->prepare('SELECT h.*, s.status AS house_status FROM house h LEFT JOIN status s ON h.ID_status = s.ID_status WHERE h.ID_status = ? AND location LIKE ?');
        $stmt->execute([$status, "%$country%"]);
    }
} else {
    echo json_encode([]);
    exit;
}

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
