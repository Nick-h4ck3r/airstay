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
      const {data} = await axios.post("/login", {
        email, password
      })
      setUser(data);
      alert("Login successful!");
      setRedirect(true);

    } catch (error) {
      alert("Error logging in. Please try again.");
    }
  }

  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center font-semibold">Login</h1>
        <form action="" className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="mail@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="passowrd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 font-semibold text-gray-500">
            Don't have an account yet? {""}
            <Link to={"/register"} className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
