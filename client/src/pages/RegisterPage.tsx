import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function registerUser(e: any) {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("User registered. Please login.");
    } catch (error) {
      alert("Error registering user. Please try again.");
    }
  }

  return (
    <div className="md:mt-4 px-6 md:px-0 grow max-w-xl mx-auto flex items-center justify-around">
      <div className="">
        <h1 className="text-4xl text-center font-semibold">
          Create an account
        </h1>
        <p className="text-center mt-4 mb-6 md:mb-10 text-gray-500">
          Please enter your details
        </p>
        <form action="" onSubmit={registerUser} className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="mail@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <div className="mt-2 mb-6 text-sm items-center ml-1 gap-2 flex">
            <input
              type="checkbox"
              id="terms"
              className="accent-primary"
              required
            />
            <label htmlFor="terms" className="text-xs md:text-sm">
              I agree to the terms and conditions and privacy policy of airstay.
            </label>
          </div>
          <button className="primary mt-6">Register</button>
        </form>
        <div className="flex items-center justify-center my-6">
          <hr className="w-1/3 border-t-2 border-gray-300" />
          <p className="mx-4 text-sm md:text-base text-gray-500">or</p>
          <hr className="w-1/3 border-t-2 border-gray-300" />
        </div>
        <button className="googleAuthBtn opacity-60 cursor-not-allowed">
          <svg viewBox="0 0 48 48" className="w-[22px] h-[22px]">
            <title>Google Logo</title>
            <clipPath id="g">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
            </clipPath>
            <g className="colors" clip-path="url(#g)">
              <path fill="#FBBC05" d="M0 37V11l17 13z" />
              <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
              <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
              <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
            </g>
          </svg>
          Sign up with Google
        </button>
        <div className="text-center text-sm md:text-base py-2 text-gray-500">
          Already a member? {""}
          <Link to={"/login"} className="text-primary font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
