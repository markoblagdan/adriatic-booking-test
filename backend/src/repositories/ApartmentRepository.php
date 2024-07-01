<?php
namespace Repositories;

class ApartmentRepository extends BaseRepository {

    public function __construct()
    {
        $this->loadApartmentData();
    }
   
    private function loadApartmentData() {
        $housesSimpleXmlElementObject = simplexml_load_file(DATA_DIR."accommodation.xml") or die("Error: Cannot create object");
        $xmlToModelMapper = new \Utils\XmlToModelMapper();

        $houses = $xmlToModelMapper->mapToHousesList($housesSimpleXmlElementObject);

        foreach ($houses as $house) {
            foreach ($house->apartments as $apartment)
                $this->entityArray[] = $apartment;
        }
    }
}
