import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import LoadingSpinner from "../LoadingSpinner";

type Props = {};

function BookingsPage({}: Props) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="">
      <AccountNav />

      {loading ? (
        <LoadingSpinner msg="Hold still, we are fetching your bookings..." />
      ) : (
        <div className="px-2 md:px-0 md:max-w-5xl mx-auto pt-5">
          <div className="px-2 md:px-0 md:max-w-5xl mx-auto ">
            {bookings.length > 0 &&
              bookings.map((booking: any) => (
                <Link
                  to={"/account/bookings/" + booking._id}
                  className="bg-gray-100/40 border shadow flex cursor-pointer items-center gap-5 rounded-2xl overflow-hidden my-8"
                >
                  <div className="h-28 w-28 md:h-40 md:w-40 shrink-0 rounded-2xl">
                    {booking.place.photos.length > 0 && (
                      <img
                        className="object-cover w-full h-full"
                        // src={
                        //   "http://localhost:4000/uploads/" + booking.place.photos[0]
                        // }
                        src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${booking.place.photos[0]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                        alt={booking.place.title}
                      />
                    )}
                  </div>
                  <div className="h-full truncate w-full">
                    <h1 className="text-2xl font-semibold">
                      {booking.place.title}
                    </h1>
                    <div className="inline-flex items-center text-gray-500 gap-[2px] px-1">
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
                      <p className="font-medium">{booking.place.address}</p>
                    </div>
                    <div className="border-b mr-10 mt-1 border-gray-300"></div>
                    <p className="text-gray-500 text-sm mt-0 inline-flex items-center gap-1 font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-[18px] h-[18px]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {format(new Date(booking.checkIn), "MMM, d, yyyy")}{" "}
                      <span className="mb-[11px]">___</span> {""}
                      {format(new Date(booking.checkOut), "MMM, d, yyyy")}
                    </p>

                    <div className="flex mt-2 justify-between items-center w-full pr-10">
                      <p className="text-gray-700 font-semibold text-base">
                        Total (INR)
                      </p>
                      <p className="font-semibold inline-flex items-center text-black text-lg mt-1">
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
                        {booking.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
