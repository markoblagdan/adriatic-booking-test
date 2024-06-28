import { useState, useEffect } from "react";
import { getHouses } from "./api";

export default function App() {
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    const fetchHousesData = async () => {
      const houses = await getHouses();
      setHouses(houses);
    };

    fetchHousesData();
  }, []);

  return (
    <>
      <div class="m-12">
        <h1 class="text-3xl font-bold">Houses:</h1>
        <ul class="max-w-md">
          {houses &&
            houses.map(({ id, title, image, location }) => (
              <li
                key={id}
                className="flex flex-column items-center border border-gray-100 text-sm sm:text-base my-8 cursor-pointer hover:shadow-md hover:shadow-slate-100"
              >
                <img src={image} width="200" />
                <div class="ml-8">
                  <p>
                    <b>Naziv: </b>
                    {title}
                  </p>
                  <p>
                    <b>Mjesto: </b>
                    {location?.riviera}
                  </p>
                  <p>
                    <b>Rivijera: </b>
                    {location?.riviera}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
