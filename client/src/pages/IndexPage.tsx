import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

function IndexPage({}: Props) {
  const [places, setPlaces] = useState<any>([]);

  useEffect(() => {
    console.log("IndexPage");
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-12 mb-6 w-full text-3xl font-bold">
        <h1 className="text-left">Popular destinations around the world</h1>
      </div>
      <div className="gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((place: any) => (
            <Link to={"/place/" + place._id}>
              <div className="bg-gray-100/40 backdrop-blur-sm shadow rounded-xl overflow-hidden">
                <div className="flex">
                  <img
                    className="aspect-square object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt={place.title}
                  />
                </div>

                <div className="px-4 py-3">
                  <h2 className="truncate font-semibold text-lg mb-1">
                    {place.title}
                  </h2>

                  <h3 className="font-semibold inline-flex text-sm text-gray-500 items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 -ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    {place.address}
                  </h3>

                  <div className="border-t my-3"></div>

                  <div className="flex justify-between mt-3 mb-2">
                    <div className="inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 mr-[2px]"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <p className="text-gray-500 text-sm">
                        <span className="text-gray-900 text-lg font-bold">
                          {place.price}
                        </span>
                      </p>
                    </div>
                    <div className="inline-flex gap-1 items-center font-semibold text-sm text-primary pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="mt-[1px]">4.5</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default IndexPage;
