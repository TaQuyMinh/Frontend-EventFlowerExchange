import React, { useState, useEffect } from "react";
import "./index.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate("/order");
  };

  const handleProfile = () => {
    navigate("/profile-customer");
  };

  const handleProduct = () => {
    navigate("/product");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole); // Set the role based on sessionStorage
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, []);

  return (
    <div className="header flex items-center justify-between py-5 font-medium relative">
      <Link to={"/"}>
        <img
          src="https://i.postimg.cc/sf9KmBz1/logo.png"
          className="w-36"
          alt="Logo"
        />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className="flex flex-col items-center gap-1 group">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </NavLink>
        <NavLink
          to={"/product"}
          className="flex flex-col items-center gap-1 group"
        >
          <p>PRODUCTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </NavLink>
        <NavLink
          to={"/contact"}
          className="flex flex-col items-center gap-1 group"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </NavLink>
        <NavLink
          to={"/about"}
          className="flex flex-col items-center gap-1 group"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6 relative">
        {isLoggedIn ? (
          <>
            <div className="group relative">
              <img
                src="https://static.vecteezy.com/system/resources/previews/006/017/592/non_2x/ui-profile-icon-vector.jpg"
                className="w-8 cursor-pointer rounded-full"
                alt="Profile Icon"
              />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleProfile}
                  >
                    My profile
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleOrder}
                  >
                    Order
                  </p>
                  {role === "Seller" && (
                    <p
                      className="cursor-pointer hover:text-black"
                      onClick={handleProduct}
                    >
                      Product
                    </p>
                  )}
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>

            {/* Hiển thị cart khi người dùng đã đăng nhập */}
            <Link to={"/cart"} className="relative w-5 min-w-7">
              <img
                src="https://www.pngitem.com/pimgs/m/365-3659067_shopping-paper-bag-outline-shopping-cart-bag-icon.png"
                alt="Cart Icon"
              />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                10
              </p>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to={"/seller-register"}
              className="text-gray-700 cursor-pointer border-0.5 border-black rounded-md px-5 py-2 transition hover:bg-green-500 hover:text-white"
              style={{ borderRadius: "20px", borderWidth: "2px" }}
            >
              Become a Seller
            </Link>
            <Link
              to={"/login"}
              className="text-gray-700 cursor-pointer border-0.5 border-black rounded-md px-5 py-2 transition hover:bg-blue-500 hover:text-white"
              style={{ borderRadius: "20px", borderWidth: "2px" }}
            >
              Login
            </Link>
          </div>
        )}

        <img
          src="https://www.svgrepo.com/show/509382/menu.svg"
          className="cursor-pointer sm:hidden w-8"
          alt="Menu Icon"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Slide bar for small screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-500 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-90"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Z9q-sIIPPAjNg5vlVUhfJznWgbWu4Sr34jXn0NQGnJOcfjCkCJTmG_2opr-cgv4YQtk&usqp=CAU"
              alt="Back Icon"
            />
            <p>Back</p>
          </div>
          <NavLink className="py-2 pl-6 border" to={"/"}>
            HOME
          </NavLink>
          <NavLink className="py-2 pl-6 border" to={"/collection"}>
            COLLECTION
          </NavLink>
          <NavLink className="py-2 pl-6 border" to={"/contact"}>
            CONTACT
          </NavLink>
          <NavLink className="py-2 pl-6 border" to={"/about"}>
            ABOUT
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;