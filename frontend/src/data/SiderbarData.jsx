import {
  AiFillHome,
  AiOutlineHome,
} from "react-icons/ai";

import {
  MdOutlineExplore,
} from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import {
  FiSend,
  FiSearch,
  FiHeart,
  FiPlusSquare,
  FiMenu,
} from "react-icons/fi";

import { CgProfile } from "react-icons/cg";

export const Sidebardata = [
  {
    id: 1,
    icon: <AiOutlineHome />,
    activeicon: <AiFillHome />,
    text: "Wellcom",
    link: "/home",
  },
  {
    id: 2,
    icon: <MdOutlineExplore />,
    activeicon: <MdOutlineExplore />,
    text: "Reels",
    link: "/reels",
  },
  {
    id: 3,
    icon: <FiSend />,
    activeicon: <FiSend />,
    text: "Messages",
    link: "/messages",
  },
  {
    id: 4,
    icon: <FiPlusSquare />,
    activeicon: <FiPlusSquare />,
    text: "Create",
    // link: "/create",
  },
  {
    id: 5,
    icon: <FiHeart />,
    activeicon: <FiHeart />,
    text: "Notification",
    link: "/notifications",
  },
  {
    id: 6,
    icon: <FiSearch />,
    activeicon: <FiSearch />,
    text: "Search",
    link: "/search",
  },
  {
    id: 7,
    icon: <CgProfile />,
    activeicon: <CgProfile />,
    text: "Profile",
    link: "/profile",
  },
];

export const Lastdata = [
  {
    id: 8,
    icon: <FiMenu />,
    activeicon: <FiMenu />,
    text: "More",
    link: "/more",
  },
  {
    id: 9,
    icon: <CiGrid41 />,
    activeicon: <IoGrid />,
    text: "from Meta",
    link: "/meta",
  },
];