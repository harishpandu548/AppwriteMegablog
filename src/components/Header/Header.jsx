import React from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Themetoggle from "../Themetoggle";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
   <header className="bg-gray-100 text-black shadow py-3 dark:bg-gray-800 dark:text-white">
  <Container>
    <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
      {/* Logo centered on small screens, left on larger */}
      <div className="flex justify-center sm:justify-start">
        <Link to="/">
          <Logo width="70px" />
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-block px-4 py-2 text-sm bg-amber-500 text-black hover:bg-amber-700  dark:text-white dark:bg-gray-900 dark:hover:bg-gray-500 rounded-full duration-200"
                >
                  {item.name}
                </button>
              </li>
            )
        )}
        {authStatus && (
          <li>
            <Logoutbtn />
          </li>
        )}
      </ul>
      <Themetoggle/>
    </nav>
  </Container>
</header>
  );
}

export default Header;
