<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Recebe os dados do corpo da requisição POST
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os dados foram recebidos corretamente
if (!$data || empty($data['userId']) || empty($data['password']) || empty($data['formData'])) {
    echo json_encode(array("error" => "Dados inválidos ou incompletos."));
    exit();
}

// Conexão com o banco de dados (substitua com suas credenciais e detalhes de conexão)
$conn = new mysqli("localhost", "root", "", "dgp");

// Verifica se houve erro na conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Função para recuperar a senha armazenada
function getStoredPassword($conn, $userId) {
    $sql = "SELECT senha FROM usuarios WHERE id = " . $conn->real_escape_string($userId);
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['senha'];
    } else {
        return null;
    }
}

// Recupera a senha armazenada
$storedPassword = getStoredPassword($conn, $data['userId']);

// Verifica se a senha fornecida corresponde à senha armazenada
if (!$storedPassword || !password_verify($data['password'], $storedPassword)) {
    echo json_encode(array("error" => "Senha incorreta."));
    $conn->close();
    exit();
}

// Dados do formulário recebidos
$formData = $data['formData'];

// Função para separar DDD e telefone e formatar conforme (xx) x xxxx-xxxx
function separateDDDAndPhone($phone) {
    // Remove todos os caracteres não numéricos
    $phone = preg_replace("/[^0-9]/", "", $phone);

    // Formatação do telefone para (xx) x xxxx-xxxx
    if (strlen($phone) >= 10) {
        $ddd = substr($phone, 0, 2);
        $telefone = substr($phone, 2);
        $telefoneFormatted = "(" . $ddd . ") " . substr($telefone, 0, 4) . "-" . substr($telefone, 4);
        return $telefoneFormatted;
    } else {
        return null;
    }
}

// Separa DDD e telefone para phoneNumber1
$phoneNumber1Formatted = separateDDDAndPhone($formData['phoneNumber1']);

// Separa DDD e telefone para phoneNumber2
$phoneNumber2Formatted = separateDDDAndPhone($formData['phoneNumber2']);

// Prepara a consulta SQL para atualizar os dados do usuário
$sql = "UPDATE usuarios SET 
        ddd_telefone_1 = '" . $conn->real_escape_string(substr($phoneNumber1Formatted, 1, 2)) . "',
        telefone_1 = '" . $conn->real_escape_string(substr($phoneNumber1Formatted, 5)) . "',
        ddd_telefone_2 = '" . $conn->real_escape_string(substr($phoneNumber2Formatted, 1, 2)) . "',
        telefone_2 = '" . $conn->real_escape_string(substr($phoneNumber2Formatted, 5)) . "',
        email_1 = '" . $conn->real_escape_string($formData['email1']) . "',
        email_2 = '" . $conn->real_escape_string($formData['email2']) . "'
        WHERE id = " . $conn->real_escape_string($data['userId']);

// Executa a consulta
if ($conn->query($sql) === TRUE) {
    echo json_encode(array("success" => "Dados atualizados com sucesso."));
} else {
    echo json_encode(array("error" => "Erro ao atualizar dados: " . $conn->error));
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
