import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiGift, FiMinus } from "react-icons/fi";
import { FcFlashOn } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { GiBeachBag } from "react-icons/gi";
import FormSearch from "./FormSearch";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { GoArrowRight, GoPlus } from "react-icons/go";
import ProductNotFound from "../components/product-not-found/ProductNotFound";
import {
  addToCart,
  removeFromCart,
  removeOne,
} from "../redux/features/cartSlice";
import { getUserInfo, removeUserInfo } from "../service/auth.service";
import { getInitials } from "../utils/getInitials";
import { authKey } from "../constants/storageKey";

const Header = () => {
  const [user, setUser] = useState(getUserInfo());
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  
  const dispatch = useDispatch();
  const name = getInitials(user?.userName);
  const handleToggle = () => {
    setIsOpen((previous) => !previous);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleLogout = () => {
    removeUserInfo(authKey);
    setUser(null);
  };
  
  return (
    <div className="bg-[#2C95C0] py-3">
      {/* main content */}
      <div className="container">
        <div className="flex justify-between items-center text-white">
          {/* mobile toggle bar */}
          <div onClick={handleToggle}>
            {isOpen ? (
              <MdClose className="w-6 h-6 block lg:hidden" />
            ) : (
              <GiHamburgerMenu className="w-6 h-6 block lg:hidden" />
            )}
          </div>
          {/* logo */}
          <a className="uppercase lg:mr-auto" href="/">
            SMLMOTHO
          </a>
          {/* search bar */}
          <div className="w-1/2 px-10 hidden md:block">
            <FormSearch />
          </div>
          {/* mobile cart bar */}
          <Link
            to="#"
            onClick={toggleDrawer}
            className="relative inline-flex items-center justify-center p-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow hover:ring-1 hover:ring-purple-500 lg:hidden"
          >
            <GiBeachBag className="w-6 h-6 text-white" />
            <span className="absolute top-1/2 right-1/2 bg-indigo-500 w-5 h-5 flex items-center justify-center text-white rounded-full">
              {products?.length}
            </span>
          </Link>

          <div className="hidden lg:flex gap-5">
            <div className="flex items-center gap-3">
              <FiGift className="w-6 h-6" />
              <div>
                <h2 className="text-[16px] font-normal">Offer</h2>
                <p className="text-[12px]">latest offer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FcFlashOn className="w-6 h-6 animate-pulse" />
              <div>
                <h2 className="text-[16px] font-normal">Mobile Deal</h2>
                <p className="text-[12px]">Special Deals</p>
              </div>
            </div>

            <Link
              to="#"
              onClick={toggleDrawer}
              className="relative inline-flex items-center justify-center p-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow hover:ring-1 hover:ring-purple-500"
            >
              <GiBeachBag className="w-6 h-6 text-white" />
              <span className="absolute top-1/2 right-1/2 bg-indigo-500 w-5 h-5 flex items-center justify-center text-white rounded-full">
                {products?.length}
              </span>
            </Link>
            <div className="group relative overflow-visible">
              <Link
                to={user?.id ? "#" : "/sign-in"}
                className="relative inline-flex items-center justify-center p-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow hover:ring-1 hover:ring-purple-500"
              >
                {user?.id ? (
                  <span className="text-white font-bold text-lg w-6 h-6">
                    {name}
                  </span>
                ) : (
                  <FiUser className="w-6 h-6 text-white" />
                )}
              </Link>
              {user?.id && (
                <span
                  onClick={handleLogout}
                  className="opacity-0 absolute -bottom-10 bg-error-300 -right-4 group-hover:opacity-100 cursor-pointer py-2 px-5 rounded-full"
                >
                  Logout
                </span>
              )}
            </div>
          </div>
          {/* mobile navber */}
          <div className="fixed bottom-0 left-0 px-5 py-2 lg:hidden flex justify-between w-full gap-3 bg-primaryColor z-50">
            <div className="flex flex-col items-center">
              <FiGift className="w-4 h-4" />
              <div>
                <h2 className="text-[12px] font-normal">Offer</h2>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <FcFlashOn className="w-4 h-4 animate-pulse" />
              <div>
                <h2 className="text-[12px] font-normal">Mobile Deal</h2>
              </div>
            </div>
            <Link to="#" className="flex flex-col items-center">
              <BiSolidMessageAltAdd className="w-4 h-4" />
              <div>
                <h2 className="text-[12px] font-normal">Buy Mobile</h2>
              </div>
            </Link>
            <Link to="/sign-in" className="flex flex-col items-center">
              <FiUser className="w-4 h-4" />
              <div>
                <h2 className="text-[12px] font-normal">Account</h2>
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`absolute z-50 lg:hidden  transition-all w-[300px] duration-300 ${
            isOpen ? "-translate-x-1" : "-translate-x-[320px]"
          }`}
        >
          {/* <MobileMenu /> */}
        </div>
      </div>
      {/* cart drawer */}
      <div
        className={`min-h-screen fixed inset-y-0 right-0 z-50 bg-bgray-50 overflow-y-auto transition-transform duration-500 transform ${
          isDrawerOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <button className="text-4xl" onClick={toggleDrawer}>
            <GoArrowRight className="p-1 bg-blue-gray-50 shadow rounded-full" />
          </button>
          <p>
            <strong>Total:</strong>{" "}
            <span className="text-orange">{total}৳</span>
          </p>
        </div>
        <div className="py-1 px-4">
          {products?.length > 0 ? (
            <div className="flex flex-col gap-y-1 bg-white">
              {products?.map((mobile) => (
                <div className="border shadow-sm rounded" key={mobile.id}>
                  <div className="flex items-center pr-5 gap-3">
                    {/* thumbnail */}
                    <img
                      className="w-18 h-20"
                      src={mobile?.thumbnail}
                      alt={mobile?.title}
                    />
                    {/* title & price */}
                    <div className="md:px-5">
                      <h2 className="w-full text-base md:text-md font-normal md:font-semibold">
                        {mobile.title}
                      </h2>
                      <p className="text-orange font-bold">{mobile.price}৳</p>
                    </div>
                    {/* color & size */}
                    <div className="w-full flex items-center justify-center flex-col gap-[2px] md:gap-2 md:flex-row">
                      {/* color */}
                      <div
                        className={`w-8 h-8 flex justify-center items-center gap-2 p-[2px] border-2 border-primaryColor rounded `}
                      >
                        <span
                          className={`w-6 h-6 rounded-full ${
                            mobile.selectColor === "Black"
                              ? "bg-black"
                              : mobile.selectColor === "Blue"
                                ? "bg-blue-600"
                                : "bg-red-600"
                          }`}
                        ></span>
                      </div>
                      {/* size */}
                      <div
                        className={`border-2 border-primaryColor rounded px-[2px]`}
                      >
                        <p className="text-center">{mobile?.selectSize}"</p>
                      </div>
                    </div>
                    {/* quantity calculation */}
                    <div className="flex flex-col md:flex-row items-center mx:pr-3">
                      <span
                        onClick={() => {
                          if (mobile.quantity > 1) {
                            dispatch(removeOne(mobile));
                          }
                        }}
                        className={`${
                          mobile.quantity > 1
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        } text-2xl md:text-3xl`}
                      >
                        <FiMinus className="p-1 group-hover:bg-blue-gray-50 shadow rounded" />{" "}
                      </span>
                      <span className="text-lg md:text-2xl border mx-1 px-3 rounded-sm">
                        {mobile.quantity}
                      </span>
                      <span
                        onClick={() => dispatch(addToCart(mobile))}
                        className="text-2xl md:text-3xl cursor-pointer"
                      >
                        <GoPlus className="p-1 group-hover:bg-blue-gray-50 shadow rounded" />
                      </span>
                    </div>
                    {/* item remover */}
                    <span
                      onClick={() => dispatch(removeFromCart(mobile))}
                      className="text-2xl md:text-3xl group cursor-pointer"
                    >
                      <IoMdClose className="p-1 text-white bg-error-300  group-hover:bg-error-200 shadow rounded" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductNotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
