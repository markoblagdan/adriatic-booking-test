<?php

define('__ROOT__', dirname(dirname(__FILE__)));

require_once('../src/constants.php');
require_once('../src/autoload.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

[$mainRoute, $entityId, $childRoute] = \Utils\Helpers::destructureUriComponents();

switch ($mainRoute) {
    case 'house':
        $controller = new \Controller\HouseController($requestMethod);
        $controller->processRequest($entityId);
        break;
    case 'apartment':
        $controller = new \Controller\ApartmentController($requestMethod);
        $controller->processRequest($entityId, $childRoute);
        break;
    case 'booking':
        $controller = new \Controller\BookingController($requestMethod);
        $controller->processRequest($entityId, $childRoute);
        break;
    default:
        http_response_code(401);
        echo 'Not found';
}
