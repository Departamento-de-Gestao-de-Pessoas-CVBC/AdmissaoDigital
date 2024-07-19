<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo json_encode(array("error" => mysqli_connect_error()));
    exit();
} else {
    if (isset($_GET['userId'])) {
        $userId = $_GET['userId'];

        $sql = "SELECT 
                    cep, 
                    cidade_residencia AS city, 
                    estado_residencia AS state, 
                    bairro AS neighborhood, 
                    tipo_logradouro AS streetType, 
                    logradouro_residencia AS street, 
                    numero_residencia AS number, 
                    complemento_residencia AS complement 
                FROM usuarios 
                WHERE id='$userId';";

        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);

            $response = array(
                "cep" => $row['cep'],
                "city" => $row['city'],
                "state" => $row['state'],
                "neighborhood" => $row['neighborhood'],
                "streetType" => $row['streetType'],
                "street" => $row['street'],
                "number" => $row['number'],
                "complement" => $row['complement']
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
