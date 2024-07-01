<?php

namespace Models;

use JsonSerializable;

class BookingInterval implements JsonSerializable {
    public \DateTime $startDate;
    public \DateTime $endDate;
    public $pricePerNight;

    public function __construct($startDate, $endDate, $pricePerNight) {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->pricePerNight = $pricePerNight;
    }

    public function jsonSerialize() {
        return [
            'startDate' => $this->startDate->format('Y-m-d'),
            'endDate' => $this->endDate->format('Y-m-d'),
            'pricePerNight' => $this->pricePerNight,
        ];
    }
}
