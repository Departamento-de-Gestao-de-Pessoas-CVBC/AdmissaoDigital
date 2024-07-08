<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array("error" => "Método de requisição não permitido."));
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['userId'])) {
    echo json_encode(array("error" => "Dados inválidos ou incompletos."));
    exit();
}

$conn = new mysqli("localhost", "root", "", "dgp");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$sql = "SELECT 
            nome,
            nome_mae as mothersName,
            nome_pai as fathersName,
            nacionalidade,
            sexo as gender,
            estado_civil as maritalStatus,
            data_nascimento as dateOfBirth,
            cidade_nascimento as cityOfBirth,
            estado_nascimento as stateOfBirth,
            grau_instrucao as levelOfEducation,
            raca_cor as breed
        FROM usuarios
        WHERE id = '" . $conn->real_escape_string($data['userId']) . "'";

$res = $conn->query($sql);

if ($res->num_rows > 0) {
    $row = $res->fetch_assoc();

    $response = array(
        "name" => $row['nome'],
        "mothersName" => $row['mothersName'],
        "fathersName" => $row['fathersName'],
        "nationality" => $row['nacionalidade'],
        "gender" => $row['gender'],
        "maritalStatus" => $row['maritalStatus'],
        "dateOfBirth" => $row['dateOfBirth'],
        "cityOfBirth" => $row['cityOfBirth'],
        "stateOfBirth" => $row['stateOfBirth'],
        "levelOfEducation" => $row['levelOfEducation'],
        "breed" => $row['breed']
    );

    echo json_encode($response);
} else {
    echo json_encode(array("error" => "Nenhum dado encontrado para o ID fornecido."));
}

$conn->close();
?>
