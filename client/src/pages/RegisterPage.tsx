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
    <div className="mt-4 grwo flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center font-semibold">
          Create an account
        </h1>
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
          <button className="primary">Register</button>
          <div className="text-center py-2 font-semibold text-gray-500">
            Already a member? {""}
            <Link to={"/login"} className="underline text-black">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
