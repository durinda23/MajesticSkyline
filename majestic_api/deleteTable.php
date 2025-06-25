<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $table = $data['table'];
    $id = $data['id'];
    $idKey = $data['idKey'] ?? 'id'; // Используем переданный idKey или 'id' по умолчанию

    $conn = new mysqli("localhost", "root", "", "agency_db");
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
        exit;
    }

    $sql = "DELETE FROM $table WHERE $idKey = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["error" => "Prepare failed: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Delete failed: " . $conn->error]);
    }

    $stmt->close();
    $conn->close();
}
?>