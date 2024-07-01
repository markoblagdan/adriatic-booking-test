<?php
namespace Domain;
use Repositories\ApartmentRepository;

class ApartmentService {

    private ApartmentRepository $apartmentRepository;

    public function __construct()
    {
        $this->apartmentRepository = new ApartmentRepository();
    }

    public function calculateBookingPrice($apartmentId, \DateTime $startDate, \DateTime $endDate) {
        $apartment = $this->apartmentRepository->get($apartmentId);

        $bookingPrice = 0;

        $foundLastInterval = false;

        // TODO: account for the fact that last night of a booking is not part of the reservation therefore should not be priced
        foreach ($apartment->pricelistInEuros as $singlePriceListinEuros) {
            if ($startDate > $singlePriceListinEuros->endDate) {
                continue;
            }

            $numberOfDaysInCurrentInterval = 0;

            if ($startDate >= $singlePriceListinEuros->startDate && $endDate <= $singlePriceListinEuros->endDate) {
                $numberOfDaysInCurrentInterval = $endDate->diff($startDate)->days;
                $bookingPrice += $numberOfDaysInCurrentInterval * $singlePriceListinEuros->pricePerNight;
                return $bookingPrice;
            }

            if ($startDate >= $singlePriceListinEuros->startDate) {
                $numberOfDaysInCurrentInterval = $singlePriceListinEuros->endDate->diff($startDate)->days;
            } else if ($endDate <= $singlePriceListinEuros->endDate) {
                $numberOfDaysInCurrentInterval = $endDate->diff($singlePriceListinEuros->startDate)->days;
                $foundLastInterval = true;
            } else {
                $numberOfDaysInCurrentInterval = $singlePriceListinEuros->endDate->diff($singlePriceListinEuros->startDate)->days;
            }

            $bookingPrice += $numberOfDaysInCurrentInterval * $singlePriceListinEuros->pricePerNight;

            if ($foundLastInterval) {
                return $bookingPrice;
            }
        }
    }

}
