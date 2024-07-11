<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['userId']) || empty($data['newPassword'])) {
    echo json_encode(array("error" => "Dados inválidos ou incompletos."));
    exit();
}

$conn = new mysqli("localhost", "root", "", "dgp");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$userId = $conn->real_escape_string($data['userId']);
$newPassword = password_hash($data['newPassword'], PASSWORD_DEFAULT);

// Seleciona a senha atual do usuário
$sql = "SELECT senha FROM usuarios WHERE id = '$userId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $storedPassword = $row['senha'];

    // Aqui, a verificação da senha antiga foi removida do PHP
    $updateSql = "UPDATE usuarios SET senha = '$newPassword' WHERE id = '$userId'";
    if ($conn->query($updateSql) === TRUE) {
        echo json_encode(array("success" => "Senha atualizada com sucesso."));
    } else {
        echo json_encode(array("error" => "Erro ao atualizar senha: " . $conn->error));
    }
} else {
    echo json_encode(array("error" => "Usuário não encontrado."));
}

$conn->close();
?>
