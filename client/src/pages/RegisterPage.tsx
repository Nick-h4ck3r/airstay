import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center font-semibold">
          Create an account
        </h1>
        <form action="" className="max-w-md mx-auto">
          <input type="text" placeholder="John Doe" />
          <input type="email" placeholder="mail@mail.com" />
          <input type="password" placeholder="passowrd" />
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
