<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT * FROM usuarios WHERE id = $id";
$res = mysqli_query($conn, $sql);

$data = array();
while ($row = mysqli_fetch_assoc($res)) {
    foreach ($row as $key => $value) {
        $data[] = array($key => $value);
    }
}

echo json_encode($data);
$conn->close();
?>
