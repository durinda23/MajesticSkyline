<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Простой ответ на preflight запрос
    exit(0);
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "root"; 
$password = ""; 
$database = "agency_db"; 

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Ошибка подключения к базе данных"]));
}

// Обработка запросов
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT * FROM properties";
    $result = $conn->query($sql);

    $properties = [];
    while ($row = $result->fetch_assoc()) {
        $properties[] = $row;
    }
    echo json_encode($properties);

} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $title = $input['title'];
    $price = $input['price'];
    $location = $input['location'];

    $sql = "INSERT INTO properties (title, price, location) VALUES ('$title', '$price', '$location')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Данные добавлены"]);
    } else {
        echo json_encode(["error" => "Ошибка при добавлении данных"]);
    }
}

$conn->close();
?>
