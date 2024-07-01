<?php

namespace Controller;

use Repositories\BookingRepository;
use Validation\BookingValidator;

class BookingController extends BaseController {

    private $requestMethod;
    private BookingRepository $repository;
    private BookingValidator $validator;

    public function __construct($requestMethod)
    {
        $this->requestMethod = $requestMethod;
        $this->repository = new BookingRepository();
        $this->validator = new BookingValidator();
    }

    public function processRequest($bookingId, $childRoute)
    {
        parent::setDefaultHeaders();

        switch ($this->requestMethod) {
            case 'OPTIONS':
                $response = parent::optionsResponse();
            case 'GET':
                $response = $this->getBookings();
                break;
            case 'POST':
                if ($bookingId && $childRoute === "resolve") 
                    $response = $this->resolveBooking($bookingId);
                else
                    $response = $this->createOrUpdateBookingData();
                break;
            case 'DELETE':
                $response = $this->deleteAllBookings();
                break;
            default:
                $response = parent::notFoundResponse();
                break;
        }

        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function getBookings() {
        $allBookings = $this->repository->getAll();
        http_response_code(200);
        $response['body'] = json_encode($allBookings);
        return $response;
    }

    private function createOrUpdateBookingData() {
        $booking = json_decode(file_get_contents('php://input'));

        $errors = $this->validator->validate($booking);

        if (empty($errors)) {
            $this->repository->createOrUpdateBookingData($booking);
            http_response_code(201);
            $response['body'] = json_encode($booking);
        } else {
            http_response_code(400);
            $response['body'] = json_encode(['errors' => $errors]);
        }

        return $response;
    }

    private function resolveBooking($id) {
        $resolvedBooking = $this->repository->resolveBooking($id);
        http_response_code(200);
        $response['body'] = json_encode($resolvedBooking);
        return $response;
    }

    private function deleteAllBookings() {
        if ($this->repository->deleteAll()) {
            http_response_code(204);
            $response['body'] = null;
        } else {
            http_response_code(500);
            $response['body'] = json_encode(['errors' => "Failed to delete data."]);
        }

        return $response;
    }

}