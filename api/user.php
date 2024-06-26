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

switch ($method) {
    case "GET":
        $alluser = mysqli_query($db_conn, "SELECT * FROM usuarios");
        if (mysqli_num_rows($alluser) > 0) {
            $json_array = array(); // Inicializa o array fora do loop
            while ($row = mysqli_fetch_assoc($alluser)) {
                // Adiciona cada linha como um array associativo ao $json_array
                $json_array[] = $row;
            }
            echo json_encode($json_array);
            return;
        } else {
            echo json_encode(["result" => "Pleas check the Data"]);
            return;
        }
        break;

    case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"));

        $nome = $userpostdata->nome;
        $sexo = $userpostdata->sexo;
        $estado_civil = isset($userpostdata->estado_civil) ? $userpostdata->estado_civil : '';
        $cpf = $userpostdata->cpf;
        $data_nascimento = $userpostdata->data_nascimento;
        $cidade_nascimento = $userpostdata->cidade_nascimento;
        $estado_nascimento = $userpostdata->estado_nascimento;
        $nacionalidade = $userpostdata->nacionalidade;
        $grau_instrucao = $userpostdata->grau_instrucao;
        $raca_cor = $userpostdata->raca_cor;
        $nome_pai = $userpostdata->nome_pai;
        $nome_mae = $userpostdata->nome_mae;
        $cep = $userpostdata->cep;
        $cidade_residencia = $userpostdata->cidade_residencia;
        $estado_residencia = $userpostdata->estado_residencia;
        $bairro = $userpostdata->bairro;
        $tipo_logradouro = $userpostdata->tipo_logradouro;
        $logradouro_residencia = $userpostdata->logradouro_residencia;
        $numero_residencia = $userpostdata->numero_residencia;
        $complemento_residencia = $userpostdata->complemento_residencia;
        $numero_pis = $userpostdata->numero_pis;
        $numero_rg = $userpostdata->numero_rg;
        $expedidor_rg = $userpostdata->expedidor_rg;
        $data_expedicao_rg = $userpostdata->data_expedicao_rg;
        $uf_expedicao_rg = $userpostdata->uf_expedicao_rg;
        $titulo_eleitor = isset($userpostdata->titulo_eleitor) ? $userpostdata->titulo_eleitor : '';
        $titulo_eleitor_zona = isset($userpostdata->titulo_eleitor_zona) ? $userpostdata->titulo_eleitor_zona : '';
        $titulo_eleitor_secao = isset($userpostdata->titulo_eleitor_secao) ? $userpostdata->titulo_eleitor_secao : '';
        $reservista = $userpostdata->reservista;
        $ddd_telefone_1 = isset($userpostdata->ddd_telefone_1) ? substr($userpostdata->ddd_telefone_1, 1, 2) : '';
        $telefone_1 = $userpostdata->telefone_1;
        $ddd_telefone_2 = isset($userpostdata->ddd_telefone_2) ? substr($userpostdata->ddd_telefone_2, 1, 2) : '';
        $telefone_2 = $userpostdata->telefone_2;
        $email_1 = $userpostdata->email_1;
        $email_2 = $userpostdata->email_2;
        $cargo = $userpostdata->cargo;
        $senha = $userpostdata->senha;
        $csenha = $userpostdata->csenha;
        $dependentes = isset($userpostdata->dependents) ? $userpostdata->dependents : [];

        // Verificar se as senhas são iguais
        if ($senha !== $csenha) {
            $response = ["success" => false, "message" => "As senhas não coincidem."];
            echo json_encode($response);
            return;
        }

        // Verificar se o CPF é válido
        if (!validaCPF($cpf)) {
            $response = ["success" => false, "message" => "CPF inválido."];
            echo json_encode($response);
            return;
        }
        $hashed_password = password_hash($senha, PASSWORD_DEFAULT);

        $query = "INSERT INTO usuarios(nome, sexo, estado_civil, cpf, data_nascimento, cidade_nascimento, estado_nascimento, nacionalidade, grau_instrucao, raca_cor, nome_pai, nome_mae, cep, cidade_residencia, estado_residencia, bairro, tipo_logradouro, logradouro_residencia, numero_residencia, complemento_residencia, numero_pis, numero_rg, expedidor_rg, data_expedicao_rg, uf_expedicao_rg, titulo_eleitor, titulo_eleitor_zona, titulo_eleitor_secao, reservista, ddd_telefone_1, telefone_1, ddd_telefone_2, telefone_2, email_1,email_2, cargo, senha)
                  VALUES ('$nome', '$sexo', '$estado_civil', '$cpf', '$data_nascimento', '$cidade_nascimento', '$estado_nascimento', '$nacionalidade', '$grau_instrucao', '$raca_cor', '$nome_pai', '$nome_mae', '$cep', '$cidade_residencia', '$estado_residencia', '$bairro', '$tipo_logradouro', '$logradouro_residencia', '$numero_residencia', '$complemento_residencia', '$numero_pis', '$numero_rg', '$expedidor_rg', '$data_expedicao_rg', '$uf_expedicao_rg', '$titulo_eleitor', '$titulo_eleitor_zona', '$titulo_eleitor_secao', '$reservista', '$ddd_telefone_1', '$telefone_1', '$ddd_telefone_2', '$telefone_2','$email_1','$email_2', '$cargo', '$hashed_password')";

        $result = mysqli_query($db_conn, $query);

        if ($result) {
            $user_id = mysqli_insert_id($db_conn);

            foreach ($dependentes as $dependente) {
                $dependentName = $dependente->dependentName;
                $dependentCpf = $dependente->dependentCpf;
                $dependentDob = $dependente->dependentDob;

                // Verificar se o CPF do dependente é válido
                if (!validaCPF($dependentCpf)) {
                    $response = ["success" => false, "message" => "CPF de dependente inválido."];
                    echo json_encode($response);
                    return;
                }

                $query_dependent = "INSERT INTO usuario_dependentes(nome, cpf, data_nasc, id_usuario)
                                    VALUES ('$dependentName', '$dependentCpf', '$dependentDob', '$user_id')";

                $result_dependent = mysqli_query($db_conn, $query_dependent);

                if (!$result_dependent) {
                    $response = ["success" => false, "message" => "Erro ao inserir dependente: " . mysqli_error($db_conn)];
                    echo json_encode($response);
                    return;
                }
            }

            $response = ["success" => true, "message" => "Inserção realizada com sucesso."];
            echo json_encode($response);
        } else {
            $response = ["success" => false, "message" => "Erro ao inserir os dados: " . mysqli_error($db_conn)];
            echo json_encode($response);
        }
        break;
}
?>
