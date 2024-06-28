<?php

namespace Models;

class House {
    public $id;
    public $title;
    public $image;
    public $location;
    public $beachDistanceInMeters;
    public $apartments = [];

    public function __construct(int $id, string $title, string $image, Location $location, string $beachDistanceInMeters) {
        $this->id = $id;
        $this->title = $title;
        $this->image = $image;
        $this->location = $location;
        $this->beachDistanceInMeters = $beachDistanceInMeters;
    }

    public function addApartment($apartment) {
        $this->apartments[] = $apartment;
    }
}
