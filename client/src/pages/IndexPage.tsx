import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import {
  CctvIcon,
  DoorOpenIcon,
  HeartIcon,
  ParkingCircleIcon,
  PawPrintIcon,
  TvIcon,
  WifiIcon,
} from "lucide-react";

type Props = {};

function IndexPage({}: Props) {
  const [places, setPlaces] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("IndexPage");
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function addToFav() {
    alert("Added to favourites");
    return;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-0 mb-12">
      <div className="mt-12 mb-6 w-full text-3xl font-bold">
        <h1 className="text-left">Popular destinations around the world</h1>
      </div>

      {loading ? (
        <LoadingSpinner msg="Hold still, we are finding the perfect places for you...." />
      ) : (
        <div className="gap-x-6 gap-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {places.length > 0 &&
            places.map((place: any, index: number) => (
              <Link
                to={"/place/" + place._id}
                key={place._id}
              >
                <motion.div
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{
                    ease: "easeOut",
                    duration: 2,
                    delay: index * 0.2,
                  }}
                  className="bg-gray-100/40 backdrop-blur-sm shadow rounded-xl overflow-hidden"
                >
                  <div className="flex relative">
                    <img
                      className={`aspect-square object-cover`}
                      src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${place.photos[0]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                      alt={place.title}
                      loading="lazy"
                    />

                    <button
                      onClick={() => addToFav()}
                      className="absolute right-4 top-4 text-gray-100 z-30"
                    >
                      <div>
                        <HeartIcon />
                      </div>
                    </button>
                  </div>

                  <div className="px-4 py-3">
                    <h2 className="truncate font-semibold text-xl">
                      {place.title}
                    </h2>

                    <h3 className="font-light inline-flex text-[13px] text-gray-600 items-center gap-[2px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      {place.address}
                    </h3>

                    <div className="border-t my-4"></div>
                    {place.perks.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {place.perks.map((perk: any) => (
                          <div className="inline-flex gap-1.5 items-center bg-gray-200/50 text-center rounded-full px-0 justify-center py-1 text-xs text-gray-600 border border-gray-200/70">
                            {perk === "wifi" && (
                              <WifiIcon className="h-4 w-4" />
                            )}
                            {perk === "parking" && (
                              <ParkingCircleIcon className="h-4 w-4" />
                            )}
                            {perk === "tv" && <TvIcon className="h-4 w-4" />}
                            {perk === "pets" && (
                              <PawPrintIcon className="h-4 w-4" />
                            )}
                            {perk === "entrance" && (
                              <DoorOpenIcon className="h-4 w-4" />
                            )}
                            {perk === "cctv" && (
                              <CctvIcon className="h-4 w-4" />
                            )}
                            <span className="hidden md:block">{perk}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="border-t my-4"></div>

                    <div className="flex justify-between -mt-1 mb-1">
                      {/* price div  */}

                      <div className="inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-8 h-8 -ml-2 -mr-2 -mt-[2px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 11-18 9 9 0118 0z"
                          />
                        </svg>

                        <span className="font-light text-sm text-gray-600">
                          <span className="text-black font-semibold text-xl">
                            {place.price}
                          </span>{" "}
                          /night
                        </span>
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
                        <p className="text-black font-extralight text-xs">
                          (45 reviews)
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default IndexPage;
