import React from 'react'
import Sidebar from '../../component/main/Sidebar'
import Maincontent from '../../component/main/Maincontent'
import Suggestion from '../../component/Suggestion'
import Creatpost from '../../component/post/Creatpost'
import { useGlobel } from '../../context/Context'

const Home = () => {
  const { showpostModel } = useGlobel()

  return (
    <>
      {showpostModel && <Creatpost />}

      <div className="min-h-screen bg-white">
        <div className="mx-auto flex w-full max-w-312.5">
          {/* Sidebar – handles its own desktop/mobile rendering */}
          <Sidebar />

          {/* Main Feed */}
          <main className="flex-1 min-w-0 pb-16 md:pb-0">
            <Maincontent />
          </main>

          {/* Suggestions – only on very large screens */}
          <aside className="hidden xl:block w-[320px] shrink-0 sticky top-0 h-screen py-6 px-4 border-l border-gray-100">
            <Suggestion />
          </aside>
        </div>
      </div>
    </>
  )
}

export default Home