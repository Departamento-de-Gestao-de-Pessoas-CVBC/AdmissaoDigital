<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn = mysqli_connect("localhost", "root", "", "dgp");
if ($db_conn === false) {
    die("ERROS: Could Not Connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

function validaCPF($cpf) {
    $cpf = preg_replace('/[^0-9]/is', '', $cpf);
    if (strlen($cpf) != 11) {
        return false;
    }
    if (preg_match('/(\d)\1{10}/', $cpf)) {
        return false;
    }
    for ($t = 9; $t < 11; $t++) {
        for ($d = 0, $c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }
        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }
    return true;
}

function formatPhoneNumber($phoneNumber) {
    // Remove caracteres não numéricos
    $phoneNumber = preg_replace('/\D/', '', $phoneNumber);
    return $phoneNumber;
}

function extractDDDAndNumber($phoneNumberFormatted) {
    // Remove caracteres não numéricos
    $phoneNumberFormatted = preg_replace('/\D/', '', $phoneNumberFormatted);
    $ddd = substr($phoneNumberFormatted, 0, 2);
    $number = substr($phoneNumberFormatted, 2);
    return ['ddd' => $ddd, 'number' => $number];
}

switch ($method) {
    case "GET":
        $alluser = mysqli_query($db_conn, "SELECT * FROM usuarios");
        if (mysqli_num_rows($alluser) > 0) {
            $json_array = array();
            while ($row = mysqli_fetch_assoc($alluser)) {
                $json_array[] = $row;
            }
            echo json_encode($json_array);
        } else {
            echo json_encode(["result" => "Please check the Data"]);
        }
        break;

    case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"));

        // Sanitização dos dados
        $nome = mysqli_real_escape_string($db_conn, $userpostdata->nome ?? '');
        $sexo = mysqli_real_escape_string($db_conn, $userpostdata->sexo ?? '');
        $estado_civil = mysqli_real_escape_string($db_conn, $userpostdata->estado_civil ?? '');
        $cpf = mysqli_real_escape_string($db_conn, $userpostdata->cpf ?? '');
        $data_nascimento = mysqli_real_escape_string($db_conn, $userpostdata->data_nascimento ?? '');
        $cidade_nascimento = mysqli_real_escape_string($db_conn, $userpostdata->cidade_nascimento ?? '');
        $estado_nascimento = mysqli_real_escape_string($db_conn, $userpostdata->estado_nascimento ?? '');
        $nacionalidade = mysqli_real_escape_string($db_conn, $userpostdata->nacionalidade ?? '');
        $grau_instrucao = mysqli_real_escape_string($db_conn, $userpostdata->grau_instrucao ?? '');
        $raca_cor = mysqli_real_escape_string($db_conn, $userpostdata->raca_cor ?? '');
        $nome_pai = mysqli_real_escape_string($db_conn, $userpostdata->nome_pai ?? '');
        $nome_mae = mysqli_real_escape_string($db_conn, $userpostdata->nome_mae ?? '');
        $cep = mysqli_real_escape_string($db_conn, $userpostdata->cep ?? '');
        $cidade_residencia = mysqli_real_escape_string($db_conn, $userpostdata->cidade_residencia ?? '');
        $estado_residencia = mysqli_real_escape_string($db_conn, $userpostdata->estado_residencia ?? '');
        $bairro = mysqli_real_escape_string($db_conn, $userpostdata->bairro ?? '');
        $tipo_logradouro = mysqli_real_escape_string($db_conn, $userpostdata->tipo_logradouro ?? '');
        $logradouro_residencia = mysqli_real_escape_string($db_conn, $userpostdata->logradouro_residencia ?? '');
        $numero_residencia = mysqli_real_escape_string($db_conn, $userpostdata->numero_residencia ?? '');
        $complemento_residencia = mysqli_real_escape_string($db_conn, $userpostdata->complemento_residencia ?? '');
        $numero_pis = mysqli_real_escape_string($db_conn, $userpostdata->numero_pis ?? '');
        $numero_rg = mysqli_real_escape_string($db_conn, $userpostdata->numero_rg ?? '');
        $expedidor_rg = mysqli_real_escape_string($db_conn, $userpostdata->expedidor_rg ?? '');
        $data_expedicao_rg = mysqli_real_escape_string($db_conn, $userpostdata->data_expedicao_rg ?? '');
        $uf_expedicao_rg = mysqli_real_escape_string($db_conn, $userpostdata->uf_expedicao_rg ?? '');
        $titulo_eleitor = mysqli_real_escape_string($db_conn, $userpostdata->titulo_eleitor ?? '');
        $titulo_eleitor_zona = mysqli_real_escape_string($db_conn, $userpostdata->titulo_eleitor_zona ?? '');
        $titulo_eleitor_secao = mysqli_real_escape_string($db_conn, $userpostdata->titulo_eleitor_secao ?? '');
        $reservista = mysqli_real_escape_string($db_conn, $userpostdata->reservista ?? '');
        
        // Extraindo DDD e número dos telefones
        $phoneData1 = extractDDDAndNumber($userpostdata->telefone_1 ?? '');
        $phoneData2 = extractDDDAndNumber($userpostdata->telefone_2 ?? '');
        
        $ddd_telefone_1 = mysqli_real_escape_string($db_conn, $phoneData1['ddd']);
        $telefone_1 = mysqli_real_escape_string($db_conn, $phoneData1['number']);
        $ddd_telefone_2 = mysqli_real_escape_string($db_conn, $phoneData2['ddd']);
        $telefone_2 = mysqli_real_escape_string($db_conn, $phoneData2['number']);
        
        $email_1 = mysqli_real_escape_string($db_conn, $userpostdata->email_1 ?? '');
        $email_2 = mysqli_real_escape_string($db_conn, $userpostdata->email_2 ?? '');
        $cargo = mysqli_real_escape_string($db_conn, $userpostdata->cargo ?? '');
        $senha = mysqli_real_escape_string($db_conn, $userpostdata->senha ?? '');
        $csenha = mysqli_real_escape_string($db_conn, $userpostdata->csenha ?? '');

        // Validação de CPF
        if (!validaCPF($cpf)) {
            echo json_encode(["success" => false, "message" => "CPF invalido ou já cadastrado. Tente novamente."]);
            exit();
        }

        // Verificar se a senha e a confirmação de senha são iguais
        if ($senha !== $csenha) {
            echo json_encode(["success" => false, "message" => "As senhas não correspondem."]);
            exit();
        }

        // Criptografar a senha antes de armazenar no banco de dados
        $hashedPassword = password_hash($senha, PASSWORD_DEFAULT);

        // Inserir dados do usuário na tabela 'usuarios'
        $query = "INSERT INTO usuarios (nome, sexo, estado_civil, cpf, data_nascimento, cidade_nascimento, estado_nascimento, nacionalidade, grau_instrucao, raca_cor, nome_pai, nome_mae, cep, cidade_residencia, estado_residencia, bairro, tipo_logradouro, logradouro_residencia, numero_residencia, complemento_residencia, numero_pis, numero_rg, expedidor_rg, data_expedicao_rg, uf_expedicao_rg, titulo_eleitor, titulo_eleitor_zona, titulo_eleitor_secao, reservista, ddd_telefone_1, telefone_1, ddd_telefone_2, telefone_2, email_1, email_2, cargo, senha) VALUES ('$nome', '$sexo', '$estado_civil', '$cpf', '$data_nascimento', '$cidade_nascimento', '$estado_nascimento', '$nacionalidade', '$grau_instrucao', '$raca_cor', '$nome_pai', '$nome_mae', '$cep', '$cidade_residencia', '$estado_residencia', '$bairro', '$tipo_logradouro', '$logradouro_residencia', '$numero_residencia', '$complemento_residencia', '$numero_pis', '$numero_rg', '$expedidor_rg', '$data_expedicao_rg', '$uf_expedicao_rg', '$titulo_eleitor', '$titulo_eleitor_zona', '$titulo_eleitor_secao', '$reservista', '$ddd_telefone_1', '$telefone_1', '$ddd_telefone_2', '$telefone_2', '$email_1', '$email_2', '$cargo', '$hashedPassword')";

        if (mysqli_query($db_conn, $query)) {
            $userId = mysqli_insert_id($db_conn);

            // Inserir dados dos dependentes na tabela 'dependentes'
            if (!empty($userpostdata->dependents)) {
                foreach ($userpostdata->dependents as $dependent) {
                    $dependentName = mysqli_real_escape_string($db_conn, $dependent->dependentName);
                    $dependentCpf = mysqli_real_escape_string($db_conn, $dependent->dependentCpf);
                    $dependentDob = mysqli_real_escape_string($db_conn, $dependent->dependentDob);

                    $dependentQuery = "INSERT INTO dependentes (user_id, nome, cpf, data_nascimento) VALUES ('$userId', '$dependentName', '$dependentCpf', '$dependentDob')";

                    mysqli_query($db_conn, $dependentQuery);
                }
            }

            echo json_encode(["success" => true, "message" => "Usuário criado com sucesso."]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao criar usuário."]);
        }
        break;

    default:
        echo json_encode(["result" => "Requisição inválida"]);
        break;
}

mysqli_close($db_conn);
?>
