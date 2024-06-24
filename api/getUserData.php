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
        
        $sql = "SELECT nome, data_nascimento, cpf, numero_pis, cargo, CONCAT(ddd_telefone_1, telefone_1) as telefone, email_1 FROM usuarios WHERE id='$userId';";
        $res = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);

            $response = array(
                "fullName" => $row['nome'],
                "birthDate" => $row['data_nascimento'],
                "cpf" => $row['cpf'],
                "pis" => $row['numero_pis'],
                "position" => $row['cargo'],
                "phone" => $row['telefone'],
                "email" => $row['email_1']
            );
        } else {
            $response = array("error" => "No user found with the given ID.");
        }
    } else {
        $response = array("error" => "No user ID provided.");
    }

    $conn->close();
    echo json_encode($response);
}
?>
