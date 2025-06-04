import React from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
   <header className="bg-gray-500 shadow py-3">
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
                  className="inline-block px-4 py-2 text-sm text-white hover:bg-blue-100 hover:text-black rounded-full transition duration-200"
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
    </nav>
  </Container>
</header>
  );
}

export default Header;
