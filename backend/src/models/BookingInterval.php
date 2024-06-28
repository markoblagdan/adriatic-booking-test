<?php

namespace Models;

class BookingInterval {
    public $startDate;
    public $endDate;
    public $pricePerNight;

    public function __construct($startDate, $endDate, $pricePerNight) {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->pricePerNight = $pricePerNight;
    }
}
