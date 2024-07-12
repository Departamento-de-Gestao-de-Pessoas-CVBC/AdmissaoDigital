<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Detalhes da conexão Reilwai
$servername = "viaduct.proxy.rlwy.net";
$username = "root";
$password = "SNmpcPoRunXApXaQEuosXNaOYqGOAfyc";
$dbname = "railway";
$port = 58726; // Porta do banco de dados

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verifica a conexão
if ($conn->connect_error) {
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit();
} 

// Recebe os dados da requisição
$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$user = $dData['user'];
$pass = $dData['pass'];

if ($user != "" && $pass != "") {
    $sql = "SELECT * FROM user_adm WHERE usuario=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows != 0) {
        $row = $res->fetch_assoc();
        $hashed_password_from_db = $row['senha'];
        $token = $row['token'];

        if (password_verify($pass, $hashed_password_from_db)) {
            $result = array(
                "message" => "Logado com sucesso! Redirecionando...",
                "userId" => $row['id'],
                "token" => $token
            );
        } else {
            $result = array("message" => "Senha incorreta!");
        }
    } else {
        $result = array("message" => "Usuário incorreto!");
    }
} else {
    $result = array("message" => "Preencha todos os campos!");
}

$conn->close();
echo json_encode($result);
?>
