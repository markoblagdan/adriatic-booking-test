import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getHouses } from "./api";
import HouseCard from "./components/HouseCard";

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
        <div className="max-w-md">
          {houses &&
            houses.map((house) => (
              <NavLink key={house.id} to={"house/" + house.id}>
                <HouseCard house={house}></HouseCard>
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
}
