import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiSettings, FiCamera, FiPlay } from "react-icons/fi";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { getallpost } from "../../redux/post/postSlice";
import Sidebar from "../../component/main/Sidebar";
import { useGlobel } from "../../context/Context";
import Creatpost from "../../component/post/Creatpost";

const Profile = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("posts");

  const { user } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    if (post.length === 0) {
      dispatch(getallpost());
    }
  }, [dispatch, post.length]);

  const currentUser = user?.data || user;

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Please login to view profile
          </h2>
          <p className="text-gray-500">You need an account to continue</p>
        </div>
      </div>
    );
  }

  const userPosts = post.filter((p) => {
    const postUserId = p.userid?._id || p.userid;
    return postUserId === currentUser?._id;
  });

  // Dummy data
  const dummySaved = [
    "https://picsum.photos/400/400?random=10",
    "https://picsum.photos/400/400?random=11",
    "https://picsum.photos/400/400?random=12",
    "https://picsum.photos/400/400?random=13",
    "https://picsum.photos/400/400?random=17",
    "https://picsum.photos/400/400?random=18",
  ];

  const dummyReels = [
    { thumb: "https://picsum.photos/400/700?random=14", views: "12.5k" },
    { thumb: "https://picsum.photos/400/700?random=15", views: "8.2k" },
    { thumb: "https://picsum.photos/400/700?random=16", views: "45k" },
    { thumb: "https://picsum.photos/400/700?random=19", views: "3.1k" },
    { thumb: "https://picsum.photos/400/700?random=20", views: "21k" },
    { thumb: "https://picsum.photos/400/700?random=21", views: "9.8k" },
  ];
     const { showpostModel } = useGlobel()
  return (
    <>
    {showpostModel && <Creatpost />}
    <div className="flex min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="fixed left-0 top-0 h-full z-50">
        <Sidebar />
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* ─── PROFILE HEADER ─── */}
     {/* ─── PROFILE HEADER ─── */}
<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-center gap-6 sm:gap-10 md:gap-14 mb-10 max-w-2xl mx-auto">
  {/* Profile Picture with gradient ring */}
  <div className="relative shrink-0">
    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-3px bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg">
      <img
        src={
          currentUser?.profilePic ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt="profile"
        className="w-full h-full object-cover rounded-full border-[3px] border-white dark:border-black bg-white"
      />
    </div>
  </div>

  {/* User Info */}
  <div className="flex-1 w-full text-center sm:text-left">
    {/* Username + Buttons */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5 justify-center sm:justify-start">
      <h1 className="text-3xl  font-semibold tracking-tight">
        {currentUser?.username || "username"}
      </h1>

      <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
        <Link
          to="/edit-profile"
          className="px-5 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm font-semibold rounded-lg transition-colors"
        >
          Edit profile
        </Link>
        <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm font-semibold rounded-lg transition-colors">
          View archive
        </button>
        <button className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors">
          <FiSettings className="text-lg" />
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="flex justify-center sm:justify-start gap-8 mb-5 text-[15px]">
      <div className="cursor-pointer hover:opacity-70 transition">
        <span className="font-semibold">{userPosts.length}</span> posts
      </div>
      <div className="cursor-pointer hover:opacity-70 transition">
        <span className="font-semibold">1,245</span> followers
      </div>
      <div className="cursor-pointer hover:opacity-70 transition">
        <span className="font-semibold">180</span> following
      </div>
    </div>

    {/* Bio */}
    <div className="max-w-md mx-auto sm:mx-0">
      <h2 className="font-semibold text-[15px]">
        {currentUser?.name || "Your Name"}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
        {currentUser?.bio || "Full Stack Developer 🚀 | Creating cool stuff"}
      </p>
    </div>
  </div>
</div>

{/* ─── HIGHLIGHTS ─── */}
<div className="flex  gap-5 overflow-x-auto pb-6 mb-2 scrollbar-hide max-w-2xl mx-auto">
  {[1, 2, 3, 4, 5].map((item) => (
    <div
      key={item}
      className="flex flex-col items-center gap-1.5 cursor-pointer min-w-72px group"
    >
      <div className="w-16 h-16 sm:w-76px sm:h-76px rounded-full p-2px border border-gray-300 dark:border-neutral-700 group-hover:scale-105 transition-transform duration-200">
        <img
          src={`https://picsum.photos/100/100?random=${item}`}
          alt="highlight"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
        Highlight
      </span>
    </div>
  ))}
</div>
        {/* ─── TABS ─── */}
        {/* ─── TABS SECTION ─── */}
        <div className="border-t border-gray-200 dark:border-neutral-800">
          <div className="flex justify-center gap-12 sm:gap-16">
            {[
              { id: "posts", icon: <BsGrid3X3 className="text-[15px]" />, label: "Posts" },
              { id: "saved", icon: <BsBookmark className="text-[15px]" />, label: "Saved" },
              {
                id: "reels",
                icon: <MdOutlineSlowMotionVideo className="text-lg" />,
                label: "Reels",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 py-3 text-xs font-semibold tracking-widest uppercase transition-colors ${
                  activeTab === tab.id
                    ? "text-black dark:text-white"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                {/* Active Indicator */}
                {activeTab === tab.id && (
                  <span className="absolute top-0 left-0 right-0 h-[1.5px] rounded-full bg-black dark:bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── TAB CONTENT ─── */}
        <div className="mt-2 pb-20">
          
          {/* POSTS */}
          {activeTab === "posts" &&
            (userPosts.length > 0 ? (
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-4 p-1">
                {userPosts.map((item) => (
                  <div
                    key={item._id}
                    className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg md:rounded-xl bg-gray-100 dark:bg-neutral-900 shadow-sm"
                  >
                    <img
                      src={item.media}
                      alt="post"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ filter: item.filter }}
                    />
                    {/* Modern Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 sm:gap-6 text-white font-bold text-sm sm:text-base">
                      <span className="flex items-center gap-1.5 drop-shadow-md">
                        <FaRegHeart className="text-lg sm:text-xl" /> 203
                      </span>
                      <span className="flex items-center gap-1.5 drop-shadow-md">
                        <FaRegComment className="text-lg sm:text-xl" /> 10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<FiCamera />}
                title="No Posts Yet"
                text="When you share photos, they will appear on your profile."
              />
            ))}

          {/* SAVED */}
          {activeTab === "saved" && (
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-4 p-1">
              {dummySaved.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg md:rounded-xl bg-gray-100 dark:bg-neutral-900 shadow-sm"
                >
                  <img
                    src={img}
                    alt="saved"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <BsBookmark className="text-3xl text-white drop-shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* REELS */}
          {activeTab === "reels" && (
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-4 p-1">
              {dummyReels.map((reel, idx) => (
                <div
                  key={idx}
                  className="relative aspect-9/16 group cursor-pointer overflow-hidden rounded-lg md:rounded-xl bg-gray-100 dark:bg-neutral-900 shadow-sm"
                >
                  <img
                    src={reel.thumb}
                    alt="reel"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Dark Gradient at Bottom */}
                  <div className="absolute inset-0 bg-lineart-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  
                  {/* Center Play Icon (Hover par show hoga) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/40 backdrop-blur-md p-3 rounded-full">
                      <FiPlay className="text-white fill-white text-xl ml-1" />
                    </div>
                  </div>

                  {/* Views at Bottom */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs sm:text-sm font-semibold drop-shadow-md">
                    <FiPlay className="fill-white" size={14} />
                    {reel.views}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
    </>
  );
  
};

/* ─── Empty State Component ─── */
const EmptyState = ({ icon, title, text }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center px-4">
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-300 dark:border-neutral-600 flex items-center justify-center mb-5 text-gray-400">
      <span className="text-2xl sm:text-3xl">{icon}</span>
    </div>
    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">{text}</p>
  </div>
);

export default Profile;