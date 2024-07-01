<?php

namespace Controller;

class BaseController {

    protected function setDefaultHeaders()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
        header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
        header("Access-Control-Allow-Headers: content-type");
    }

    protected function optionsResponse()
    {
        http_response_code(200);
        $response['body'] = null;
        return $response;
    }

    protected function notFoundResponse()
    {
        http_response_code(404);
        $response['body'] = null;
        return $response;
    }
}