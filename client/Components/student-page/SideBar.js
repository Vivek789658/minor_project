import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBell,
  faCog,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import profile from "./profile.jpg";

const SideBar = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const name = userData?.name;
  const userType = userData?.type;
  const profileImage = localStorage.getItem("profileImage") || profile;

  return (
    <div className="w-2/12 bg-slate-800 text-white h-[calc(100vh-15vh)] overflow-y-auto flex flex-col items-center rounded-md md:max-xl:w-3/12">
      {/* Profile Section */}
      <div className="flex flex-col items-center mt-8 sm:hidden">
        <img
          src={profileImage}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
      </div>
      <div className="md:flex md:flex-col md:items-center mt-8 hidden sm:flex">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <h2 className="mt-4 text-2xl font-semibold">{name}</h2>
        <p className="text-sm">{userType}</p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-8 flex flex-col items-center w-full">
        <Link
          to={`/${userType}`}
          className="bg-white text-black font-semibold text-center text-lg py-1.5 px-3 rounded-md w-9/12 m-3 hover:scale-110 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faHome} className="mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <Link
          to={`/${userType}/notifications`}
          className="bg-white text-black font-semibold py-1.5 px-3 text-lg text-center rounded-md w-9/12 m-3 hover:scale-110 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faBell} className="mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Updates</span>
        </Link>
        <Link
          to="/settings"
          className="bg-white text-black font-semibold py-1.5 px-3 text-lg text-center rounded-md w-9/12 m-3 hover:scale-110 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faCog} className="mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Settings</span>
        </Link>
        <Link
          to={`/${userType}/contact`}
          className="bg-white text-black font-semibold py-1.5 px-3 text-lg text-center rounded-md w-9/12 m-3 hover:scale-110 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Contact</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
