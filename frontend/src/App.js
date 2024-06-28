import { useState, useEffect } from "react";
import { getHouses } from "./api";
import { NavLink } from "react-router-dom";
import ListElement from "./components/ListElement";

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
      <div className="m-12">
        <h1 className="text-3xl font-bold">Houses:</h1>
        <ul className="max-w-md">
          {houses &&
            houses.map(({ id, title, image, location }) => (
              <NavLink to={"house/" + id}>
                <ListElement key={id} image={image}>
                  <div className="ml-8">
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
                </ListElement>
              </NavLink>
            ))}
        </ul>
      </div>
    </>
  );
}
