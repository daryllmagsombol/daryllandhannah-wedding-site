import { Head } from '@inertiajs/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import mainImage from '../assets/images/sampleBG2.jpg'
import mobileBg from '../assets/images/mobileBG.jpg'
import daryllhannah from '../assets/images/daryllandhannah-logo.png'
import { useEffect, useState } from 'react'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />
      <Router>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Routes>
      </Router>
    </>
  )
}

const MainHome = () => {
  const [bgImage, setBgImage] = useState(mainImage)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBgImage(mobileBg)
      } else {
        setBgImage(mainImage)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="overflow-x-hidden flex flex-col">
      {/* First Section */}
      <div
        className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <img
          src={daryllhannah}
          alt="Daryll & Hannah"
          className="w-2/3 sm:w-1/3 h-auto rounded-full"
          style={{
            filter: 'brightness(0) invert(1)',
          }}
        />
        <p
          className="text-3xl mt-1"
          style={{
            textShadow: '0 1px 4px rgba(0,0,0,0.7), 0 0 1px #fff',
          }}
        >
          Aquila Crystal Place
        </p>
        <p
          className="text-3xl mt-1"
          style={{
            textShadow: '0 2px 6px rgba(0,0,0,0.7), 0 0 1px #fff',
          }}
        >
          Tagaytay City
        </p>
        <p
          className="text-3xl mt-1"
          style={{
            textShadow: '0 2px 6px rgba(0,0,0,0.7), 0 0 1px #fff',
          }}
        >
          September 5, 2025
        </p>
      </div>

      {/* Second Section */}
      <div className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-2">
          <div className="bg-white p-8 rounded-2xl max-w-3xl flex flex-col items-center">
            <h1 className="text-6xl font-extrabold mb-6 text-purple-900">Daryll & Hannah</h1>
            <p className="text-xl text-gray-700 italic mb-6">
              "Two souls, one heart, one beautiful journey."
            </p>
            <p className="text-lg text-gray-600 mb-6">
              From the very beginning, we believed that love is not just about finding the right
              person—it’s about discovering God’s perfect plan. Our journey together is a testament
              to His faithfulness, timing, and grace.
              <br /> <br />
              Every step we’ve taken has led us here, to a love that is deeper than words, rooted in
              faith, and strengthened by His promises. We are beyond grateful for this beautiful
              gift of love, knowing that our story was written long before we even met.
              <br /> <br />
              As we prepare to say "I do," we celebrate not just our love, but the One who made it
              possible. Our marriage is a covenant, a promise to love, honor, and serve each
              other—always guided by His wisdom and unconditional love.
              <br /> <br />
              We invite you to join us in witnessing this special day, as we begin a new chapter
              filled with love, faith, and a future designed by God.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const RSVP = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-r from-[#D6B4FC] to-[#B08BEB]">
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md">
      <h2 className="text-4xl font-bold mb-6 text-purple-900">RSVP</h2>
      <p className="text-lg text-gray-700 mb-6">
        We can't wait to celebrate with you! Let us know if you can join.
      </p>
      <form className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-3 rounded-lg shadow-md text-gray-700"
          required
        />
        <select className="border p-3 rounded-lg shadow-md text-gray-700">
          <option>Yes, I'll be there!</option>
          <option>Sorry, I can't make it.</option>
        </select>
        <button
          type="submit"
          className="bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-800 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)
