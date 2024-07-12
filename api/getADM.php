<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $sql = "SELECT id, nome, cpf, cargo FROM usuarios";
    $res = mysqli_query($conn, $sql);

    $data = array();
    while ($row = mysqli_fetch_assoc($res)) {
        $cargo = $row['cargo'];
        $cargo_nome = "";

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

        // Verifica se o cargo existe no array $responsibility
        if (array_key_exists($cargo, $responsibility)) {
            $cargo_nome = $responsibility[$cargo];
        } else {
            $cargo_nome = "Cargo Desconhecido"; 
        }

        $row['cargo'] = $cargo_nome;

        $data[] = $row;
    }

    echo json_encode($data);
    $conn->close();
}
?>
