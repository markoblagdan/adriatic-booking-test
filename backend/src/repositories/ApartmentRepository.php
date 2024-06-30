<?php
namespace Repositories;

class ApartmentRepository {

    private array $apartments;

    public function __construct()
    {
        $this->loadApartmentData();
    }

    public function get($id) {
        $ids = array_column($this->apartments, 'id');
        $index = array_search($id, $ids);

        if ($index !== false) {
            return $this->apartments[$index];
        }

        throw new \Exception('No apartment with provided ID found.');
    }
    
    private function loadApartmentData() {
        $housesSimpleXmlElementObject = simplexml_load_file(DATA_DIR."accommodation.xml") or die("Error: Cannot create object");
        $xmlToModelMapper = new \Utils\XmlToModelMapper();

        $houses = $xmlToModelMapper->mapToHousesList($housesSimpleXmlElementObject);

        foreach ($houses as $house) {
            foreach ($house->apartments as $apartment)
                $this->apartments[] = $apartment;
        }
    }

}
