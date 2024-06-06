import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import {
  CctvIcon,
  DoorOpenIcon,
  HeartIcon,
  IndianRupeeIcon,
  MapPinIcon,
  ParkingCircleIcon,
  PawPrintIcon,
  StarIcon,
  TvIcon,
  WifiIcon,
} from "lucide-react";

type Props = {};

function IndexPage({}: Props) {
  const [places, setPlaces] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

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
                  className="bg-gray-100/40 backdrop-blur-sm shadow-md rounded-xl overflow-hidden hover:shadow-xl duration-300"
                >
                  <div className="flex relative">
                    <img
                      className={`aspect-square object-cover`}
                      src={
                        imageLoaded
                          ? `https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${place.photos[0]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b96`
                          : "/demo.png"
                      }
                      alt={place.title}
                      onLoad={() => setImageLoaded(true)}
                    />

                    <button
                      onClick={() => addToFav()}
                      className="absolute right-4 top-4 text-gray-100 z-30"
                    >
                      <HeartIcon className="fill-black/50 hover:opacity-60 duration-300" />
                    </button>
                  </div>

                  <div className="px-4 pt-4">
                    <h2 className="line-clamp-2 font-semibold text-xl pb-1">
                      {place.title}
                    </h2>

                    <h3 className="font-light inline-flex text-[13px] text-gray-600 items-center gap-1">
                      <MapPinIcon className="h-3 w-3 fill-black stroke-white" />

                      {place.address}
                    </h3>

                    <div className="border-t my-2" />

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

                    <div className="border-t my-2" />

                    <div className="flex items-end justify-between pt-1 pb-3">
                      {/* price div  */}
                      <div className="inline-flex items-center">
                        <IndianRupeeIcon className="h-5 w-5 stroke-[3]" />

                        <span className="font-light text-sm text-gray-600">
                          <span className="text-black font-bold text-2xl">
                            {place.price}
                          </span>{" "}
                          /night
                        </span>
                      </div>

                      <div className="inline-flex gap-1 items-center font-semibold text-sm text-primary pr-2">
                        <StarIcon className="h-4 w-4" />
                        <p className="mt-[1px]">
                          {(Math.random() * (5 - 1.5) + 1.5).toFixed(1)}
                        </p>
                        <p className="text-black font-extralight text-xs">
                          ({Math.floor(Math.random() * 100)} reviews)
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
