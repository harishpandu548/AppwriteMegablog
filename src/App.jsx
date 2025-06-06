import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getcurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <Header />
      <div className="border-t border-black dark:border-white w-full" />{" "}
      {/* White horizontal line */}
      <main className="..."> </main>
      <main className="flex-grow px-2 py-4 min-h-[70vh] flex justify-center items-center ">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="flex justify-center bg-gray-100 text-black dark:bg-gray-800 text-2xl dark:text-white items-center h-screen ">
       Loading....
    </div>
  );
}
export default App;
