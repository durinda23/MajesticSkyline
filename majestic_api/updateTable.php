<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $table = $data['table'];
    $rowData = $data['data'];
    $idKey = $data['idKey'] ?? 'id'; // Используем переданный idKey или 'id' по умолчанию

    $conn = new mysqli("localhost", "root", "", "agency_db");
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
        exit;
    }

    // Проверка наличия id
    if (!isset($rowData['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "ID is required"]);
        exit;
    }

    $id = $conn->real_escape_string($rowData['id']);
    unset($rowData['id']); // Удаляем id из данных для обновления
    unset($rowData['idKey']); // Удаляем idKey

    // Формируем SET часть запроса
    $setClauses = [];
    foreach ($rowData as $key => $value) {
        $escapedValue = $value === null ? 'NULL' : "'" . $conn->real_escape_string($value) . "'";
        $setClauses[] = "$key = $escapedValue";
    }
    $setClause = implode(", ", $setClauses);

    $sql = "UPDATE $table SET $setClause WHERE $idKey = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["error" => "Prepare failed: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Updated successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Update failed: " . $conn->error]);
    }

    $stmt->close();
    $conn->close();
}
?>