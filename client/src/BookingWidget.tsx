import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

type Props = {
  place: any;
};

function BookingWidget({ place }: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests: maxGuests,
      name,
      phone,
      price: numberOfNights * place.price * maxGuests,
    });

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 py-6 space-y-5 px-6 text-center">
      <div className="inline-flex text-xl font-medium items-center gap-1">
        <span className="pr-1">Price:</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 -mx-3"
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
          </span>
          /- per night
        </span>
      </div>

      <div className="">
        <div className="flex border border-gray-400 rounded-b-none rounded-lg mt-4 text-left">
          <div className="px-4 py-2 w-1/2">
            <label
              className="uppercase md:text-xs text-[10px] font-bold"
              htmlFor="checkinDate"
            >
              check-in
            </label>
            <input
              className="outline-none text-base font-light w-full"
              type="date"
              name="checkinDate"
              id="checkinDate"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="border-l border-gray-400 px-4 py-2 w-1/2">
            <label
              className="uppercase md:text-xs text-[10px] font-bold"
              htmlFor="checkoutDate"
            >
              checkout
            </label>
            <input
              className="text-base font-light outline-none w-full"
              type="date"
              name="checkoutDate"
              id="checkoutDate"
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div
          className={`flex-col ${
            numberOfNights ? "rounded-none" : "rounded-b-lg"
          } border-t-transparent flex text-start border border-gray-400 px-4 py-3`}
        >
          <label className="uppercase md:text-xs text-[10px] font-bold" htmlFor="checkoutDate">
            Number of guests
          </label>
          <input
            className="caret-primary"
            type="number"
            value={maxGuests}
            name="maxGuests"
            id="maxGuests"
            onChange={(e) => setMaxGuests(parseInt(e.target.value))}
            min={1}
            max={place.maxGuests}
          />
        </div>

        {numberOfNights > 0 && (
          <>
            <div className="flex-col rounded-b-none border-t-transparent flex text-start border border-gray-400 px-4 py-3">
              <label className="uppercase md:text-xs text-[10px] font-bold" htmlFor="name">
                Full Name
              </label>
              <input
                name="name"
                id="name"
                className="outline-none"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex-col border rounded-t-none border-t-transparent flex text-start  rounded-lg border-gray-400 px-4 py-3">
              <label className="uppercase md:text-xs text-[10px] font-bold" htmlFor="phoneNo">
                Mobile number
              </label>
              <input
                name="phoneNo"
                id="phoneNo"
                className="outline-none"
                type="tel"
                value={phone}
                placeholder="XXXXX XXXXX"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <button
        onClick={bookThisPlace}
        className="reserve mt-5 font-thin text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!checkIn || !checkOut || !name || !phone}
      >
        Reserve
      </button>

      {numberOfNights > 0 && (
        <p className="text-sm text-gray-600">
          It'll be <span>{numberOfNights * place.price * maxGuests}</span>/- INR
          for <span>{numberOfNights}</span>{" "}
          {numberOfNights > 1 ? "nights." : "night."}
        </p>
      )}
    </div>
  );
}

export default BookingWidget;
