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
    <div className="flex flex-col min-h-screen bg-gray-400">
      <Header />

      {/* Reserve height to prevent footer-jump */}
      <main className="flex-grow px-2 py-4 min-h-[70vh] flex justify-center items-center">
        {loading ? (
          <img src="/load.jpg" alt="Loading..." className="w-20 h-20" />
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-400">
      <div className="text-2xl text-black">Loading...</div>
    </div>
  );
}
export default App;
