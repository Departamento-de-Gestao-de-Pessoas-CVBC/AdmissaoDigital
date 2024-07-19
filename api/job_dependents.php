<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "dgp");

// Verificar conexão
if ($conn->connect_error) {
    echo json_encode(array("error" => $conn->connect_error));
    exit();
}

// Verificar se userId foi fornecido
if (isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    // Consulta para obter o cargo do usuário
    $sql_cargo = "SELECT cargo FROM usuarios WHERE id=?";
    $stmt_cargo = $conn->prepare($sql_cargo);
    $stmt_cargo->bind_param("s", $userId);
    $stmt_cargo->execute();
    $stmt_cargo->store_result();
    
    if ($stmt_cargo->num_rows > 0) {
        $stmt_cargo->bind_result($cargo);
        $stmt_cargo->fetch();
        
        // Consulta para obter os dependentes do usuário
        $sql_dependents = "SELECT nome, cpf, data_nasc FROM usuario_dependentes WHERE id_usuario=?";
        $stmt_dependents = $conn->prepare($sql_dependents);
        $stmt_dependents->bind_param("s", $userId);
        $stmt_dependents->execute();
        $result_dependents = $stmt_dependents->get_result();
        
        $dependents = array();
        while ($row_dependents = $result_dependents->fetch_assoc()) {
            $dependents[] = array(
                "name" => $row_dependents['nome'],
                "cpf" => $row_dependents['cpf'],
                "birthdate" => $row_dependents['data_nasc']
            );
        }

        // Resposta JSON
        $response = array(
            "cargo" => $cargo,
            "dependents" => $dependents
        );
        echo json_encode($response);
        
        $stmt_dependents->close();
    } else {
        echo json_encode(array("error" => "User not found"));
    }
    
    $stmt_cargo->close();
} else {
    echo json_encode(array("error" => "Invalid user ID"));
}

$conn->close();
?>
