import React from 'react'
import { useSelector } from 'react-redux'
const Suggestion = () => {
  const currentUser = {
    
    avatar: 'https://i.pravatar.cc/150?img=12',
  }

  const suggestions = [
    { id: 1, username: 'alex_river', subtitle: 'Followed by maya_lee', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 2, username: 'maya_lee', subtitle: 'Suggested for you', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 3, username: 'jordan_b', subtitle: 'Followed by chris_evans', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 4, username: 'taylor_swift', subtitle: 'Suggested for you', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 5, username: 'zendaya', subtitle: 'Followed by tom_holland', avatar: 'https://i.pravatar.cc/150?img=7' },
  ]
   const {user} = useSelector((state)=>state.auth)
  return (
    <div className="w-full">
      {/* Current user */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{user?.data?.username}</p>
            <p className="text-xs text-gray-500 truncate">{user?.data?.name}</p>
          </div>
        </div>
        <button className="text-xs text-blue-500 font-semibold hover:text-blue-700 shrink-0">
          Switch
        </button>
      </div>

      {/* Suggestions header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 font-semibold">Suggested for you</p>
        <button className="text-xs font-semibold text-gray-900 hover:text-gray-600">
          See All
        </button>
      </div>

      {/* Suggestion list */}
      <div className="flex flex-col gap-3">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{user.username}</p>
                <p className="text-xs text-gray-500 truncate">{user.subtitle}</p>
              </div>
            </div>
            <button className="text-xs text-blue-500 font-semibold hover:text-blue-700 shrink-0">
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-gray-400 space-y-3">
        <div className="flex flex-wrap gap-x-1 gap-y-1 leading-relaxed">
          {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language'].map(
            (link, i, arr) => (
              <React.Fragment key={link}>
                <a href="#" className="hover:underline">{link}</a>
                {i < arr.length - 1 && <span>·</span>}
              </React.Fragment>
            )
          )}
        </div>
        <p>© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  )
}

export default Suggestion