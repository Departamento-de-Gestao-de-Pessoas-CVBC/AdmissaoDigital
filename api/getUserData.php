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
                       CONCAT('(', SUBSTRING(ddd_telefone_1, 1, 2), ') ', SUBSTRING(telefone_1, 1, 1), ' ', SUBSTRING(telefone_1, 2, 4),'-', SUBSTRING(telefone_1, 6)) AS phone,
                       email_1 
                FROM usuarios 
                WHERE id='$userId';";
        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);

            // Dicionário de responsabilidade
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
