import { useState } from "react";

type Props = {
  place: any;
};

function PlaceGallery({ place }: Props) {
  const [showMorePhotos, setShowMorePhotos] = useState<boolean>(false);

  if (showMorePhotos)
    return (
      <div className="my-12 mx-24">
        <div
          onClick={() => setShowMorePhotos(false)}
          className="z-20 fixed inline-flex px-3 py-1 bg-white rounded-2xl text-black gap-1 items-center shadow-md border border-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <button
            onClick={() => setShowMorePhotos(true)}
            className="text-lg font-medium"
          >
            close photos
          </button>
        </div>
        <h1 className="text-3xl pt-14">more photos of {place.title}</h1>
        {/* photos displayed here */}
        <div className="grid gap-4 mt-6 rounded-2xl overflow-hidden">
          {place.photos?.length > 0 &&
            place.photos?.map((photo: any) => (
              <div className="">
                <img
                  className="object-cover w-full"
                  src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${photo}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                  // src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${link}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                  // src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${photo}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                  alt={photo.caption}
                />
              </div>
            ))}
        </div>
      </div>
    );

  return (
    <div className="relative ">
      <div className="mt-6 grid gap-3 grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden">
        <div className="">
          {place.photos?.[0] && (
            <div>
              <img
                className="aspect-square object-cover"
                src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${place.photos[0]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                alt={place.photos[0].caption}
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              className="aspect-square object-cover"
              src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${place.photos[1]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
              alt={place.photos[0].caption}
            />
          )}

          <div className="">
            {place.photos?.[2] && (
              <img
                className="aspect-square object-cover relative top-3"
                src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${place.photos[2]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                alt={place.photos[0].caption}
              />
            )}
          </div>
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              className="aspect-square object-cover"
              src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${place.photos[3]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
              alt={place.photos[0].caption}
            />
          )}

          <div className="">
            {place.photos?.[2] && (
              <img
                className="aspect-square object-cover relative top-3"
                src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${place.photos[4]}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                alt={place.photos[0].caption}
              />
            )}
          </div>
        </div>
      </div>
      <div className="absolute inline-flex bottom-3 right-3 px-3 py-1 bg-white rounded-2xl text-black gap-1 items-center shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>

        <button
          onClick={() => setShowMorePhotos(true)}
          className="text-base font-normal"
        >
          see more photos
        </button>
      </div>
    </div>
  );
}

export default PlaceGallery;
