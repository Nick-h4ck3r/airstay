import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import AccountNav from "../AccountNav";
import { FileUpIcon, Loader2Icon, StarIcon, TrashIcon } from "lucide-react";

type Props = {};

function PlacesFormPage({}: Props) {
  const { id } = useParams();
  // console.log({ id });

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
  const [imgUploading, setImgUploading] = useState(false);

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

    setImgUploading(true);

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
      })
      .finally(() => {
        setImgUploading(false);
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

  function removePhoto(e: any, link: any) {
    e.preventDefault();
    setAddedPhotos((prev: any) => {
      return prev.filter((item: any) => item !== link);
    });
  }

  // function selectAsMainPhoto(e: any, link: any) {
  //   e.preventDefault();
  //   setAddedPhotos((prev: any) => {
  //     return [link, ...prev.filter((item: any) => item !== link)];
  //   });
  // }

  return (
    <div>
      <AccountNav />
      <form
        onSubmit={savePlace}
        className="max-w-6xl mx-auto px-2 md:px-0"
      >
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
        <>
          {/* add photo by link */}
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
        </>

        <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link: any) => (
              <div
                key={link}
                className="h-32 flex relative"
              >
                <img
                  className="rounded-2xl w-full object-cover"
                  // src={"http://localhost:4000/uploads/" + link}
                  src={`https://firebasestorage.googleapis.com/v0/b/airstay-6c8e3.appspot.com/o/${link}?alt=media&token=a58ca9bb-9265-4318-9602-3cf13a68b967`}
                />

                <button
                  onClick={(e) => removePhoto(e, link)}
                  className="absolute bottom-2 right-2 p-1 shadow-md shadow-black bg-slate-800/60 rounded-2xl text-white"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>

                {link === addedPhotos[0] && (
                  <button
                    // onClick={(e) => selectAsMainPhoto(e, link)}
                    className="absolute bottom-2 left-2 p-1 shadow-md shadow-black bg-slate-800/60 rounded-2xl text-white"
                  >
                    <StarIcon
                      className={`h-4 w-4 fill-[#D70566] stroke-[#D70566]`}
                    />
                  </button>
                )}
              </div>
            ))}

          {imgUploading && (
            <div className="flex flex-col h-32 items-center justify-center border rounded-2xl text-sm text-center text-gray-600 gap-2 px-4">
              <div className="flex items-center justify-center">
                <Loader2Icon className="animate-spin" />
              </div>
              <p>Uploading image, please wait...</p>
            </div>
          )}

          <label className="h-32 inline-flex items-center justify-center gap-1 md:gap-3 border rounded-2xl md:p-8 text-sm md:text-2xl font-bold text-gray-600 cursor-pointer hover:bg-black/5 duration-200">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <FileUpIcon />

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
          <Perks
            selectedPerks={perks}
            onChange={setPerks}
          />
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
