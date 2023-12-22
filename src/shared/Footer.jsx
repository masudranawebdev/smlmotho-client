import { BiSolidMap } from "react-icons/bi";
import { IoCallSharp } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";

const portfilioLinks = [
  { path: "#", label: "School Management" },
  { path: "#", label: "Pharmacy" },
  { path: "#", label: "Point Of Sales (POS)" },
  { path: "#", label: "Publication" },
  { path: "#", label: "Courier" },
  { path: "#", label: "Tailor" },
];

const quickLinks = [
  { path: "#", label: "About Us" },
  { path: "#", label: "Contact" },
  { path: "#", label: "Our Team" },
];

const helpfulLinks = [
  { path: "#", label: "Terms & Condition" },
  { path: "#", label: "Cookie Policy" },
  { path: "#", label: "Privacy Policy" },
  { path: "#", label: "Career" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const handleEmailClick = () => {
    window.location.href = `mailto:masudranainfo99@gmail.com`;
  };
  return (
    <footer className="bg-[#DFECED] text-black border-t-[5px] border-primaryColor">
      <div className="container py-10">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <div className="md:col-span-2 pr-10">
              <Link
                className="mb-6 font-bold text-[#0861F2]"
                style={{ fontSize: "22px" }}
                to={"/"}
              >
                SMLMOTHO
              </Link>
              <p className="text-[16px] leading-7 font-[400] mt-4">
                We specialize in converting your Vision about your website into
                Reality. Welcome to Classic It.
              </p>
              <ul className="flex flex-col leading-8 cursor-pointer ml-0 mb-0 list-none mt-5">
                <li className="flex items-center gap-3 mb-2">
                  <span>
                    <BiSolidMap className="w-[2rem] h-9  text-white bg-primaryColor rounded-md" />
                  </span>
                  <address className="text-[16px] leading-7 font-[400] hover:decoration-primaryColor">
                    Mohammadpur Limited <br /> Road 07, House 115, Dhaka-1207{" "}
                    <br /> Dhaka, Bangladesh
                  </address>
                </li>
                <li className="flex items-center gap-3 mb-2">
                  <span>
                    <IoCallSharp className="w-7 h-7  text-white bg-primaryColor rounded-md" />
                  </span>
                  <h3 className="text-[16px] leading-7 font-[400] hover:underline hover:decoration-primaryColor">
                    +8801796682951
                  </h3>
                </li>
                <li className="flex items-center gap-3 mb-2">
                  <span>
                    <SiMinutemailer className="w-[2rem] h-9 text-white bg-primaryColor rounded-md" />
                  </span>
                  <h3
                    onClick={handleEmailClick}
                    className="text-[16px] leading-7 font-[400] hover:underline hover:decoration-primaryColor"
                  >
                    masudranainfo99@gmail.com
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <FaMapMarkedAlt className="w-[2rem] h-9 text-white bg-primaryColor rounded-md" />
                  </span>
                  <h3 className="text-[16px] leading-7 font-[400]">
                    <a
                      href="https://maps.app.goo.gl/L8eh17N5tLfQ7HTW7"
                      target="_blank"
                      className="hover:underline hover:decoration-primaryColor "
                    >
                      Find us in Google
                    </a>
                  </h3>
                </li>
              </ul>
            </div>

            {/* Latest Portfolio */}
            <ul className="list-none ml-0 mb-0">
              <li className="leading-[30px] font-[500]">
                <h2
                  className="mb-6 text-[#0861F2]"
                  style={{ fontSize: "22px" }}
                >
                  Latest Portfolio
                </h2>
              </li>
              {portfilioLinks.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center mt-3 transition-all duration-300 hover:text-[#0861F2] hover:translate-x-1"
                >
                  <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
                  <Link
                    to={item.path}
                    className="flex flex-col text-[15px] hover:decoration-primaryColor"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* quick links */}
            <ul className="list-none ml-0 mb-0">
              <li className="leading-[30px] font-[500]">
                <h2
                  className="mb-6 text-[#0861F2]"
                  style={{ fontSize: "22px" }}
                >
                  Quick Link
                </h2>
              </li>
              {quickLinks.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center mt-3 transition-all duration-300 hover:text-[#0861F2] hover:translate-x-1"
                >
                  <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
                  <Link
                    to={item.path}
                    className="flex flex-col  text-[15px] hover:decoration-primaryColor"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* helpful links */}
            <ul className="list-none ml-0 mb-0">
              <li className="leading-[30px] font-[500]">
                <h2
                  className="mb-6 text-[#0861F2]"
                  style={{ fontSize: "22px" }}
                >
                  Helpful Links
                </h2>
              </li>
              {helpfulLinks.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center mt-3 transition-all duration-300 hover:text-[#0861F2] hover:translate-x-1"
                >
                  <BsArrowRightShort className="w-5 h-5 mr-1 inline-block" />
                  <Link
                    to={item.path}
                    className="flex flex-col text-[15px] hover:decoration-primaryColor"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* footer bottom */}
        <div className="footer-social-bg border-t mt-5 border-bgray-900">
          <p className="text-[16px] text-center py-4 leading-7 font-[400]">
            copyright @ {year} developed by
            <strong>
              <a
                href="https://mrmasud.netlify"
                target="_blank"
                className="text-[#0861F2] hover:underline hover:decoration-primaryColor"
              >
                <span> MRTECH</span>
              </a>
            </strong>{" "}
            || All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
