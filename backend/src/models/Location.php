<?php

namespace Models;

class Location {
    public $place;
    public $riviera;

    public function __construct(string $place, string $riviera) {
        $this->place = $place;
        $this->riviera = $riviera;
    }
}

