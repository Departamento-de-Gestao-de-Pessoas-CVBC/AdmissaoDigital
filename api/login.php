<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

try {
    $db = new PDO("mysql:host=localhost;dbname=dgp", 'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $user = $dData['user'];
    $pass = $dData['pass'];

    if ($user != "" && $pass != "") {
        $sql = "SELECT * FROM usuarios WHERE cpf = :cpf";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':cpf', $user);
        $stmt->execute();

        if ($stmt->rowCount() != 0) {
            $row = $stmt->fetch();
            $hashed_password_from_db = $row->senha;

            if (password_verify($pass, $hashed_password_from_db)) {
                $result = array(
                    "message" => "Logado com sucesso! Redirecionando...",
                    "userId" => $row->id
                );
            } else {
                $result = array("message" => "Senha incorreta!");
            }
        } else {
            $result = array("message" => "CPF incorreto!");
        }
    } else {
        $result = array("message" => "CPF incorreto!");
    }

    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(array("message" => "Erro de conexão: " . $e->getMessage()));
}
?>
