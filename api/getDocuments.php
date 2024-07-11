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
                    cpf, 
                    numero_pis, 
                    numero_rg, 
                    expedidor_rg, 
                    data_expedicao_rg, 
                    uf_expedicao_rg, 
                    reservista, 
                    titulo_eleitor, 
                    titulo_eleitor_zona, 
                    titulo_eleitor_secao 
                FROM usuarios 
                WHERE id='$userId';";

        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);

            $response = array(
                "cpf" => $row['cpf'],
                "pis" => $row['numero_pis'],
                "rg" => $row['numero_rg'],
                "expRg" => $row['expedidor_rg'],
                "dateExpRg" => $row['data_expedicao_rg'],
                "ufRg" => $row['uf_expedicao_rg'],
                "reservist" => $row['reservista'],
                "voterRegistration" => $row['titulo_eleitor'],
                "electoralZone" => $row['titulo_eleitor_zona'],
                "pollingStation" => $row['titulo_eleitor_secao']
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
