import { Head } from '@inertiajs/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import mainImage from '../assets/images/sampleBG2.webp'
import mobileBg from '../assets/images/mobileBG.webp'
import darylladmin1 from '../assets/images/daryllandadmin1-logo.webp'
import { useEffect, useState } from 'react'

import prenupimg1 from '../assets/images/IMG_5356.webp'
import prenupimg2 from '../assets/images/IMG_5357.webp'
import prenupimg3 from '../assets/images/IMG_5358.webp'
import prenupimg4 from '../assets/images/IMG_5359.webp'
import prenupimg5 from '../assets/images/IMG_5361.webp'
import prenupimg6 from '../assets/images/IMG_5362.webp'
import prenupimg7 from '../assets/images/IMG_5363.webp'
import prenupimg8 from '../assets/images/IMG_5364.webp'
import prenupimg9 from '../assets/images/IMG_5365.webp'
import prenupimg10 from '../assets/images/IMG_5366.webp'
import prenupimg11 from '../assets/images/IMG_5367.jpg'
import prenupimg12 from '../assets/images/IMG_5368.webp'
import prenupimg13 from '../assets/images/IMG_5369.webp'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />
      <Router>
        <Routes>
          <Route path="/" element={<MainHome />} />
        </Routes>
      </Router>
    </>
  )
}

const MainHome = () => {
  const [bgImage, setBgImage] = useState(mainImage)
  const prenupiamges = [
    prenupimg1,
    prenupimg2,
    prenupimg3,
    prenupimg4,
    prenupimg5,
    prenupimg6,
    prenupimg7,
    prenupimg8,
    prenupimg9,
    prenupimg10,
    prenupimg11,
    prenupimg12,
    prenupimg13,
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % prenupiamges.length)
    }, 3000) // Change image every 3 seconds
    return () => clearInterval(interval)
  }, [prenupiamges.length])

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

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % prenupiamges.length)
  }

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? prenupiamges.length - 1 : prevIndex - 1))
  }

  const isPortrait = (imageSrc: any) => {
    const img = new Image()
    img.src = imageSrc
    return img.naturalHeight > img.naturalWidth
  }

  return (
    <div className="overflow-x-hidden flex flex-col">
      {/* First Section */}
      <div
        className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <img
          src={darylladmin1}
          alt="Daryll & Hannah"
          className="w-2/3 sm:w-1/3 h-auto mt-4 rounded-full shadow-lg"
          style={{
            filter: 'brightness(0) invert(1)',
          }}
        />
        <p
          className="text-xl mt-1 sm:text-3xl"
          style={{
            textShadow: '0 1px 4px rgba(0,0,0,0.7), 0 0 1px #fff',
          }}
        >
          Aquila Crystal Place
        </p>
        <p
          className="text-xl mt-1 sm:text-3xl"
          style={{
            textShadow: '0 2px 6px rgba(0,0,0,0.7), 0 0 1px #fff',
          }}
        >
          Tagaytay City
        </p>
        <p
          className="text-xl mt-1 sm:text-3xl"
          style={{
            textShadow: '0 2px 6px rgba(0,0,0,0.7), 0 0 1px #fff',
          }}
        >
          September 5, 2025
        </p>
      </div>

      {/* Second Section */}
      <div className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 sm:p-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl max-w-3xl flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-purple-900">
              Daryll & Hannah
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 italic mb-6">
              "Two souls, one heart, one beautiful journey."
            </p>
            <p className="text-sm sm:text-lg text-gray-600 mb-6">
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

      {/* Third Section */}
      <div className="w-screen h-screen bg-gradient-to-r from-purple-50 to-indigo-100 flex flex-col sm:flex-row items-center justify-center">
        {/* Random text on the top for mobile, right for desktop */}
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center text-center p-4 sm:p-8 order-1 sm:order-none">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-6">Our Journey</h2>
          <p className="text-sm sm:text-lg text-gray-700 mb-6">
            From the first glance to the first dance, our journey has been nothing short of magical.
            Every moment we've shared has brought us closer, and now we stand on the brink of
            forever.
          </p>
          <p className="text-sm sm:text-lg text-gray-700">
            As we prepare to celebrate our love, we are reminded of the beauty of life's unexpected
            twists and turns. Thank you for being part of our story.
          </p>
        </div>

        {/* Slideshow on the bottom for mobile, left for desktop */}
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center relative order-2 sm:order-none h-full">
          <div className="relative w-4/5 h-auto max-h-[80vh] flex items-center justify-center">
            <img
              src={prenupiamges[currentImageIndex]}
              alt="Slideshow"
              className={`rounded-lg w-full h-full object-contain shadow-lg ${
                isPortrait(prenupiamges[currentImageIndex]) ? 'shadow-md' : 'shadow-lg'
              }`}
            />
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="bg-purple-400 text-white px-3 py-1 rounded-full shadow hover:bg-purple-800 transition"
              onClick={handlePrev}
            >
              &#8249; {/* Left arrow */}
            </button>
            <button
              className="bg-purple-400 text-white px-3 py-1 rounded-full shadow hover:bg-purple-800 transition"
              onClick={handleNext}
            >
              &#8250; {/* Right arrow */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
