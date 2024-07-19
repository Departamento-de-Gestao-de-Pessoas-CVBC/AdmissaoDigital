<?php
// Permitir solicitações CORS de qualquer origem
header("Access-Control-Allow-Origin: *");
// Permitir os métodos GET, POST, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Permitir o cabeçalho "Content-Type" para requisições com o método "POST"
header("Access-Control-Allow-Headers: Content-Type");
// Permitir que o navegador envie cookies na solicitação CORS
header("Access-Control-Allow-Credentials: true");

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

  // Data atual
  $data = date("d/m/Y");

  // Carrega o conteúdo HTML da DeclaracaoDeBens.html
  $declaracaoBensHTML = file_get_contents('C:\xampp\htdocs\Teste\AdmissaoDigital\src\DocumentacaoHTML\DeclaracaoDeBens.html');

  // Substitui os marcadores pelos dados do usuário
  $declaracaoBensHTML = str_replace(
    array('{nome}', '{cpf}', '{data}'),
    array($nome, $cpf, $data),
    $declaracaoBensHTML
  );

  // Fecha a conexão com o banco de dados
  $conn->close();

  // Retorna o HTML como JSON
  echo json_encode(array("html" => $declaracaoBensHTML));

} else {
  echo json_encode(array("error" => "Usuário não encontrado."));
}
?>
