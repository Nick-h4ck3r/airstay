import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLogin(e: any) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login successful!");
      setRedirect(true);
    } catch (error) {
      alert("Error logging in. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="max-w-xl -mt-12 md:mt-0 px-6 md:px-0 mx-auto grow flex items-center">
      <div className="">
        <h1 className="text-4xl text-center font-bold">Welcome back!</h1>
        <p className="text-center mt-4 mb-10 text-gray-500">
          Please enter your details
        </p>
        <form action="" className="max-w-md mx-auto" onSubmit={handleLogin}>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2 mb-6 flex justify-between text-sm">
            <div className="items-center flex pl-1">
              <input
                type="checkbox"
                id="remember-me"
                className="accent-primary"
              />
              <label htmlFor="remember-me" className="ml-2 text-xs md:text-sm">
                Remember me
              </label>
            </div>

            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 text-xs md:text-sm float-right"
            >
              Forgot password?
            </a>
          </div>
          <button className="primary mt-6">Log in</button>
        </form>
        <div className="flex items-center justify-center my-6">
          <hr className="w-1/3 border-t-2 border-gray-300" />
          <p className="mx-4 text-gray-500">or</p>
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
          Log in with Google
        </button>
        <div className="text-center py-2 text-gray-500 text-sm md:text-base">
          Don't have an account yet? {""}
          <Link to={"/register"} className="text-primary font-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
