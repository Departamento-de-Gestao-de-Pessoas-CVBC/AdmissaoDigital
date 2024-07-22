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
  $cargo_funcao = $row['cargo'];

  // Definição do dicionário de responsabilidade
  $responsibility = array(
    "0052" => "Analista de Tecnologia da Informação",
    "0051" => "Analista Legislativo",
    "0117" => "Assessor(a) Parlamentar",
    "0062" => "Auxiliar de Almoxarifado",
    "0001" => "Auxiliar de Secretaria",
    "0054" => "Contador(a)",
    "0122" => "Controlador(a) Geral",
    "0118" => "Controlador(a) Interno",
    "0063" => "Copeira(o)",
    "0106" => "Diretor(a) de Administração e Planejamento",
    "0107" => "Diretor(a) de Câmara Mirim",
    "0108" => "Diretor(a) de Compras",
    "0109" => "Diretor(a) de Comunicação Social e TV",
    "0124" => "Diretor(a) de Finanças",
    "0116" => "Diretor(a) de Gabinete da Presidência",
    "0110" => "Diretor(a) de Gestão de Pessoas",
    "0111" => "Diretor(a) de Patrimônio",
    "0112" => "Diretor(a) de Plenário",
    "0113" => "Diretor(a) de Projetos",
    "0123" => "Diretor(a) de Transparência e Ouvidoria",
    "0121" => "Estagiário(a) - Educação Especial",
    "0036" => "Estagiário(a) - Nível Superior",
    "0064" => "Guarda Patrimonial",
    "0053" => "Jornalista",
    "0059" => "Motorista",
    "0120" => "Oficial de Manutenção Predial",
    "0050" => "Procurador",
    "0104" => "Procurador Geral",
    "0125" => "Secretário(a) de Administração e Finanças",
    "0103" => "Secretário(a) Parlamentar",
    "0056" => "Técnico do Legislativo",
    "0119" => "Técnico em Audiovisual",
    "0058" => "Técnico em Contabilidade",
    "0057" => "Técnico em Informática",
    "0061" => "Telefonista"
);

  // Verifica se o valor da responsabilidade existe no dicionário
  if (array_key_exists($cargo_funcao, $responsibility)) {
    $cargo_funcao_label = $responsibility[$cargo_funcao];
  } else {
    $cargo_funcao_label = "Desconhecido"; // Ou qualquer valor padrão de sua escolha
  }

  // Carrega o conteúdo HTML da Aptidao_legal.html
  $aptidaoLegalHTML = file_get_contents('C:\xampp\htdocs\Teste\AdmissaoDigital\src\DocumentacaoHTML\Aptidao_legal.html');

  // Substitui os marcadores pelos dados do usuário
  $aptidaoLegalHTML = str_replace(
    array('{nome}', '{cpf}', '{cargo_funcao}'),
    array($nome, $cpf, $cargo_funcao_label),
    $aptidaoLegalHTML
  );

  // Fecha a conexão com o banco de dados
  $conn->close();

  // Retorna o HTML como JSON
  echo json_encode(array("html" => $aptidaoLegalHTML));

} else {
  echo json_encode(array("error" => "Usuário não encontrado."));
}

?>
