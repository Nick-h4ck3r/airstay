import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

type Props = {};

function Account({}: Props) {
  const [redirect, setRedirect] = useState<any>(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (!ready) return <div>Loading...</div>;

  if (ready && !user) return <Navigate to={"/login"} />;

  function linkClasses(type = null as any) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center my-8 gap-2">
        <Link className={linkClasses("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My rentals
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="max-w-lg mx-auto text-center">
          <span>
            Logged in as {user.name} ({user.email})
          </span>
          <button onClick={logout} className="primary max-w-sm mt-3">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Account;
