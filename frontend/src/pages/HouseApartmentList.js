import { NavLink, useLoaderData } from "react-router-dom";
import ApartmentCard from "../components/ApartmentCard";

export default function HouseApartmentList() {
  const house = useLoaderData();

  return (
    <>
      <div className="m-12">
        <h1 className="text-3xl font-bold">Apartments:</h1>
        <div className="max-w-md">
          {house &&
            house.apartments.map((apartment) => (
              <NavLink key={apartment.id} to={"/apartment/" + apartment.id}>
                <ApartmentCard apartment={apartment} />
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
}
