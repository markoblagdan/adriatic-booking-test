<?php

namespace Controller;

class HouseController extends BaseController {

    private $requestMethod;

    public function __construct($requestMethod)
    {
        $this->requestMethod = $requestMethod;
    }

    public function processRequest()
    {
        parent::setDefaultHeaders();

        switch ($this->requestMethod) {
            case 'GET':
                $response = $this->getAllHouses();
                break;
            default:
                $response = parent::notFoundResponse();
                break;
        }

        header($response['status_code_header']);

        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function getAllHouses()
    {
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = file_get_contents(DATA_DIR.HOUSES_JSON_FILENAME);
        return $response;
    }
}