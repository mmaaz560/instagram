import React from 'react'

const Story = () => {
  const stories = [
    { id: 1, username: 'your_story', avatar: 'https://i.pravatar.cc/150?img=1', isYourStory: true, seen: false },
    { id: 2, username: 'alex_river', avatar: 'https://i.pravatar.cc/150?img=2', isYourStory: false, seen: false },
    { id: 3, username: 'maya_lee', avatar: 'https://i.pravatar.cc/150?img=3', isYourStory: false, seen: false },
    { id: 4, username: 'jordan_b', avatar: 'https://i.pravatar.cc/150?img=4', isYourStory: false, seen: true },
    { id: 5, username: 'taylor_swift', avatar: 'https://i.pravatar.cc/150?img=5', isYourStory: false, seen: false },
    { id: 6, username: 'chris_evans', avatar: 'https://i.pravatar.cc/150?img=6', isYourStory: false, seen: true },
    { id: 7, username: 'zendaya', avatar: 'https://i.pravatar.cc/150?img=7', isYourStory: false, seen: false },
    { id: 8, username: 'tom_holland', avatar: 'https://i.pravatar.cc/150?img=8', isYourStory: false, seen: false },
  ]

  return (
    <div className="w-full px-3 md:px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-4 overflow-x-auto story-scroll scroll-smooth py-1">
        {stories.map((story) => {
          const isUnseen = !story.seen
          return (
            <div
              key={story.id}
              className="flex flex-col items-center shrink-0 cursor-pointer"
            >
              <div className="relative">
                {story.isYourStory || isUnseen ? (
                  <div className="story-ring">
                    <div className="story-ring-inner">
                      <img src={story.avatar} alt={story.username} className="story-avatar" />
                    </div>
                  </div>
                ) : (
                  <div className="story-ring-seen">
                    <div className="story-ring-seen-inner">
                      <img src={story.avatar} alt={story.username} className="story-avatar" />
                    </div>
                  </div>
                )}

                {story.isYourStory && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full border-2 border-white w-5 h-5 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                )}
              </div>

              <span className="text-xs text-gray-700 truncate w-16 text-center mt-1">
                {story.isYourStory ? 'Your story' : story.username}
              </span>
            </div>
          )
        })}
      </div>

      <style>{`
        .story-scroll::-webkit-scrollbar { height: 0px; }
        .story-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .story-ring {
          background: radial-gradient(circle at 30% 30%, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5);
          padding: 3px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .story-ring-inner {
          background-color: white;
          border-radius: 9999px;
          padding: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .story-ring-seen {
          background: #dbdbdb;
          padding: 3px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .story-ring-seen-inner {
          background-color: white;
          border-radius: 9999px;
          padding: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .story-avatar {
          width: 62px;
          height: 62px;
          object-fit: cover;
          border-radius: 9999px;
          display: block;
        }
        @media (max-width: 640px) {
          .story-avatar { width: 56px; height: 56px; }
        }
      `}</style>
    </div>
  )
}

export default Story