import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center font-semibold">Login</h1>
        <form action="" className="max-w-md mx-auto">
          <input type="email" placeholder="mail@mail.com" />
          <input type="password" placeholder="passowrd" />
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
