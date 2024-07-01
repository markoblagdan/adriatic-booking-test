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

    public function processRequest($houseId)
    {
        parent::setDefaultHeaders();

        $apartmentId = $_GET['apartmentId'] ?? null;

        switch ($this->requestMethod) {
            case 'GET':
                if ($houseId) {
                    $response = $this->getHouse($houseId);
                } else if ($apartmentId) {
                    $response = $this->getHouseByApartmentId($apartmentId);
                } else {
                    $response = $this->getAllHouses();
                }
                break;
            default:
                $response = parent::notFoundResponse();
                break;
        }

        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function getAllHouses()
    {
        $allHouses = $this->houseRepository->getAll();
        http_response_code(200);
        $response['body'] = json_encode($allHouses);
        return $response;
    }

    private function getHouseByApartmentId($apartmentId)
    {
        $house = $this->houseRepository->getHouseByApartmentId($apartmentId);
        http_response_code(200);
        $response['body'] = json_encode($house);
        return $response;
    }

    private function getHouse($id)
    {
        $house = $this->houseRepository->get($id);
        http_response_code(200);
        $response['body'] = json_encode($house);
        return $response;
    }
}