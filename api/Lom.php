<?php

// Permitir solicitações CORS de qualquer origem
header("Access-Control-Allow-Origin: *");
// Permitir os métodos GET, POST, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Permitir o cabeçalho "Content-Type" para requisições com o método "POST"
header("Access-Control-Allow-Headers: Content-Type");
// Permitir que o navegador envie cookies na solicitação CORS
header("Access-Control-Allow-Credentials: true");

// Verifica se o ID do usuário foi enviado via GET
if (!isset($_GET['id'])) {
  echo json_encode(array("error" => "ID do usuário não especificado."));
  exit;
}

// Recupera o ID do usuário da URL
$userId = $_GET['id'];

// Conecta ao banco de dados (substitua com suas credenciais e detalhes de conexão)
$conn = new mysqli("localhost", "root", "", "dgp");

// Verifica se houve erro na conexão
if ($conn->connect_error) {
  die("Erro de conexão: " . $conn->connect_error);
}

// Prepara a consulta SQL para obter os dados do usuário
$sql = "SELECT * FROM usuarios WHERE id = $userId";

// Executa a consulta
$result = $conn->query($sql);

// Verifica se encontrou o usuário
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();

  // Dados do usuário
  $nome = $row['nome'];
  $cpf = $row['cpf'];

  // Carrega o conteúdo HTML da Declaração LOM
  $lomHTML = file_get_contents('C:\xampp\htdocs\Teste\AdmissaoDigital\src\DocumentacaoHTML\DeclaracaoLom.html');

  // Substitui os marcadores pelos dados do usuário
  $lomHTML = str_replace(
    array('{nome}', '{cpf}'),
    array($nome, $cpf),
    $lomHTML
  );

  // Fecha a conexão com o banco de dados
  $conn->close();

  // Retorna o HTML como JSON
  echo json_encode(array("html" => $lomHTML));

} else {
  echo json_encode(array("error" => "Usuário não encontrado."));
}

?>
