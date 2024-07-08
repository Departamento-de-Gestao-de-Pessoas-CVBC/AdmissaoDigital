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
                    CONCAT('(', SUBSTRING(ddd_telefone_1, 1, 2), ') ', SUBSTRING(telefone_1, 1, 5), '-', SUBSTRING(telefone_1, 6)) AS phoneNumber1,
                    CONCAT('(', SUBSTRING(ddd_telefone_2, 1, 2), ') ', SUBSTRING(telefone_2, 1, 5), '-', SUBSTRING(telefone_2, 6)) AS phoneNumber2,
                    SUBSTRING(ddd_telefone_1, 1, 2) AS ddd1,
                    SUBSTRING(ddd_telefone_2, 1, 2) AS ddd2,
                    email_1 as email1, 
                    email_2 as email2 
                FROM usuarios 
                WHERE id='$userId';";

        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);

            $response = array(
                "phoneNumber1" => $row['phoneNumber1'],
                "phoneNumber2" => $row['phoneNumber2'],
                "ddd1" => $row['ddd1'],
                "ddd2" => $row['ddd2'],
                "email1" => $row['email1'],
                "email2" => $row['email2']
            );
        } else {
            $response = array("error" => "No contact data found for the given ID.");
        }
    } else {
        $response = array("error" => "No user ID provided.");
    }

    $conn->close();
    echo json_encode($response);
}
?>
