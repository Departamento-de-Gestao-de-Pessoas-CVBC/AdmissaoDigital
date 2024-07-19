<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    if (isset($_GET['userId'])) {
        $userId = $_GET['userId'];

        $sql = "SELECT 
                    cep, 
                    cidade_residencia, 
                    estado_residencia, 
                    bairro, 
                    tipo_logradouro, 
                    logradouro_residencia, 
                    numero_residencia, 
                    complemento_residencia 
                FROM usuarios 
                WHERE id='$userId';";

        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);

            $response = array(
                "cep" => $row['cep'],
                "city" => $row['cidade_residencia'],
                "state" => $row['estado_residencia'],
                "neighborhood" => $row['bairro'],
                "streetType" => $row['tipo_logradouro'],
                "street" => $row['logradouro_residencia'],
                "number" => $row['numero_residencia'],
                "complement" => $row['complemento_residencia']
            );

            echo json_encode($response);
        } else {
            echo json_encode(array("error" => "User not found"));
        }
    } else {
        echo json_encode(array("error" => "Invalid user ID"));
    }
}
$conn->close();
?>
