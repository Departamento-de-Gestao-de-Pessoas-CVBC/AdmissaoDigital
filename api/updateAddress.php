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

// Prepara a consulta SQL para atualizar os dados de endereço do usuário
$sql = "UPDATE usuarios SET 
        cep = '" . $conn->real_escape_string($formData['cep']) . "',
        cidade_residencia = '" . $conn->real_escape_string($formData['city']) . "',
        estado_residencia = '" . $conn->real_escape_string($formData['stateOfResidence']) . "',
        bairro = '" . $conn->real_escape_string($formData['neighborhood']) . "',
        tipo_logradouro = '" . $conn->real_escape_string($formData['logradouroSelect']) . "',
        logradouro_residencia = '" . $conn->real_escape_string($formData['address']) . "',
        numero_residencia = '" . $conn->real_escape_string($formData['residenceNumber']) . "',
        complemento_residencia = '" . $conn->real_escape_string($formData['complement']) . "'
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
