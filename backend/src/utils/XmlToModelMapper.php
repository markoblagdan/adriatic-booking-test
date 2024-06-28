<?php

namespace Utils;

use Models\House;
use Models\Location;
use Models\BookingInterval;
use Models\Apartment;

use SimpleXMLElement;

// Refactor to have generic mapping methods?
class XmlToModelMapper {

    function mapToHousesList(SimpleXMLElement $housesSimpleXmlElementObject) {
    
        foreach ($housesSimpleXmlElementObject->house as $houseSimpleXmlElementObject) {
            $houses[] = $this->mapToHouseModel($houseSimpleXmlElementObject);
        }
    
        return $houses;
    }

    private function mapToHouseModel(SimpleXMLElement $houseSimpleXmlElementObject) {
            $house = new House(
                (string) $houseSimpleXmlElementObject['id'],
                (string) $houseSimpleXmlElementObject->title,
                (string) $houseSimpleXmlElementObject->image,
                $this->mapToLocationModel($houseSimpleXmlElementObject->location),
                (string) $houseSimpleXmlElementObject->beachDistanceInMeters
            );
        
            foreach ($houseSimpleXmlElementObject->apartments->apartment as $apartmentSimpleXmlElementObject) {
                $house->addApartment($this->mapToApartmentModel($apartmentSimpleXmlElementObject));
            }
        
            return $house;
    }

    private function mapToApartmentModel(SimpleXMLElement $apartmentSimpleXmlElementObject) {
        $apartment = new Apartment(
            (string) $apartmentSimpleXmlElementObject['id'],
            (string) $apartmentSimpleXmlElementObject->title,
            (string) $apartmentSimpleXmlElementObject->image,
            (int) $apartmentSimpleXmlElementObject->capacity,
            $this->mapToAmenities($apartmentSimpleXmlElementObject->amenities)
        );
    
        foreach ($apartmentSimpleXmlElementObject->pricelistInEuros->interval as $intervalXml) {
            $apartment->addBookingInterval($this->mapToBookingIntervalModel($intervalXml));
        }
    
        return $apartment;
    }

    private function mapToAmenities(SimpleXMLElement $amenitiesSimpleXmlElementObject) {
        $amenities = [];

        foreach ($amenitiesSimpleXmlElementObject as $amenityName => $amenityValue)
            $amenities[$amenityName] = $amenityValue;

        return $amenities;
    }

    private function mapToLocationModel(SimpleXMLElement $locationSimpleXmlElementObject) {
        return new Location(
            (string) $locationSimpleXmlElementObject->place,
            (string) $locationSimpleXmlElementObject->riviera
        );
    }

    private function mapToBookingIntervalModel(SimpleXMLElement $intervalSimpleXmlElementObject) {
        return new BookingInterval(
            (string) $intervalSimpleXmlElementObject->startDate,
            (string) $intervalSimpleXmlElementObject->endDate,
            (float) $intervalSimpleXmlElementObject->pricePerNight
        );
    }
}