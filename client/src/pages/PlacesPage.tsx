import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";

type Props = {};

function PlacesPage({}: Props) {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState<any>([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  function inputHeader(text: string) {
    return <h2 className="text-2xl font-semibold mt-3">{text}</h2>;
  }

  function inputDesc(text: string) {
    return <p className="text-gray-500">{text}</p>;
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

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="inline-flex gap-2 bg-primary text-white px-4 py-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <form action="" className="">
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
              className="bg-gray-200 px-6 rounded-2xl my-1"
            >
              add&nbsp;photo
            </button>
          </div>

          <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 &&
              addedPhotos.map((link: any) => {
                return (
                  <div className="h-32 flex">
                    <img
                      className="rounded-2xl w-full object-cover"
                      src={"http://localhost:4000/uploads/" + link}
                    />
                  </div>
                );
              })}

            <label className="h-32 inline-flex items-center justify-center gap-3 border rounded-2xl p-8 text-2xl font-bold text-gray-600  cursor-pointer">
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
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
          <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <div className="grid gap-2 sm:grid-cols-3">
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
          </div>

          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PlacesPage;
