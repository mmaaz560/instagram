import React, { useEffect } from 'react'
import Story from './Story'
import { BsDot } from 'react-icons/bs'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa6'
import { FaRegComment } from 'react-icons/fa'
import { LuRepeat } from 'react-icons/lu'
import { FiSend } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getallpost, postReset } from '../../redux/post/postSlice'
import moment from 'moment'

const Maincontent = () => {
const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getallpost())
    dispatch(postReset())
  }, [dispatch])

  return (
    <div className="w-full max-w-153.5 mx-auto">
      {/* Stories */}
      <Story />

      {/* Posts */}
      {post.length > 0 ? (
        <div className="mt-2 md:mt-6">
          {post?.filter(Boolean).map((item, index) => (
            <article
              key={index}
              className="mb-4 md:mb-6 pb-4 border-b border-gray-200 last:border-0"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-9 h-9 rounded-full p-0.5 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 shrink-0">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDegSnM1BupqlLkwOfnzKYPM7Hdkl3nvtmQw&s"
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                      alt={item?.userid?.name || 'user'}
                    />
                  </div>
                  <h3 className="font-semibold text-sm truncate">
                    {item?.userid?.name}
                  </h3>
                  <BsDot className="text-gray-400 shrink-0" />
                  <p className="text-xs text-gray-500 shrink-0">
                    {moment(item?.createdAt).fromNow()}
                  </p>
                </div>
                <button className="text-xl text-gray-700 shrink-0">
                  <BsThreeDots />
                </button>
              </div>

              {/* Media */}
              <div className="mt-1 bg-black flex items-center justify-center">
                <img
                  src={item?.media}
                  alt="post"
                  className="w-full max-h-146.25 object-contain"
                  style={{ filter: item.filter }}
                />
              </div>

              {/* Actions */}
              <div className="px-3 pt-2">
                <div className="flex items-center justify-between text-2xl">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:opacity-70 transition">
                      <FaRegHeart />
                      <span className="text-sm">203.4k</span>
                    </button>
                    <button className="flex items-center gap-1 hover:opacity-70 transition">
                      <FaRegComment />
                      <span className="text-sm">10.3k</span>
                    </button>
                    <button className="flex items-center gap-1 hover:opacity-70 transition">
                      <LuRepeat />
                      <span className="text-sm">9.4k</span>
                    </button>
                    <button className="hover:opacity-70 transition">
                      <FiSend />
                    </button>
                  </div>
                  <button className="hover:opacity-70 transition">
                    <FaRegBookmark />
                  </button>
                </div>

                {/* Caption */}
                <div className="text-sm mt-2 leading-snug">
                  <span className="font-semibold mr-2">
                    {item?.userid?.name}
                  </span>
                  {item.caption}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-16">
          No Posts Yet
        </div>
      )}
    </div>
  )
}

export default Maincontent