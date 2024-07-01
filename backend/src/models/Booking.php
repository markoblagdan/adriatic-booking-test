<?php

namespace Models;

class Booking {
    public $id;
    public $apartmentId;
    public $guestName;
    public $guestEmail;
    public $checkInDate;
    public $checkOutDate;
    public $numberOfGuests;
    public $resolved;

    public function __construct(int $id, int $apartmentId, string $guestName, string $guestEmail, \DateTime $checkInDate, \DateTime $checkOutDate, int $numberOfGuests, bool $resolved) {
        $this->id = $id;
        $this->apartmentId = $apartmentId;
        $this->guestName = $guestName;
        $this->guestEmail = $guestEmail;
        $this->checkInDate = $checkInDate;
        $this->checkOutDate = $checkOutDate;
        $this->$numberOfGuests = $numberOfGuests;
        $this->resolved = $resolved;
    }
}
