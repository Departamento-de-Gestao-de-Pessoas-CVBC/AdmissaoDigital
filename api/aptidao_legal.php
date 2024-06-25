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
    "analistaTI" => "Analista de Tecnologia da Informação",
    "analistaLE" => "Analista Legislativo",
    "assessorPA" => "Assessor(a) Parlamentar",
    "auxiliarAU" => "Auxiliar de Almoxarifado",
    "auxiliarSE" => "Auxiliar de Secretaria",
    "contador" => "Contador(a)",
    "controladorGE" => "Controlador(a) Geral",
    "controladorIN" => "Controlador(a) Interno",
    "copeira" => "Copeira(o)",
    "diretorAP" => "Diretor(a) de Administração e Planejamento",
    "diretorCM" => "Diretor(a) de Câmara Mirim",
    "diretorCO" => "Diretor(a) de Compras",
    "diretorCS" => "Diretor(a) de Comunicação Social e TV",
    "diretorFI" => "Diretor(a) de Finanças",
    "diretorGP" => "Diretor(a) de Gabinete da Presidência",
    "diretorDGP" => "Diretor(a) de Gestão de Pessoas",
    "diretorP" => "Diretor(a) de Patrimônio",
    "diretorPL" => "Diretor(a) de Plenário",
    "diretorPJ" => "Diretor(a) de Projetos",
    "diretorTO" => "Diretor(a) de Transparência e Ouvidoria",
    "estagiarioES" => "Estagiário(a) - Educação Especial",
    "0036" => "Estagiário(a) - Nível Superior",
    "guardaPM" => "Guarda Patrimonial",
    "jornalista" => "Jornalista",
    "motorista" => "Motorista",
    "oficialMP" => "Oficial de Manutenção Predial",
    "procurador" => "Procurador",
    "procuradorGE" => "Procurador Geral",
    "secretarioAF" => "Secretário(a) de Administração e Finanças",
    "secretarioP" => "Secretário(a) Parlamentar",
    "tecnicoLE" => "Técnico do Legislativo",
    "tecnicoAV" => "Técnico em Audiovisual",
    "tecnicoCB" => "Técnico em Contabilidade",
    "tecnicoIF" => "Técnico em Informática",
    "telefonista" => "Telefonista"
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
    array('{nome}', '{cpf}', '{cargo}'),
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
