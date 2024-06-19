<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
}else{
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $user = $dData['user'];
    $pass = $dData['pass'];

if($user != "" and  $pass != ""){
    $sql = "SELECT * FROM usuarios WHERE cpf='$user';";
    $res = mysqli_query($conn, $sql);

    if(mysqli_num_rows($res) != 0){
        $row = mysqli_fetch_array($res);
        if($pass != $row['senha']){
            $result = "Senha incorreta!";
        }else{
            $result = "Logado com sucesso! Redirecionando...";

        }


    }else{
        $result =  "Cpf incorreto!";
    }
}else{
    $result = "";

}
    $conn -> close();
    $response[] = array("result" => $result);
    echo json_encode($response);

}

?>