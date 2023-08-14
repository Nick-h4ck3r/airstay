import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import AccountNav from "../AccountNav";

type Props = {};

function PlacesFormPage({}: Props) {
  const { id } = useParams();
  console.log({ id });

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [addedPhotos, setAddedPhotos] = useState<any>([]);
  const [photoLink, setPhotoLink] = useState("");
  const [price, setPrice] = useState(100);
  const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text: string) {
    return <h2 className="text-xl md:text-2xl font-semibold mt-3">{text}</h2>;
  }

  function inputDesc(text: string) {
    return <p className="text-gray-500 text-sm md:text-base">{text}</p>;
  }

  function preInput(header: any, desc: any) {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    );
  }

  async function addPhotoByLink(e: any) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev: any) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(e: any) {
    const files = e.target.files;
    console.log({ files });
    const data = new FormData();
    data.set("photos", files);
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev: any) => {
          return [...prev, ...filenames];
        });
        console.log(data);
      });
  }

  function savePlace(e: any) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update place
      axios.put(`/places`, {
        id,
        ...placeData,
      });
      setRedirectToPlacesList(true);
    } else {
      // create place
      axios.post("/places", placeData);
      setRedirectToPlacesList(true);
    }
  }

  if (redirectToPlacesList) {
    return <Navigate to={"/account/places"} />;
  }

  function removePhoto(link: any) {
    setAddedPhotos((prev: any) => {
      return prev.filter((item: any) => item !== link);
    });
  }

  function selectAsMainPhoto(e: any, link: any) {
    e.preventDefault();
    setAddedPhotos((prev: any) => {
      return [link, ...prev.filter((item: any) => item !== link)];
    });
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace} className="max-w-6xl mx-auto px-2 md:px-0">
        {preInput("Title", "Title for your places should be catchy.")}
        <input
          className=" "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="My awesome flat"
        />

        {preInput("Address", "Where is your place located?")}
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className=" "
          type="text"
          placeholder="My awesome flat"
        />

        {preInput("Photos", "show off cool images of your place!")}
        <div className="flex gap-2">
          <input
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            type="text"
            placeholder="add form the link ...jpg"
          />
          <button
            onClick={addPhotoByLink}
            className={`bg-gray-200 px-4 md:px-8 text-sm md:text-base rounded-2xl my-1 ${
              !photoLink && "opacity-50"
            }`}
            disabled={!photoLink}
          >
            add&nbsp;photo
          </button>
        </div>

        <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link: any) => (
              <div key={link} className="h-32 flex relative">
                <img
                  className="rounded-2xl w-full object-cover"
                  // src={"http://localhost:4000/uploads/" + link}
                  src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${link}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                />

                <button
                  onClick={() => removePhoto(link)}
                  className="absolute bottom-2 right-2 p-1 shadow-md shadow-black bg-slate-800/60 rounded-2xl text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-[18px] h-[18px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => selectAsMainPhoto(e, link)}
                  className="absolute bottom-2 left-2 p-1 shadow-md shadow-black bg-slate-800/60 rounded-2xl text-white"
                >
                  {link === addedPhotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-[18px] h-[18px] text-primary"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}
                  {link !== addedPhotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-[18px] h-[18px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}

          <label className="h-32 inline-flex items-center justify-center gap-1 md:gap-3 border rounded-2xl md:p-8 text-sm md:text-2xl font-bold text-gray-600  cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 md:w-8 h-5 md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>

            <p>Upload</p>
          </label>
        </div>

        {preInput("Description", "Describe your place in few words.")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=""
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="My awesome flat is located in the center of the city."
        ></textarea>

        {preInput(
          "Perks",
          "What makes your place special? Select all that apply."
        )}
        <div className="mt-2 mb-6 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-xs md:text-base">
          <Perks selectedPerks={perks} onChange={setPerks} />
        </div>

        {preInput(
          "Extra info",
          "Add any extra information you think guests should know about your place, house rules, etc."
        )}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          className=""
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="Add any extra information you think guests should know about your place, house rules, etc."
        ></textarea>

        {preInput(
          "Check in and check out times",
          "Set the times when guests can check in and check out."
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div className="">
            <h3 className="mt-2 font-semibold -mb-1">check in time</h3>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="text"
              placeholder="14.00"
            />
          </div>
          <div className="">
            <h3 className="mt-2 font-semibold -mb-1">check out time</h3>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="text"
              placeholder="21.00"
            />
          </div>
          <div className="">
            <h3 className="mt-2 font-semibold -mb-1">Max number of guests</h3>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              type="number"
              placeholder="4"
            />
          </div>
          <div className="">
            <h3 className="mt-2 font-semibold -mb-1">Price per night</h3>
            <input
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
              type="number"
              placeholder="100"
            />
          </div>
        </div>

        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}

export default PlacesFormPage;
