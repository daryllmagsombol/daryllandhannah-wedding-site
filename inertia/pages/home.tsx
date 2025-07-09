import { Head } from '@inertiajs/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import mainImage from '../assets/images/sampleBG2.webp'
import mobileBg from '../assets/images/mobileBG.webp'
import darylladmin1 from '../assets/images/daryllandadmin1-logo-alt.png'
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
  const [loading, setLoading] = useState(true) // State for loader

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

  useEffect(() => {
    // Preload images and set loading to false once done
    const preloadImages = async () => {
      const promises = prenupiamges.map((src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = resolve
        })
      })
      await Promise.all(promises)
      setLoading(false) // Set loading to false once all images are loaded
    }
    preloadImages()
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

  type RecommendationBoxProps = {
    title: string
    content?: string
    picture: string
    link: string
    type?: string
  }

  const RecommendationBox = ({
    title,
    content,
    picture,
    link,
    type = 'Website',
  }: RecommendationBoxProps) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-purple-800 mb-2">{title}</h3>
      <div className="mt-4">
        <img src={picture} alt={title} className="w-50 h-50 rounded-lg object-cover" />
      </div>
      <p className="mt-3 text-sm text-gray-600 mb-4">{content}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:underline"
      >
        View in {type}
      </a>
    </div>
  )

  return (
    <div className="overflow-x-hidden flex flex-col">
      {/* Loader */}
      {loading && (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
          <div className="mt-4">Loading...</div>
        </div>
      )}

      {!loading && (
        <>
          {/* First Section */}
          <div
            className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <img
              src={darylladmin1}
              alt="Daryll & Hannah"
              className="w-2/3 sm:w-1/3 h-auto mt-4 rounded-full"
              style={{
                filter: 'brightness(0) invert(1)',
              }}
            />
            {/* <p
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
                textShadow: '0 1px 4px rgba(0,0,0,0.7), 0 0 1px #fff',
              }}
            >
              Tagaytay City
            </p>
            <p
              className="text-xl mt-1 sm:text-3xl"
              style={{
                textShadow: '0 1px 4px rgba(0,0,0,0.7), 0 0 1px #fff',
              }}
            >
              September 5, 2025
            </p> */}
          </div>

          {/* Second Section */}
          <div className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white">
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 sm:p-8">
              <div className="bg-white p-6 sm:p-8 rounded-2xl max-w-3xl flex flex-col items-center">
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-purple-900">
                  Daryll & Hannah
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 italic mb-6">
                  "Two souls, one heart, one beautiful journey."
                </p>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                  From the very beginning, we believed that love is not just about finding the right
                  person—it’s about discovering God’s perfect plan. Our journey together is a
                  testament to His faithfulness, timing, and grace.
                  <br /> <br />
                  Every step we’ve taken has led us here, to a love that is deeper than words,
                  rooted in faith, and strengthened by His promises. We are beyond grateful for this
                  beautiful gift of love, knowing that our story was written long before we even
                  met.
                  <br /> <br />
                  As we prepare to say "I do," we celebrate not just our love, but the One who made
                  it possible. Our marriage is a covenant, a promise to love, honor, and serve each
                  other—always guided by His wisdom and unconditional love.
                  <br /> <br />
                  We invite you to join us in witnessing this special day, as we begin a new chapter
                  filled with love, faith, and a future designed by God.
                </p>
              </div>
            </div>
          </div>

          {/* YouTube Section */}
          <div className="w-screen h-screen bg-gradient-to-r from-indigo-50 to-purple-100 flex flex-col items-center justify-center text-center p-4 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-6">Save the Date!</h2>
            <p className="text-md sm:text-lg text-gray-700 mb-6">
              Watch a glimpse of our beautiful journey together as we prepare for this special day.
            </p>
            <div className="w-full h-full max-w-7xl rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Yv0a9U0IHks?si=BhzQhgYsVYUWM6N5"
                title="Daryll & Hannah - Save the Date"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Third Section */}
          <div className="w-screen h-screen bg-gradient-to-r from-purple-50 to-indigo-100 flex flex-col sm:flex-row items-center justify-center">
            {/* Random text on the top for mobile, right for desktop */}
            <div className="w-full sm:w-1/2 flex flex-col items-center justify-center text-center p-4 sm:p-8 order-1 sm:order-none">
              <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-6">Our Journey</h2>
              <p className="text-md sm:text-xl text-gray-700 mb-6">
                From the first glance to the first dance, our journey has been nothing short of
                magical. Every moment we've shared has brought us closer, and now we stand on the
                brink of forever.
              </p>
              <p className="text-md sm:text-xl text-gray-700">
                As we prepare to celebrate our love, we are reminded of the beauty of life's
                unexpected twists and turns. Thank you for being part of our story.
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
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-3 py-1 rounded-full shadow hover:bg-purple-800 transition"
                  onClick={handlePrev}
                >
                  &#8249; {/* Left arrow */}
                </button>
                <button
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-3 py-1 rounded-full shadow hover:bg-purple-800 transition"
                  onClick={handleNext}
                >
                  &#8250; {/* Right arrow */}
                </button>
              </div>
            </div>
          </div>

          {/* Fourth Section */}
          <div className="w-screen h-screen bg-gradient-to-r from-indigo-50 to-purple-100 flex flex-col items-center justify-center text-center p-4 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-6">
              How to Get There?
            </h2>
            <p className="text-md sm:text-lg text-gray-700 mb-6">
              The venue is located at Aquila Crystal Place, Tagaytay City. Below is the map to help
              you find your way. Click <b>Directions</b> to view in Google Maps.
            </p>
            <div className="w-full max-w-5xl h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.1898874444946!2d120.9592638!3d14.1249278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd79dc7086fc39%3A0x56d9690c8ba530bb!2sAquila%20Crystal%20Palace%20Tagaytay!5e0!3m2!1sen!2sph!4v1751797129428!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                // referrerPolicy="no-referrer-when-cross-origin"
              />
            </div>
            <div className="mt-10">
              <p className="text-md sm:text-lg text-gray-700 mb-6">
                Alternatively, you can use <b>Waze</b> for navigation.
              </p>
              <a
                href="https://ul.waze.com/ul?venue_id=79298701.792724868.10452740&overview=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition"
              >
                View Directions in Waze
              </a>
            </div>
          </div>

          {/* 5th Section */}
          <div className="w-screen h-auto bg-gradient-to-r from-purple-50 to-indigo-100 flex flex-col items-center justify-center text-center p-4 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-6">
              Airbnb & Hotel Recommendations
            </h2>
            <p className="text-md sm:text-lg text-gray-700 mb-6">
              Here are some accommodations near the venue to make your stay comfortable and
              memorable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl">
              {/* Recommendation 1 */}
              <RecommendationBox
                title="Elegant Studio Unit with FREE Parking"
                content="Classy interior, tricolor vanity mirror for your make up and clothes rack for your
                  gown/suit. Located just behind Ayala Serin Mall."
                picture="https://a0.muscache.com/im/pictures/hosting/Hosting-1451791930757818211/original/dcd16063-8106-42b8-b1f1-3104080316e5.jpeg"
                link="https://www.airbnb.com/l/noxSkITw"
                type="Airbnb"
              />

              <RecommendationBox
                title="COZY 21st Flr King+Dbl w/ Pool"
                content=" Relax with the whole family or barkada at this SPACIOUS staycation spot with FREE pool access and UNLI Netflix."
                picture="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE0NTMyNzgzNTg5NjUzMzI0MA%3D%3D/original/5ba25b6f-4172-4b5d-aaeb-5d678d6a6490.jpeg?im_w=1440"
                link="https://www.airbnb.com/l/DPRwsvRJ"
                type="Airbnb"
              />

              <RecommendationBox
                title="Serene Escape Tagaytay"
                content="Your peaceful escape in the heart of Tagaytay. Unwind, relax, and recharge at our cozy getaway located on the 12th floor of Serin East Tagaytay."
                picture="https://a0.muscache.com/im/pictures/hosting/Hosting-1429464938235773057/original/3eccc298-f36b-4393-8b3e-a4e762b31f4a.jpeg?im_w=1200"
                link="https://www.airbnb.com/l/6E076Uhe"
                type="Airbnb"
              />
              <RecommendationBox
                title="Quest Hotel Tagaytay"
                content="Quest Hotel Tagaytay is ideal for two travelers, providing stunning Taal Lake views and exceptional comfort. Relax by the outdoor pool, enjoy the lively café, and experience affordable luxury in serene Tagaytay."
                picture="https://pix8.agoda.net/hotelImages/5826741/0/5643299815f46330c94b8067edbdfd84.jpeg?s=1024x"
                link="https://www.agoda.com/sl/GlGJ0JnoRYr"
                type="Agoda"
              />
            </div>
            <div className="mt-8">
              <a
                href="https://www.airbnb.com/s/Aquila-Crystal-Palace-Tagaytay--Tagaytay-City--Cavite/homes?place_id=ChIJOfyGcNx5vTMRuzCliwxp2VY&refinement_paths%5B%5D=%2Fhomes&checkin=2025-09-05&checkout=2025-09-06&date_picker_type=calendar&search_type=unknown&query=Aquila%20Crystal%20Palace%20Tagaytay%2C%20Tagaytay%20City%2C%20Cavite&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2025-08-01&monthly_length=3&monthly_end_date=2025-11-01&search_mode=regular_search&price_filter_input_type=2&price_filter_num_nights=1&channel=EXPLORE&adults=4&source=structured_search_input_header"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 rounded shadow hover:bg-purple-600 transition"
              >
                View More on Airbnb
              </a>
            </div>
          </div>
          {/* Footer */}
          <footer className="w-full bg-gray-100 text-center py-4">
            <p className="text-sm text-gray-600">Made truly yours &copy; Daryll Joshua Magsombol</p>
          </footer>
        </>
      )}
    </div>
  )
}
