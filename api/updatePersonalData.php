<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Verifica se a requisição é do tipo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array("error" => "Método de requisição não permitido."));
    exit();
}

// Recebe os dados do corpo da requisição POST
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os dados foram recebidos corretamente
if (!$data || empty($data['userId']) || empty($data['formData']) || empty($data['password'])) {
    echo json_encode(array("error" => "Dados inválidos ou incompletos."));
    exit();
}

// Conexão com o banco de dados (substitua com suas credenciais e detalhes de conexão)
$conn = new mysqli("localhost", "root", "", "dgp");

// Verifica se houve erro na conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Prepara a consulta SQL para buscar a senha criptografada do usuário
$sql = "SELECT senha FROM usuarios WHERE id = '" . $conn->real_escape_string($data['userId']) . "'";
$res = $conn->query($sql);

if ($res->num_rows > 0) {
    $row = $res->fetch_assoc();
    $hashedPassword = $row['senha'];

    // Verifica se a senha fornecida é correta
    if (password_verify($data['password'], $hashedPassword)) {
        // Dados do formulário recebidos
        $formData = $data['formData'];

        // Prepara a consulta SQL para atualizar os dados pessoais do usuário
        $sql = "UPDATE usuarios SET 
                    nome = '" . $conn->real_escape_string($formData['name']) . "',
                    nome_mae = '" . $conn->real_escape_string($formData['mothersName']) . "',
                    nome_pai = '" . $conn->real_escape_string($formData['fathersName']) . "',
                    nacionalidade = '" . $conn->real_escape_string($formData['nationality']) . "',
                    sexo = '" . $conn->real_escape_string($formData['gender']) . "',
                    estado_civil = '" . $conn->real_escape_string($formData['maritalStatus']) . "',
                    data_nascimento = '" . $conn->real_escape_string($formData['dateOfBirth']) . "',
                    cidade_nascimento = '" . $conn->real_escape_string($formData['cityOfBirth']) . "',
                    estado_nascimento = '" . $conn->real_escape_string($formData['stateOfBirth']) . "',
                    grau_instrucao = '" . $conn->real_escape_string($formData['levelOfEducation']) . "',
                    raca_cor = '" . $conn->real_escape_string($formData['breed']) . "'
                WHERE id = " . $conn->real_escape_string($data['userId']);

        // Executa a consulta
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("success" => "Dados pessoais atualizados com sucesso."));
        } else {
            echo json_encode(array("error" => "Erro ao atualizar dados pessoais: " . $conn->error));
        }
    } else {
        echo json_encode(array("error" => "Senha incorreta."));
    }
} else {
    echo json_encode(array("error" => "Usuário não encontrado."));
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
