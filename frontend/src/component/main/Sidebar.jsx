import React from 'react';
import { Lastdata, Sidebardata } from '../../data/SiderbarData';
import { useGlobel } from '../../context/Context';
import { Link, useLocation } from "react-router-dom"; 
import { useSelector } from 'react-redux';

const Sidebar = () => {
  // ❌ setselect hata diya hai kyunki hum ab URL se active tab check karenge
  const { setshowpostmodel } = useGlobel();
  const location = useLocation(); // ✅ Current URL check karne ke liye
  const { user } = useSelector((state) => state.auth);

  const handleClick = (e, item) => {
    if (item.text === 'Create') {
      e.preventDefault(); // Link ko navigate hone se rokein
      setshowpostmodel(true); // Modal open karein
    }
  };

  // ✅ Helper function: URL ke hisaab se icon bold hoga
  const checkIsActive = (link) => {
    if (!link) return false;
    return location.pathname.includes(link);
  };

  return (
    <>
      {/* Reserve layout space + keep pinned on scroll */}
      <div className="hidden md:block sticky top-0 w-18 h-screen shrink-0">
        <aside className="group absolute top-0 left-0 h-screen bg-white border-r border-gray-200 w-18 hover:w-61.25 transition-[width] duration-300 ease-in-out px-2 py-4 overflow-hidden z-30">
          
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 mb-8 h-10 shrink-0">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/023/986/885/small/instagram-logo-instagram-logo-transparent-instagram-icon-transparent-free-free-png.png"
              className="w-8 h-8 object-contain shrink-0 group-hover:hidden"
              alt="Instagram"
            />
            <span className="hidden group-hover:inline text-2xl font-semibold italic tracking-tight whitespace-nowrap">
              Instagram
            </span>
          </div>

          {/* Main nav */}
          <nav className="flex flex-col gap-1 flex-1">
            {Sidebardata.map((item, index) => {
              const isActive = checkIsActive(item.link);
                let finalLink = item.link || "#";
              if (item.link === "/profile" && user?._id) {
                finalLink = `/profile/${user._id}`;
              }

              return (
                <Link
                   to={finalLink} // 👈 Yahan dynamic link pass karein
                  key={index}
                  onClick={(e) => handleClick(e, item)}
                  className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-gray-100 transition-colors text-2xl"
                >
                  <span className="shrink-0 flex items-center justify-center w-6 group-hover:scale-105 transition-transform">
                    {isActive ? item.activeicon : item.icon}
                  </span>
                  <span
                    className={`text-base whitespace-nowrap -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-150 ${
                      isActive ? 'font-bold' : 'font-normal'
                    }`}
                  >
                    {item.text}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom nav */}
          <nav className="flex flex-col gap-1 mt-auto">
            {Lastdata.map((item, index) => {
              const isActive = checkIsActive(item.link);
              return (
                <button
                  key={index}
                  onClick={(e) => handleClick(e, item)}
                  className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-gray-100 transition-colors text-2xl"
                >
                  <span className="shrink-0 flex items-center justify-center w-6">
                    {isActive ? item.activeicon : item.icon}
                  </span>
                  <span
                    className={`text-base whitespace-nowrap -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-150 ${
                      isActive ? 'font-bold' : 'font-normal'
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <ul className="flex items-center justify-around h-14 px-1">
          {Sidebardata.map((item, index) => {
            const isActive = checkIsActive(item.link);
            return (
              <li key={index} className="flex-1 flex justify-center">
                <Link
                  to={item.link || "#"}
                  onClick={(e) => handleClick(e, item)}
                  className="flex items-center justify-center p-2 text-[22px]"
                >
                  {isActive ? item.activeicon : item.icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;