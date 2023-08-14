import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

type Props = {};

function ProfilePage({}: Props) {
  const [redirect, setRedirect] = useState<any>(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) return <div>Loading...</div>;

  if (ready && !user && !redirect) return <Navigate to={"/login"} />;

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && (
        <div className="max-w-lg px-4 md:px-0 mx-auto text-center">
          <span>
            Logged in as {user.name} ({user.email})
          </span>
          <button onClick={logout} className="secondary max-w-sm mt-3">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}

export default ProfilePage;
