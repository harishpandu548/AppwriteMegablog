
import authservice from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logoutbtn() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
    authservice.logout().then(() => dispatch(logout()));
    navigate("/");
  };
  return <button className="inline-block px-6 py-2 duration-200 hover:bg-red-700 text-black bg-red-500  rounded-full dark:text-white" onClick={handleLogout}>Logout</button>;
}

export default Logoutbtn;
