import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../PlaceGallery";

type Props = {};

function BookingPage({}: Props) {
  const { id } = useParams();

  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }: any) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  return (
    <div className="mt-4 pt-8 md:-mx-28 md:px-28 bg-gray-100">
      <h1 className="text-3xl pb-1">{booking.place.title}</h1>

      <a
        className="underline font-semibold bg-gray-100"
        target="_blank"
        rel="noreferrer"
        href={"https://www.google.com/maps/place/" + booking.place.address}
      >
        {booking.place.address}
      </a>

      <PlaceGallery place={booking.place} />
    </div>
  );
}

export default BookingPage;
