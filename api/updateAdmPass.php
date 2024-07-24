<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Dados de conexão do Railway
/* 
$host = "viaduct.proxy.rlwy.net";
$user = "root";
$password = "SNmpcPoRunXApXaQEuosXNaOYqGOAfyc";
$database = "railway";
$port = 58726;

$conn = new mysqli($host, $user, $password, $database, $port);
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
}
*/

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $userId = $dData['userId'];
    $newPass = $dData['newPass'];

    if ($userId != "" && $newPass != "") {
        $hashedPassword = password_hash($newPass, PASSWORD_DEFAULT);
        $sql = "UPDATE user_adm SET senha='$hashedPassword', token=1 WHERE id='$userId';";
        if (mysqli_query($conn, $sql)) {
            $result = array(
                "message" => "Senha atualizada com sucesso! Redirecionando...",
                "success" => true
            );
        } else {
            $result = array(
                "message" => "Erro ao atualizar a senha!",
                "success" => false
            );
        }
    } else {
        $result = array(
            "message" => "Preencha todos os campos!",
            "success" => false
        );
    }

    $conn->close();
    echo json_encode($result);
}
?>
