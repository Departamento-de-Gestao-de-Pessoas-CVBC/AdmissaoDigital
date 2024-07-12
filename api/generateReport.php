<?php
require('fpdf/fpdf.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "dgp");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
}

$startId = isset($_GET['startId']) ? intval($_GET['startId']) : 0;

$sql = "SELECT id, nome, cpf, cargo FROM usuarios WHERE id >= $startId";
$res = mysqli_query($conn, $sql);

class PDF extends FPDF
{
    function Header()
    {
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 10, 'Relatorio de Usuarios', 0, 1, 'C');
        $this->Ln(10);
    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, 'Page ' . $this->PageNo(), 0, 0, 'C');
    }
}

$pdf = new PDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 12);

$header = array('ID', 'Nome', 'CPF', 'Cargo');
foreach ($header as $col) {
    $pdf->Cell(40, 7, $col, 1);
}
$pdf->Ln();

$pdf->SetFont('Arial', '', 12);

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

while ($row = mysqli_fetch_assoc($res)) {
    $cargo = $row['cargo'];
    $cargo_nome = array_key_exists($cargo, $responsibility) ? $responsibility[$cargo] : "Cargo Desconhecido";

    $pdf->Cell(40, 6, $row['id'], 1);
    $pdf->Cell(40, 6, $row['nome'], 1);
    $pdf->Cell(40, 6, $row['cpf'], 1);
    $pdf->Cell(40, 6, $cargo_nome, 1);
    $pdf->Ln();
}

$pdf->Output();
$conn->close();
?>
