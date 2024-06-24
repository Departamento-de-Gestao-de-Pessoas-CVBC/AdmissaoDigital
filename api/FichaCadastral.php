<?php

// Permitir solicitações CORS de qualquer origem
header("Access-Control-Allow-Origin: *");
// Permitir os métodos GET, POST, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Permitir o cabeçalho "Content-Type" para requisições com o método "POST"
header("Access-Control-Allow-Headers: Content-Type");
// Permitir que o navegador envie cookies na solicitação CORS
header("Access-Control-Allow-Credentials: true");

// FichaCadastral.php

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
  $telefone = $row['telefone_1'];
  $celular = $row['telefone_2'];
  $email1 = $row['email_1'];
  $email2 = $row['email_2'];
  $cargo_funcao = $row['cargo'];
  $grau_instrucao = $row['grau_instrucao'];
  $estado_civil = $row['estado_civil'];
  $raca = $row['raca_cor'];
  $currentDate = date("d/m/Y");

  // Configura os cabeçalhos para indicar que é um documento para impressão
  header("Content-Type: text/html; charset=UTF-8");
  header("Content-Disposition: inline; filename=FichaCadastral.html");

  // Carrega o conteúdo HTML da Ficha Cadastral
  $fichaCadastralHTML = file_get_contents('C:\xampp\htdocs\Teste\AdmissaoDigital\src\DocumentacaoHTML\Ficha_Cadastral.html');

  // Substitui os marcadores pelos dados do usuário
  $fichaCadastralHTML = str_replace(
    array('{nome}', '{telefone}', '{celular}', '{email1}', '{email2}', '{cargo_funcao}', '{grau_instrucao}', '{estado_civil}', '{raca}', '{data}'),
    array($nome, $telefone, $celular, $email1, $email2, $cargo_funcao, $grau_instrucao, $estado_civil, $raca, $currentDate),
    $fichaCadastralHTML
  );

  // Imprime o conteúdo da Ficha Cadastral diretamente para a impressora
 // No final do seu PHP, em vez de imprimir diretamente, você pode retornar como JSON
    echo json_encode(array("html" => $fichaCadastralHTML));


} else {
  echo "Usuário não encontrado.";
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
