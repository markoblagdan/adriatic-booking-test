import CardElement from "./CardElement";

export default function HouseCard({ house }) {
  return (
    <CardElement key={house.id} image={house.image}>
      <div className="ml-8 py-6 md:py-0">
        <p>
          <b>House name: </b>
          {house.title}
        </p>
        <p>
          <b>Place: </b>
          {house.location.place}
        </p>
        <p>
          <b>Riviera: </b>
          {house.location.riviera}
        </p>
        {house.beachDistanceInMeters && (
          <p>
            <b>Beach distance: </b>
            {house.beachDistanceInMeters} meters
          </p>
        )}
      </div>
    </CardElement>
  );
}
