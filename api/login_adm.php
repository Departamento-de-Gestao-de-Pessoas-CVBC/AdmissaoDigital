<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $user = $dData['user'];
    $pass = $dData['pass'];

    if ($user != "" && $pass != "") {
        $sql = "SELECT * FROM user_adm WHERE usuario='$user';";
        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);
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
}
?>
