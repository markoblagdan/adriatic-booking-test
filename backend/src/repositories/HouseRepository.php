<?php
namespace Repositories;

class HouseRepository {

    private array $houses;

    public function __construct()
    {
        $this->loadHousesData();
    }
    
    function getAll() {
        return $this->houses;
    }

    private function loadHousesData() {
        $housesSimpleXmlElementObject = simplexml_load_file(DATA_DIR."accommodation.xml") or die("Error: Cannot create object");
        $xmlToModelMapper = new \Utils\XmlToModelMapper();

        $this->houses = $xmlToModelMapper->mapToHousesList($housesSimpleXmlElementObject);
    }

}
