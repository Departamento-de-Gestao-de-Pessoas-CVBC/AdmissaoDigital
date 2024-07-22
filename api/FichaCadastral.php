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
$sql_usuario = "SELECT *, CONCAT('(', SUBSTRING(ddd_telefone_1, 1, 2), ') ', SUBSTRING(telefone_1, 1, 1), ' ', SUBSTRING(telefone_1, 2, 4),'-', SUBSTRING(telefone_1, 6)) AS phone,CONCAT('(', SUBSTRING(ddd_telefone_2, 1, 2), ') ', SUBSTRING(telefone_2, 1, 1), ' ', SUBSTRING(telefone_2, 2, 4),'-', SUBSTRING(telefone_2, 6)) AS phone2 FROM usuarios WHERE id = $userId";

// Executa a consulta para obter os dados do usuário principal
$result_usuario = $conn->query($sql_usuario);

// Verifica se encontrou o usuário principal
if ($result_usuario->num_rows > 0) {
  $row_usuario = $result_usuario->fetch_assoc();

  // Dados do usuário principal
  $nome = $row_usuario['nome'];
  $telefone = $row_usuario['phone'];
  $celular = $row_usuario['phone2'];
  $email1 = $row_usuario['email_1'];
  $email2 = $row_usuario['email_2'];
  $cargo_funcao = $row_usuario['cargo'];
  $grau_instrucao_db = $row_usuario['grau_instrucao']; // Nível de escolaridade vindo do banco de dados
  $estado_civil_db = $row_usuario['estado_civil']; // Estado civil vindo do banco de dados
  $raca_db = $row_usuario['raca_cor']; // Raça vinda do banco de dados
  $currentDate = date("d/m/Y");

  // Consulta SQL para obter os dependentes do usuário
  $sql_dependentes = "SELECT nome, cpf FROM usuario_dependentes WHERE id_usuario = $userId";

  // Executa a consulta para obter os dependentes
  $result_dependentes = $conn->query($sql_dependentes);

  // Dados dos dependentes (inicialização)
  $nomeDependente1 = '';
  $cpfDependente1 = '';
  $nomeDependente2 = '';
  $cpfDependente2 = '';
  $nomeDependente3 = '';
  $cpfDependente3 = '';
  $nomeDependente4 = '';
  $cpfDependente4 = '';
  $nomeDependente5 = '';
  $cpfDependente5 = '';

  // Verifica se encontrou dependentes
  if ($result_dependentes->num_rows > 0) {
    // Loop para obter os dados dos dependentes
    $i = 1;
    while ($row_dependente = $result_dependentes->fetch_assoc()) {
      if ($i == 1) {
        $nomeDependente1 = $row_dependente['nome'];
        $cpfDependente1 = $row_dependente['cpf'];
      } elseif ($i == 2) {
        $nomeDependente2 = $row_dependente['nome'];
        $cpfDependente2 = $row_dependente['cpf'];
      } elseif ($i == 3) {
        $nomeDependente3 = $row_dependente['nome'];
        $cpfDependente3 = $row_dependente['cpf'];
      } elseif ($i == 4) {
        $nomeDependente4 = $row_dependente['nome'];
        $cpfDependente4 = $row_dependente['cpf'];
      } elseif ($i == 5) {
        $nomeDependente5 = $row_dependente['nome'];
        $cpfDependente5 = $row_dependente['cpf'];
      }
      // Considerando até cinco dependentes para este exemplo
      $i++;
    }
  }

  // Dicionário de responsabilidades
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

  // Verifica se a responsabilidade existe no dicionário
  if (array_key_exists($cargo_funcao, $responsibility)) {
    $cargo_funcao_label = $responsibility[$cargo_funcao];
  } else {
    $cargo_funcao_label = "Desconhecido"; // Ou qualquer valor padrão de sua escolha
  }

  // Definição do dicionário de nível de escolaridade
  $levelOfEducation = array(
    "01" => "Analfabeto(a)",
    "02" => "4ª Série Incompleto",
    "03" => "4ª Série Completa",
    "04" => "5ª a 8ª Série Completa",
    "05" => "1º Grau Incompleto",
    "06" => "1º Grau Completo",
    "07" => "2º Grau Incompleto",
    "08" => "2º Grau Completo",
    "09" => "Superior Incompleto",
    "10" => "Superior Completo",
    "11" => "Pós-graduação"
  );

  // Definição do dicionário de raça
  $breed = array(
    "1" => "Branca",
    "2" => "Preta",
    "3" => "Amarela",
    "4" => "Parda",
    "5" => "Indígena",
    "6" => "Mameluco",
    "7" => "Mulato",
    "8" => "Cafuzo"
  );

  // Definição do dicionário de estado civil
  $estado_civil = array(
    "1" => "Solteiro(a)",
    "2" => "Casado(a)",
    "6" => "Separado(a)",
    "3" => "Divorciado(a)",
    "4" => "Viúvo(a)",
    "7" => "União Estável",
    "5" => "Concubinato",
    "9" => "Outros"
  );

// Verifica se o valor do nível de escolaridade existe no dicionário
if (array_key_exists($grau_instrucao_db, $levelOfEducation)) {
  $grau_instrucao_label = $levelOfEducation[$grau_instrucao_db];
} else {
  $grau_instrucao_label = "Desconhecido"; // Ou qualquer valor padrão de sua escolha
}

// Verifica se o valor da raça existe no dicionário
if (array_key_exists($raca_db, $breed)) {
  $raca_label = $breed[$raca_db];
} else {
  $raca_label = "Desconhecido"; // Ou qualquer valor padrão de sua escolha
}

// Verifica se o valor do estado civil existe no dicionário
if (array_key_exists($estado_civil_db, $estado_civil)) {
  $estado_civil_label = $estado_civil[$estado_civil_db];
} else {
  $estado_civil_label = "Desconhecido"; // Ou qualquer valor padrão de sua escolha
}

// Verifica se a responsabilidade existe no dicionário
if (array_key_exists($cargo_funcao, $responsibility)) {
  $cargo_funcao_label = $responsibility[$cargo_funcao];
} else {
  $cargo_funcao_label = "Desconhecido"; // Ou qualquer valor padrão de sua escolha
}

// Configura os cabeçalhos para indicar que é um documento para impressão
header("Content-Type: application/json; charset=UTF-8");

// Carrega o conteúdo HTML da Ficha Cadastral
$fichaCadastralHTML = file_get_contents('C:\xampp\htdocs\Teste\AdmissaoDigital\src\DocumentacaoHTML\Ficha_Cadastral.html');

// Substitui os marcadores pelos dados do usuário e dependentes
$fichaCadastralHTML = str_replace(
  array('{nome}', '{telefone}', '{celular}', '{email1}', '{email2}', '{cargo_funcao}', '{grau_instrucao}', '{estado_civil}', '{raca}', '{data}', '{nomeDependente1}', '{cpfDependente1}', '{nomeDependente2}', '{cpfDependente2}', '{nomeDependente3}', '{cpfDependente3}', '{nomeDependente4}', '{cpfDependente4}', '{nomeDependente5}', '{cpfDependente5}'),
  array($nome, $telefone, $celular, $email1, $email2, $cargo_funcao_label, $grau_instrucao_label, $estado_civil_label, $raca_label, $currentDate, $nomeDependente1, $cpfDependente1, $nomeDependente2, $cpfDependente2, $nomeDependente3, $cpfDependente3, $nomeDependente4, $cpfDependente4, $nomeDependente5, $cpfDependente5),
  $fichaCadastralHTML
);

// Retorna o HTML como JSON
echo json_encode(array("html" => $fichaCadastralHTML));

} else {
echo json_encode(array("error" => "Usuário não encontrado."));
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
