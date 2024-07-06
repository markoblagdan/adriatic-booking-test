import { NavLink, useLoaderData } from "react-router-dom";
import HouseCard from "./components/HouseCard";

export default function App() {
  const { houses } = useLoaderData();

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
