<?php

namespace Models;

class BookingInterval {
    public \DateTime $startDate;
    public \DateTime $endDate;
    public $pricePerNight;

    public function __construct($startDate, $endDate, $pricePerNight) {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->pricePerNight = $pricePerNight;
    }
}
