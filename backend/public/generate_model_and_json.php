<?php

$housesSimpleXmlElementObject = simplexml_load_file(DATA_DIR."accommodation.xml") or die("Error: Cannot create object");

$xmlToModelMapper = new Utils\XmlToModelMapper();
$houses = $xmlToModelMapper->mapToHousesList($housesSimpleXmlElementObject);

$housesJson = json_encode($houses, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

if(!file_put_contents(
    DATA_DIR.HOUSES_JSON_FILENAME,
    $housesJson,
    LOCK_EX
)) {
    print("Failed to write JSON data to file, exitting.");
}

print("<pre>");
print("Saved the following JSON data successfully: \n\n");
print_r($housesJson);
