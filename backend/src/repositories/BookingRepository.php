<?php
namespace Repositories;

class BookingRepository {

    private $BOOKING_FILE_NAME = "bookings.json";
    private array $bookings;

    public function __construct()
    {
        $this->loadBookingData();
    }

    public function get($id) {
        // $ids = array_column($this->apartments, 'id');
        // $index = array_search($id, $ids);

        // if ($index !== false) {
        //     return $this->apartments[$index];
        // }

        // throw new \Exception('No apartment with provided ID found.');
    }

    public function createOrUpdateBookingData($booking) {
        if (!$this->bookings) {
            $this->loadBookingData();
        }

        if ($booking->id && $this->bookings[$booking->id]){
            $this->bookings[$booking->id] = $booking;
        } else {
            $lastBooking = end($this->bookings);

            if ($lastBooking && $lastBooking->id) {
                $booking->id = $lastBooking->id + 1;
            } else {
                $booking->id = 1;
            }
                
            $this->bookings[] = $booking;
        }
        
        if(!file_put_contents(DATA_DIR.$this->BOOKING_FILE_NAME, $this->bookings)) {
            throw new \Exception("Failed to save provided booking.");
        };

        return $booking;
    }
    
    private function loadBookingData() {
        $bookingsJson = file_get_contents(DATA_DIR.$this->BOOKING_FILE_NAME);

        if ($bookingsJson) {
            $this->bookings = json_decode($bookingsJson);
        } else {
            $this->bookings = [];
        }
    }

}
