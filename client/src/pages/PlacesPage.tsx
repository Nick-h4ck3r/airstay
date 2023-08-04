import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {};

function PlacesPage({}: Props) {
  const [places, setPlaces] = useState<any>([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex gap-2 bg-primary text-white px-4 py-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="">
        {places.length > 0 &&
          places.map((place: any) => (
            <Link
              to={"/account/places/" + place._id}
              className="bg-gray-100 flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-4 my-4"
            >
              <div className="h-32 w-32 bg-gray-300 shrink-0 rounded-2xl">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover w-full h-full rounded-2xl"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt={place.title}
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-2xl font-semibold">{place.title}</h2>
                <p>{place.address}</p>
                <p className="text-gray-700 mt-1">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;
