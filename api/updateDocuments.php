<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Recebe os dados do corpo da requisição POST
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os dados foram recebidos corretamente
if (!$data || empty($data['userId']) || empty($data['password']) || empty($data['formData'])) {
    echo json_encode(array("error" => "Dados inválidos ou incompletos."));
    exit();
}

// Conexão com o banco de dados
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

// Prepara a consulta SQL para atualizar os dados do usuário
$sql = "UPDATE usuarios SET 
        cpf = '" . $conn->real_escape_string($formData['cpf']) . "',
        numero_pis = '" . $conn->real_escape_string($formData['pis']) . "',
        numero_rg = '" . $conn->real_escape_string($formData['rg']) . "',
        expedidor_rg = '" . $conn->real_escape_string($formData['expRg']) . "',
        data_expedicao_rg = STR_TO_DATE('" . $conn->real_escape_string($formData['dateExpRg']) . "', '%d/%m/%Y'),
        uf_expedicao_rg = '" . $conn->real_escape_string($formData['ufRg']) . "',
        reservista = '" . $conn->real_escape_string($formData['reservist']) . "',
        titulo_eleitor = '" . $conn->real_escape_string($formData['voterRegistration']) . "',
        titulo_eleitor_zona = '" . $conn->real_escape_string($formData['electoralZone']) . "',
        titulo_eleitor_secao = '" . $conn->real_escape_string($formData['pollingStation']) . "'
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
