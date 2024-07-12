<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Especifique a origem permitida
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true"); // Adicione este cabeçalho

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Return OK for preflight requests
}

session_start();
session_destroy();
header("Location: /adminLogin");
exit();
?>
