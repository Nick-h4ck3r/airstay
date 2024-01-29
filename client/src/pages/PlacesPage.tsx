import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

type Props = {};

function PlacesPage({}: Props) {
  const [places, setPlaces] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user-places")
      .then(({ data }) => {
        setPlaces(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="">
      <AccountNav />
      <div className="text-center mt-10 max-w-6xl mx-auto">
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

      {loading ? (
        <LoadingSpinner msg="Hold still, we are fetching your rentals..." />
      ) : (
        <div className="mt-8 max-w-6xl mx-auto">
          {places.length > 0 &&
            places.map((place: any) => (
              <div
                // to={"/account/places/" + place._id}
                className="bg-gray-100 flex items-center gap-3 md:gap-6 rounded-2xl md:p-4 my-4 md:my-6 overflow-hidden"
              >
                <div className="h-28 w-28 md:h-40 md:w-40 bg-gray-300 shrink-0 rounded-2xl">
                  {place.photos.length > 0 && (
                    <img
                      className="object-cover w-full h-full md:rounded-2xl"
                      // src={"http://localhost:4000/uploads/" + place.photos[0]}
                      src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${place.photos[0]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                      alt={place.title}
                    />
                  )}
                </div>
                <div className="truncate pr-3 md:pr-8">
                  <h2 className="md:text-2xl font-semibold truncate">
                    {place.title}
                  </h2>
                  <p className="text-xs md:text-base">{place.address}</p>
                  <p className="text-gray-700 hidden md:flex text-sm md:text-base mt-1 truncate">
                    {place.description}
                  </p>
                  {/* buttons div  */}
                  <div className="flex gap-2 text-xs mt-3 md:mt-4 text-white">
                    <Link
                      to={"/account/places/" + place._id}
                      className="px-3 py-1 bg-primary rounded-2xl inline-flex items-center gap-1 select-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                      edit
                    </Link>
                    <Link
                      to={"/place/" + place._id}
                      className="bg-white text-primary px-3 py-1 rounded-2xl border border-primary inline-flex items-center gap-1 select-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      preview
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default PlacesPage;
