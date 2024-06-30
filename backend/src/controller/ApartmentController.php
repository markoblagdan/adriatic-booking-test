<?php

namespace Controller;
use Repositories\ApartmentRepository;
use Domain\ApartmentService;

class ApartmentController extends BaseController {

    private $requestMethod;
    private ApartmentRepository $apartmentRepository;
    private ApartmentService $apartmentService;

    public function __construct($requestMethod)
    {
        $this->requestMethod = $requestMethod;
        $this->apartmentRepository = new ApartmentRepository();
        $this->apartmentService = new ApartmentService();
    }

    public function processRequest($apartmentId, $childRoute)
    {
        parent::setDefaultHeaders();

        switch ($this->requestMethod) {
            case 'OPTIONS':
                $response = parent::optionsResponse();
                break;
            case 'GET':
                if ($apartmentId) {
                    $response = $this->getApartment($apartmentId);
                } else {
                    $response = parent::notFoundResponse();
                }
                break;
            case 'POST':
                if ($apartmentId && $childRoute == "calculateBookingPrice") 
                {
                    $response = $this->calculateBookingPrice($apartmentId);
                }
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

    private function getApartment($id)
    {
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $apartment = $this->apartmentRepository->get($id);
        $response['body'] = json_encode($apartment);
        return $response;
    }

    private function calculateBookingPrice($apartmentId) {
        $requestedReservationInterval = json_decode(file_get_contents('php://input'));

        $startDate = \DateTime::createFromFormat('!Y-m-d', $requestedReservationInterval->startDate);
        $endDate = \DateTime::createFromFormat('!Y-m-d', $requestedReservationInterval->endDate);
        $bookingPrice = $this->apartmentService->calculateBookingPrice($apartmentId, $startDate, $endDate);

        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode(array('bookingPrice' => $bookingPrice));

        return $response;
    }
}