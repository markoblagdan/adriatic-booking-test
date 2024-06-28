<?php

namespace Models;

class Apartment {
    public $id;
    public $title;
    public $image;
    public $capacity;
    public $amenities;
    public $pricelistInEuros = [];

    public function __construct(int $id, string $title, string $image, int $capacity, array $amenities) {
        $this->id = $id;
        $this->title = $title;
        $this->image = $image;
        $this->capacity = $capacity;
        $this->amenities = $amenities;
    }

    public function addBookingInterval($interval) {
        $this->pricelistInEuros[] = $interval;
    }
}
