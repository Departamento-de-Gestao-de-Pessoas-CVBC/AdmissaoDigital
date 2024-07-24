<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['userId']) || empty($data['oldPassword']) || empty($data['newPassword']) || empty($data['confirmPassword'])) {
    echo json_encode(array("error" => "Dados inválidos ou incompletos."));
    exit();
}

$conn = new mysqli("localhost", "root", "", "dgp");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$userId = $conn->real_escape_string($data['userId']);
$oldPassword = $data['oldPassword'];
$newPassword = $data['newPassword'];
$confirmPassword = $data['confirmPassword'];

if ($newPassword !== $confirmPassword) {
    echo json_encode(array("error" => "A nova senha e a confirmação não coincidem."));
    $conn->close();
    exit();
}

$sql = "SELECT senha FROM usuarios WHERE id = '$userId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $storedPassword = $row['senha'];

    if (password_verify($oldPassword, $storedPassword)) {
        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $updateSql = "UPDATE usuarios SET senha = '$newPasswordHash' WHERE id = '$userId'";
        if ($conn->query($updateSql) === TRUE) {
            echo json_encode(array("success" => "Senha atualizada com sucesso."));
        } else {
            echo json_encode(array("error" => "Erro ao atualizar senha: " . $conn->error));
        }
    } else {
        echo json_encode(array("error" => "Senha antiga incorreta."));
    }
} else {
    echo json_encode(array("error" => "Usuário não encontrado."));
}

$conn->close();

?>
