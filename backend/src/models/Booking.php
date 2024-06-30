<?php

namespace Models;

class Booking {
    public $id;
    public $guestName;
    public $guestEmail;
    public $checkInDate;
    public $checkOutDate;
    public $numberOfGuests;
    public $resolved;

    public function __construct(int $id, string $guestName, string $guestEmail, \DateTime $checkInDate, \DateTime $checkOutDate) {
        $this->id = $id;
        $this->guestName = $guestName;
        $this->guestEmail = $guestEmail;
        $this->checkInDate = $checkInDate;
        $this->checkOutDate = $checkOutDate;
    }

    public function addBookingInterval($interval) {
        $this->pricelistInEuros[] = $interval;
    }
}
