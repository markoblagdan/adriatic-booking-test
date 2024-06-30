<?php

namespace Controller;
use Repositories\HouseRepository;

class HouseController extends BaseController {

    private $requestMethod;
    private HouseRepository $houseRepository;

    public function __construct($requestMethod)
    {
        $this->requestMethod = $requestMethod;
        $this->houseRepository = new HouseRepository();
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
        $allHouses = $this->houseRepository->getAll();
        $response['body'] = json_encode($allHouses);
        return $response;
    }
}