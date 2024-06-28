import { useLoaderData } from "react-router-dom";
import ListElement from "../components/ListElement";

export default function House() {
  //   const house = useLoaderData()[0];

  return (
    <>
      <div class="m-12">
        <h1 class="text-3xl font-bold">Apartments:</h1>
        {/* <ul class="max-w-md">
          {house &&
            house.apartments.map(({ id, title, image }) => (
              <NavLink to={"house/" + id}>
                <ListElement key={id} image={image}>
                  <div class="ml-8">
                    <p>
                      <b>Naziv: </b>
                      {title}
                    </p>
                  </div>
                </ListElement>
              </NavLink>
            ))}
        </ul> */}
      </div>
    </>
  );
}
