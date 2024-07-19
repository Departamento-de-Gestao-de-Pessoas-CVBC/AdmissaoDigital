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

        // Query to get the job title (cargo) from the usuarios table
        $sql_cargo = "SELECT cargo FROM usuarios WHERE id='$userId'";
        $res_cargo = mysqli_query($conn, $sql_cargo);

        if (mysqli_num_rows($res_cargo) != 0) {
            $row_cargo = mysqli_fetch_array($res_cargo);
            $cargo = $row_cargo['cargo'];

            // Query to get the dependents from the usuario_dependentes table
            $sql_dependents = "SELECT nome, cpf, data_nasc FROM usuario_dependentes WHERE id_usuario='$userId'";
            $res_dependents = mysqli_query($conn, $sql_dependents);

            $dependents = array();
            while ($row_dependents = mysqli_fetch_assoc($res_dependents)) {
                $dependents[] = array(
                    "name" => $row_dependents['nome'],
                    "cpf" => $row_dependents['cpf'],
                    "birthdate" => $row_dependents['data_nasc']
                );
            }

            $response = array(
                "cargo" => $cargo,
                "dependents" => $dependents
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
