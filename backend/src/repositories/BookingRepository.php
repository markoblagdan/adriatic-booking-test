<?php
namespace Repositories;

class BookingRepository extends BaseRepository {

    private $BOOKING_FILE_NAME = "bookings.json";

    public function __construct()
    {
        $this->initBookingData();
    }

    public function createOrUpdateBookingData($booking) {
        $bookingToUpdate = null;

        if (isset($booking->id)) {
            $bookingToUpdate = $this->get($booking->id);
        }

        if ($bookingToUpdate) {
            $this->updateBooking($bookingToUpdate, $booking);
        } else {
            $lastBooking = end($this->entityArray);

            if ($lastBooking && $lastBooking->id) {
                $booking->id = $lastBooking->id + 1;
            } else {
                $booking->id = 1;
            }

            $booking->resolved = false;
                
            $this->entityArray[] = $booking;
        }

        $this->saveBookingData();

        return $booking;
    }

    public function resolveBooking($id) {
        $booking = $this->get($id);
        $booking->resolved = true;

        $this->saveBookingData();

        return $booking;
    }

    public function deleteAll() {
        $this->entityArray = [];

        $this->saveBookingData();

        return true;
    }

    private function updateBooking($bookingToUpdate, $newBookingValues) {
        foreach ($bookingToUpdate as $key => $value) {
            if ($key == "id")
                continue;
            $bookingToUpdate->$key = $newBookingValues->$key;
        }

        return $bookingToUpdate;
    }

    private function saveBookingData() {
        if(!file_put_contents(DATA_DIR.$this->BOOKING_FILE_NAME, json_encode($this->entityArray))) {
            throw new \Exception("Failed to save provided booking.");
        };
    }

    private function initBookingData() {
        if (file_exists(DATA_DIR.$this->BOOKING_FILE_NAME)) {
            $bookingsJson = file_get_contents(DATA_DIR.$this->BOOKING_FILE_NAME);
            $this->entityArray = json_decode($bookingsJson);
        } else {
            $this->entityArray = [];
        }
    }
}
