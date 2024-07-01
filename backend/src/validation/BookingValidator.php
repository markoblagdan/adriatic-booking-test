<?php

namespace Validation;

use Repositories\ApartmentRepository;

class BookingValidator {
    private ApartmentRepository $apartmentRepository;

    function __construct() {
        $this->apartmentRepository = new ApartmentRepository();
    }

    public function validate($booking) {
        $errors = [];
        
        if (empty($booking->apartmentId) || !is_int($booking->apartmentId)) {
            $errors['apartmentId'] = 'Apartment ID is required and must be an integer.';
        } else if (!($apartment = $this->apartmentRepository->get($booking->apartmentId))) {
            $errors['apartmentId'] = 'Apartment with provided ID does not exist.';
        }

        if (empty($booking->guestName) || !is_string($booking->guestName)) {
            $errors['guestName'] = 'Guest name is required and must be a string.';
        }

        if (empty($booking->guestEmail) || !filter_var($booking->guestEmail, FILTER_VALIDATE_EMAIL)) {
            $errors['guestEmail'] = 'Guest email is required and must be a valid email address.';
        }

        if (empty($booking->checkInDate) || !$this->validateDate($booking->checkInDate)) {
            $errors['checkInDate'] = 'Check-in date is required and must be in the format yyyy-m-d.';
        }

        if (empty($booking->checkOutDate) || !$this->validateDate($booking->checkOutDate)) {
            $errors['checkOutDate'] = 'Check-out date is required and must be in the format yyyy-m-d.';
        }

        if (!isset($errors['checkInDate']) && !isset($errors['checkOutDate'])) {
            $checkInDate = new \DateTime($booking->checkInDate);
            $checkOutDate = new \DateTime($booking->checkOutDate);

            if ($checkInDate >= $checkOutDate) {
                $errors['dateRange'] = 'Check-in date must be before the check-out date.';
            }
        }

        if (!is_int($booking->numberOfGuests) || $booking->numberOfGuests <= 0) {
            $errors['numberOfGuests'] = 'Number of guests is required and must be a positive integer.';
        } else if ($apartment && $booking->numberOfGuests > $apartment->capacity){
            $errors['numberOfGuests'] = 'This apartment cannot accept more than '.$apartment->capacity.' guests';
        }

        if (isset($booking->resolved) && !is_bool($booking->resolved)) {
            $errors['resolved'] = 'Resolved property must be a boolean.';
        }

        return $errors;
    }

    private function validateDate($date) {
        $d = \DateTime::createFromFormat('Y-m-d', $date);
        return $d && $d->format('Y-m-d') === $date;
    }


}