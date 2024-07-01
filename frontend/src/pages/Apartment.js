import { useLoaderData } from "react-router-dom";
import { BookingForm } from "../components/BookingForm";
import HouseCard from "../components/HouseCard";
import ApartmentCard from "../components/ApartmentCard";

export default function Apartment() {
  const { house, apartment } = useLoaderData();

  const mainPageElementClasses = "flex-grow min-w-96 px-4";

  return (
    <>
      <div className="flex flex-wrap justify-around	md:m-12">
        <div className={mainPageElementClasses}>
          <h1 className="text-2xl font-bold my-12">
            Apartman: {apartment.title}
          </h1>
          <img src={apartment.image} className="my-6" width="300" />
          <p>Maximum number of guests: {apartment.capacity}</p>
          {apartment.amenities && (
            <UnorderedList listName="Amenities">
              <AmenityList amenities={apartment.amenities} />
            </UnorderedList>
          )}
          {apartment.pricelistInEuros && (
            <UnorderedList listName="Prices">
              <PriceList priceList={apartment.pricelistInEuros} />
            </UnorderedList>
          )}
          House details:
          <HouseCard house={house} />
        </div>
        <div className={mainPageElementClasses}>
          <BookingForm apartment={apartment} />
        </div>
        <div className={mainPageElementClasses}>
          <h1 className="text-xl italic my-12">
            Other apartments from the same house:
          </h1>
          {house.apartments &&
            house.apartments
              .filter((houseApartment) => houseApartment.id !== apartment.id)
              .map((otherApartment) => (
                <ApartmentCard
                  key={otherApartment.id}
                  apartment={otherApartment}
                />
              ))}
        </div>
      </div>
    </>
  );
}

function UnorderedList({ children, listName }) {
  return (
    <div className="my-6">
      {listName}:<ul className="list-disc">{children}</ul>
    </div>
  );
}

function AmenityList({ amenities }) {
  return Object.keys(amenities).map((amenityName) => (
    <li key={amenityName} className="ml-4">
      {amenityName}:{" "}
      <b>{parseInt(amenities[amenityName]) === 1 ? "Yes" : "No"}</b>
    </li>
  ));
}

function PriceList({ priceList }) {
  return priceList.map((priceListEntry, index) => (
    <li key={index} className="ml-4">
      Price for renting between {priceListEntry.startDate} and{" "}
      {priceListEntry.endDate}: <b>{priceListEntry.pricePerNight} EUR</b>
    </li>
  ));
}
