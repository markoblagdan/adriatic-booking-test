<?php
namespace Repositories;

class HouseRepository extends BaseRepository {

    public function __construct()
    {
        $this->loadHousesData();
    }
    
    public function getHouseByApartmentId($apartmentId) {
        foreach ($this->entityArray as $house) {
            $apartment = array_reduce($house->apartments, static function ($maybeApartment, $apartment) use ($apartmentId) {
                return $maybeApartment === false && $apartment->id == $apartmentId ? $apartment : $maybeApartment;
            }, false);

            if ($apartment) {
                return $house;
            }
        }

        throw new \Exception('No house with provided apartment ID found.');
    }

    private function loadHousesData() {
        $housesSimpleXmlElementObject = simplexml_load_file(DATA_DIR."accommodation.xml") or die("Error: Cannot create object");
        $xmlToModelMapper = new \Utils\XmlToModelMapper();

        $this->entityArray = $xmlToModelMapper->mapToHousesList($housesSimpleXmlElementObject);
    }

}
