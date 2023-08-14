import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

function IndexPage({}: Props) {
  const [places, setPlaces] = useState<any>([]);
  
  const svgClasses = "w-[14px] h-[14px]";

  useEffect(() => {
    console.log("IndexPage");
    axios.get("/places").then((response) => {
      setPlaces(response.data);
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
      <div className="gap-x-6 gap-y-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((place: any, index: number) => (
            <Link to={"/place/" + place._id}>
              <motion.div
                initial={{ x: 50 }}
                animate={{ x: 0 }}
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
                    className="absolute right-3 top-3 text-gray-100 z-30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 border p-[3px] border-white/70 rounded-full bg-gray-500/30 shadow-lg shadow-gray-500/30"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
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
                        <div className="inline-flex gap-2 items-center bg-gray-200/50 text-center rounded-full px-0 justify-center py-1 text-xs text-gray-600 border border-gray-200/70">
                          {perk === "wifi" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={svgClasses}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                              />
                            </svg>
                          )}
                          {perk === "parking" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={svgClasses}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                              />
                            </svg>
                          )}
                          {perk === "tv" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={svgClasses}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                              />
                            </svg>
                          )}
                          {perk === "pets" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={svgClasses}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                              />
                            </svg>
                          )}
                          {perk === "entrance" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={svgClasses}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                              />
                            </svg>
                          )}
                          {perk === "cctv" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={svgClasses}
                            >
                              <path
                                strokeLinecap="round"
                                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                              />
                            </svg>
                          )}
                          <span>{perk}</span>
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
    </div>
  );
}

export default IndexPage;
