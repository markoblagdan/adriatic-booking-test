<?php

namespace Controller;

use Repositories;
use Repositories\BookingRepository;

class BookingController extends BaseController {

    private $requestMethod;
    private BookingRepository $bookingRepository;


    public function __construct($requestMethod)
    {
        $this->requestMethod = $requestMethod;
        $this->bookingRepository = new BookingRepository();
    }

    public function processRequest()
    {
        parent::setDefaultHeaders();

        switch ($this->requestMethod) {
            case 'OPTIONS':
                $response = parent::optionsResponse();
            case 'GET':
                $response = $this->getBookings();
                break;
            case 'POST':
                $response = $this->createOrUpdateBookingData();
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

    private function getBookings() {
        // $this->bookingRepository->
    }

    private function createOrUpdateBookingData() {
        $booking = json_decode(file_get_contents('php://input'));
        $this->bookingRepository->createOrUpdateBookingData($booking);

        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($booking);

        return $response;
    }

}