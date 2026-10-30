import React, { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import { filtersData } from "../../data/filtersdata";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { addpost, postReset } from "../../redux/post/postSlice";
import toast from "react-hot-toast";
import { useGlobel } from "../../context/Context";

const Creatpost = () => {
  const [media, setMedia] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [secondform, setsecondform] = useState(false);
  const [cloudimage, setcloudimage] = useState(null);
  const [caption, setcaption] = useState('');
  const [imageloder, setimageloder] = useState(false);
  
  const dispatch = useDispatch();
  const { postsuccess } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { setshowpostmodel } = useGlobel();
  
  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setcloudimage(file);
    const imageUrl = URL.createObjectURL(file);
    setMedia(imageUrl);
  };

  const handleBack = () => {
    if (secondform) {
      setsecondform(false);
    } else if (showFilters) {
      setShowFilters(false);
    } else {
      setMedia(null);
      setShowFilters(false);
    }
  };

  const handlepost = async () => {
    let formData = new FormData();
    formData.append('file', cloudimage);
    formData.append("upload_preset", 'instaram26');
    setimageloder(true);

    try {
      let response = await axios.post("https://api.cloudinary.com/v1_1/drrpsd1yd/image/upload", formData);
      let mediaUrl = response.data.secure_url; 

      dispatch(addpost({
        media: mediaUrl,
        caption,
        filter: selectedFilter,
        userid: user?.data?._id
      }));
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    } finally {
      setimageloder(false);
    }
  };

  useEffect(() => {
    if (postsuccess) {
      toast.success('posted successfully');
      setshowpostmodel(false);
      setcaption('');
      setcloudimage(null);
      setSelectedFilter('none');
      setMedia(null);     
      setsecondform(false);
      setShowFilters(false);
      dispatch(postReset());
    }
  }, [postsuccess, dispatch, setshowpostmodel]);

  return (
    // ✅ p-4 lagaya hai taake mobile par bhi screen ke edges se gap rahe (full screen na ho)
    <div onClick={() => setshowpostmodel(false)} className="fixed inset-0 bg-black/70 flex flex-col md:flex-row items-center justify-center z-50 p-4">
      
      {/* ✅ Main Modal (Image Area): Mobile par h-[50vh] (upar), Desktop par md:h-[85vh] */}
      <div className={`bg-white transition-all duration-300 flex flex-col overflow-hidden
        ${showFilters ? 'h-[50vh] w-full rounded-t-xl md:rounded-e-none md:rounded-s-xl md:h-[85vh] md:w-[60%] lg:w-[50%]' 
                      : 'h-[70vh] w-full rounded-xl md:h-[85vh] md:w-[60%] lg:w-[50%]'}
        ${showFilters ? 'md:flex' : 'flex'}`}
      >
        {/* Header */}
        <div onClick={(e) => e.stopPropagation()} className="z-10 shrink-0">
          <div className="flex items-center justify-between px-5 py-3 border-b">
            <FaArrowLeft className="text-xl cursor-pointer" onClick={handleBack} />
            <h1 className="font-semibold text-lg">{media ? "Edit" : "Create New Post"}</h1>
            {media ? (
              <h2
                onClick={() => setShowFilters(true)}
                className={`${showFilters ? "hidden" : "block"} transition-all cursor-pointer text-blue-500 font-semibold`}
              >
                Next
              </h2>
            ) : (
              <div className="w-6"></div>
            )}
          </div>

          {/* Upload Screen */}
          {!media ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4 h-full">
              <FiImage className="text-6xl md:text-7xl text-gray-400" />
              <h2 className="text-lg md:text-xl font-medium mt-4 text-center">Drag photos and videos here</h2>
              <label htmlFor="file" className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-lg cursor-pointer">
                Select from Computer
              </label>
              <input id="file" type="file" accept="image/*" className="hidden" onChange={handleMedia} />
            </div>
          ) : (
            /* Edit Screen */
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 bg-black flex items-center justify-center">
                <img
                  src={media}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: selectedFilter }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* ✅ Filter/Caption Panel: Mobile par h-[40vh] (neecha), Desktop par md:h-[85vh] */}
      <div onClick={(e) => e.stopPropagation()}
        className={`bg-white overflow-hidden transition-all duration-300 flex flex-col
          ${showFilters 
            ? "w-full h-[40vh] rounded-b-xl border-t border-gray-200 md:border-t-0 md:border-l md:w-350px md:h-[85vh] md:rounded-s-none md:rounded-e-xl shadow-xl" 
            : "w-0 h-0 md:h-[85vh] md:w-0 md:opacity-0"}
        `}
      >
        <div className="h-full p-4 overflow-y-auto">
          <h3 
            onClick={secondform ? handlepost : () => setsecondform(true)} 
            className={`${showFilters ? 'block' : 'hidden'} border-b border-gray-200 pb-3 text-end text-blue-500 font-semibold cursor-pointer`}
          >
            {secondform ? (
              imageloder ? (
                <div className="flex justify-end">
                  <Circles height="20" width="20" color="gray" visible={true} />
                </div>
              ) : "Post"
            ) : "Next"}
          </h3>
          
          {secondform ? (
            <div className="flex mt-3 flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDegSnM1BupqlLkwOfnzKYPM7Hdkl3nvtmQw&s" className='w-10 h-10 rounded-full object-cover' alt="" />
                <h3 className='font-semibold text-sm'>username</h3>
              </div>
              <textarea 
                value={caption} 
                onChange={(e) => setcaption(e.target.value)}
                className="border border-gray-300 bg-gray-50 rounded-lg h-24 md:h-30 outline-0 p-3 w-full resize-none text-sm focus:ring-1 focus:ring-gray-300" 
                placeholder="Write a caption..."
              ></textarea>
              <div className="flex justify-between items-center px-1">
                <div className="text-xl cursor-pointer">🙁</div>
                <div className="text-gray-400 text-xs">{caption.length}/2,200</div>
              </div>
              <div className="flex text-gray-500 py-2 text-sm justify-between items-center border-t border-gray-100">
                <input type="text" className="outline-0 p-2 flex-1 bg-transparent" placeholder="Add location" />
                <CiLocationOn className="text-lg" />
              </div>
              <div className="flex text-gray-500 text-sm justify-between items-center border-t border-gray-100">
                <input type="text" className="outline-0 p-2 flex-1 bg-transparent" placeholder="Add collaborators" />
                <MdOutlinePersonAddAlt className="text-lg" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 mt-3 gap-2">
              {filtersData.map((item, index) => (
                <div key={index} onClick={() => setSelectedFilter(item.filter)} className="cursor-pointer">
                  <img
                    src={media}
                    alt={item.name}
                    className={`w-full h-16 md:h-20 object-cover rounded-lg border-2 transition-all ${
                      selectedFilter === item.filter ? "border-blue-500 scale-105" : "border-transparent"
                    }`}
                    style={{ filter: item.filter }}
                  />
                  <p className="text-center text-xs mt-1 text-gray-600">{item.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Creatpost;