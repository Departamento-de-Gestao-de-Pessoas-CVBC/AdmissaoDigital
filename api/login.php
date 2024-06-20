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
        $sql = "SELECT * FROM usuarios WHERE cpf='$user';";
        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);
            $hashed_password_from_db = $row['senha'];

            if (password_verify($pass, $hashed_password_from_db)) {
                $result = "Logado com sucesso! Redirecionando...";
            } else {
                $result = "Senha incorreta!";
            }
        } else {
            $result = "CPF incorreto!";
        }
    } else {
        $result =  "CPF incorreto!";
    }

    $conn->close();
    $response[] = array("result" => $result);
    echo json_encode($response);
}
?>
