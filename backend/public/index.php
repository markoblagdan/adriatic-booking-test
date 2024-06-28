<?php

require_once('../src/constants.php');
require_once('../src/autoload.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

// What to do if in subdir?
switch ($_SERVER['REQUEST_URI']) {
    case '/api/generateJsonData':
        require_once __DIR__ . '/generate_model_and_json.php';
        break;
    case '/api/house':
        $controller = new \Controller\HouseController($requestMethod);
        $controller->processRequest();
        break;
}
