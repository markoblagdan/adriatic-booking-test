import { useLoaderData } from "react-router-dom";
import ListElement from "../components/ListElement";
import { NavLink } from "react-router-dom";

export default function House() {
  const house = useLoaderData()[0];

  return (
    <>
      <div className="m-12">
        <h1 className="text-3xl font-bold">Apartments:</h1>
        <ul className="max-w-md">
          {house &&
            house.apartments.map(({ id, title, image, pricelistInEuros }) => (
              <NavLink to={"/apartment/" + id}>
                <ListElement key={id} image={image}>
                  <div className="ml-8">
                    <p>
                      <b>Naziv: </b>
                      {title}
                    </p>
                    {getMinAndMaxPricesFromPriceList(pricelistInEuros)}
                  </div>
                </ListElement>
              </NavLink>
            ))}
        </ul>
      </div>
    </>
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
      <p>Min price: {minAndMaxPrices.min}</p>
      <p>Max price: {minAndMaxPrices.max}</p>
    </>
  );
}
