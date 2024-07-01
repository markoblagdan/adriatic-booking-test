import CardElement from "./CardElement";

export default function ApartmentCard({ apartment }) {
  return (
    <CardElement key={apartment.id} image={apartment.image}>
      <div className="ml-8 py-6 md:py-0">
        <p>
          <b>Apartment name: </b>
        </p>
        <p>{apartment.title}</p>
        {getMinAndMaxPricesFromPriceList(apartment.pricelistInEuros)}
      </div>
    </CardElement>
  );
}

function getMinAndMaxPricesFromPriceList(pricelistInEuros) {
  function getMinAndMaxPrices(minAndMaxPrices, { pricePerNight }) {
    if (!minAndMaxPrices.min) {
      minAndMaxPrices.min = pricePerNight;
    }

    if (!minAndMaxPrices.max) {
      minAndMaxPrices.max = pricePerNight;
    }

    if (pricePerNight < minAndMaxPrices.min) {
      minAndMaxPrices.min = pricePerNight;
    }

    if (pricePerNight > minAndMaxPrices.max) {
      minAndMaxPrices.max = pricePerNight;
    }

    return minAndMaxPrices;
  }

  const minAndMaxPrices = pricelistInEuros.reduce(getMinAndMaxPrices, {
    min: null,
    max: null,
  });

  return (
    <>
      <div className="my-4">
        <p>Min price: {minAndMaxPrices.min}</p>
        <p>Max price: {minAndMaxPrices.max}</p>
      </div>
    </>
  );
}
