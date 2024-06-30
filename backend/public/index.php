<?php

require_once('../src/constants.php');
require_once('../src/autoload.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

error_log("Checking xx ".$requestMethod);

// What to do if in subdir?
switch ($uri[2]) {
    case 'house':
        $controller = new \Controller\HouseController($requestMethod);
        $controller->processRequest();
        break;
    case 'apartment':
        $apartmentId = null;

        if (isset($uri[3])) {
            $apartmentId = (int) $uri[3];
        }

        $childRoute = null;

        if (isset($uri[4])) {
            $childRoute = $uri[4];
        }

        $controller = new \Controller\ApartmentController($requestMethod);
        $controller->processRequest($apartmentId, $childRoute);
        break;
}
