<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    if (isset($_GET['userId'])) {
        $userId = $_GET['userId'];
        
        $sql = "SELECT nome, data_nascimento, cpf, numero_pis, cargo, 
                       CONCAT('(', SUBSTRING(ddd_telefone_1, 1, 2), ') ', SUBSTRING(telefone_1, 1, 1), ' ', SUBSTRING(telefone_1, 2, 4), SUBSTRING(telefone_1, 6)) AS phone,
                       email_1 
                FROM usuarios 
                WHERE id='$userId';";
        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);

            // Dicionário de responsabilidade
            $responsibility = array(
                "analistaTI" => "Analista de Tecnologia da Informação",
                "analistaLE" => "Analista Legislativo",
                "0117" => "Assessor(a) Parlamentar",
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

            $positionLabel = isset($responsibility[$row['cargo']]) ? $responsibility[$row['cargo']] : "Desconhecido";

            $response = array(
                "fullName" => $row['nome'],
                "birthDate" => $row['data_nascimento'],
                "cpf" => $row['cpf'],
                "pis" => $row['numero_pis'],
                "position" => $positionLabel,
                "phone" => $row['phone'],
                "email" => $row['email_1']
            );
        } else {
            $response = array("error" => "No user found with the given ID.");
        }
    } else {
        $response = array("error" => "No user ID provided.");
    }

    $conn->close();
    echo json_encode($response);
}
?>
