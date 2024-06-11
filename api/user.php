<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn = mysqli_connect("localhost", "root", "", "dgp");
if ($db_conn === false) {
    die("ERROS: Could Not Connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $alluser = mysqli_query($db_conn, "SELECT * FROM user_adm");
        if (mysqli_num_rows($alluser) > 0) {
            while ($row = mysqli_fetch_array($alluser)) {
                $json_array["userdata"][] = array("id" => $row['id'], "nome" => $row["usuario"], "senha" => $row['senha'], "senha" => $row["senha"]);
            }
            echo json_encode($json_array["userdata"]);
            return;
        } else {
            echo json_encode(["result" => "Pleas check the Data"]);
            return;
        }
        break;

    case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"));

        $usuario = $userpostdata->usuario;
        $senha = $userpostdata->senha;
        $result = mysqli_query($db_conn, "INSERT INTO user_adm (usuario, senha) Values('$usuario', '$senha')");

        if ($result) {
            echo json_encode(["success" => "Deu certo"]);
            return;
        } else {
            echo json_encode(["success" => "Deu errado"]);
            return;
        }
        break;
}


// https://www.youtube.com/watch?v=0vnyzs4MxSU&list=PLnMNkinxnpptsM937EGCzEgmq_5wsAnVc&index=5

?>

