import { Head } from '@inertiajs/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import daryllhannahalt from '../assets/images/daryllandhannah-logo-alt.png'

import mainImage from '../assets/images/sampleBG2.webp'
import mobileBg from '../assets/images/mobileBG.webp'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

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
import aiCoverPortrait from '../assets/videos/AI moving cover wedding portrait.mp4'

import attireLandscape from '../assets/images/attire-landscape.jpg'
import attirePortrait from '../assets/images/attire-portrait.jpg'
import attireSquare from '../assets/images/attire-square.jpg'

import { Loader } from './shared/loader'
import { SparklesText } from '~/components/magicui/sparkles-text'

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

  const backgroundImages = [
    daryllhannahalt,
    mainImage,
    mobileBg,
    aiCoverPortrait,
    attireSquare,
    attireLandscape,
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % prenupiamges.length)
    }, 5000) // Change image every 5 seconds
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
    // Preload bg/logo and set loading to false once done
    const preloadImages = async () => {
      const promises = backgroundImages.map((src) => {
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

  const isMobile = window.innerWidth <= 768

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? prenupiamges.length - 1 : prevIndex - 1))
  }

  const airBnbDefaultAnimate = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
  }

  type RecommendationBoxProps = {
    title: string
    content: string
    picture: string
    link: string
    type: string
    reviews: string
    guests: string
    bedrooms: string
    beds: string
    baths: string
  }

  const RecommendationBox = ({
    title,
    content,
    picture,
    link,
    type,
    reviews,
    guests,
    bedrooms,
    beds,
    baths,
  }: RecommendationBoxProps) => (
    <div className="overflow-y-hidden flex flex-col">
      <div className="relative">
        <img src={picture} alt={title} className="w-full h-80 object-cover rounded-lg" />
        <div className="absolute top-4 right-4 bg-white rounded-md px-3 py-1 shadow text-sm font-bold text-gray-800">
          {reviews}
        </div>
      </div>
      <div className="py-6 flex flex-col justify-between">
        <div className="text-left">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{content}</p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:text-left py-2 items-center sm:items-start">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-600 hover:underline mt-2 sm:mt-0"
          >
            {/* <button className="bg-trasparent text-white px-4 py-2 rounded-full text-purple-600 hover:bg-purple-600 transition">
              &rarr;
            </button> */}
            <span>View in {type}</span>
          </a>
          <div className="text-sm text-gray-500 flex flex-wrap gap-2 justify-center sm:justify-start">
            {guests && <span>{guests}</span>}
            {bedrooms && <span>{bedrooms}</span>}
            {beds && <span>{beds}</span>}
            {baths && <span>{baths}</span>}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="overflow-x-hidden flex flex-col scroll-smooth snap-y h-screen">
      {/* Loader */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* First Section */}
          <div className="snap-start h-screen flex flex-col ">
            <SparklesText
              sparklesCount={isMobile ? 18 : 23}
              colors={{ first: '#fdf1c8', second: '#d9ccc0' }}
            >
              <motion.div
                className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
                style={{
                  backgroundImage: `url(${bgImage})`,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                {isMobile && (
                  <video
                    autoPlay
                    loop
                    playsInline
                    muted
                    controls={false} // Ensure controls are disabled
                    poster={aiCoverPortrait}
                    className="absolute top-0 left-0 w-full h-full object-cover hide-ios-play-button" // Add a custom class
                  >
                    <source src={aiCoverPortrait} type="video/mp4" />
                  </video>
                )}

                <motion.img
                  src={daryllhannahalt}
                  alt="Daryll & Hannah"
                  className="relative w-3/4 sm:w-1/3 h-auto mt-4 rounded-full"
                  style={{
                    filter: 'brightness(0) invert(1)',
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
                />
              </motion.div>
            </SparklesText>
          </div>
          {/* Second Section */}
          <div className="snap-start w-screen h-screen bg-gradient-to-b from-purple-50 to-indigo-100 flex items-center justify-center text-center">
            <motion.div
              className="h-screen flex flex-col items-center justify-center max-w-3xl px-6 sm:px-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: 'easeInOut' }}
              viewport={{ once: false, amount: 0.3 }} // Ensure animation triggers when 50% of the section is in view
            >
              <h2 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                Two Souls, One Heart, One Beautiful Journey.
              </h2>
              <h1 className="text-3xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                Daryll & Hannah
              </h1>
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                From the very beginning, we believed that love is not just about finding the right
                person—it’s about discovering God’s perfect plan. Our journey together is a
                testament to His faithfulness, timing, and grace.
                <br /> <br />
                Every step we’ve taken has led us here, to a love that is deeper than words, rooted
                in faith, and strengthened by His promises. We are beyond grateful for this
                beautiful gift of love, knowing that our story was written long before we even met.
                <br /> <br />
                As we prepare to say "I do," we celebrate not just our love, but the One who made it
                possible. Our marriage is a covenant, a promise to love, honor, and serve each
                other—always guided by His wisdom and unconditional love.
                <br /> <br />
                We invite you to join us in witnessing this special day, as we begin a new chapter
                filled with love, faith, and a future designed by God.
              </p>
            </motion.div>
          </div>
          {/* YouTube Section */}
          <div className="snap-start w-screen h-screen">
            <motion.div className=" w-screen h-screen bg-white flex flex-col items-center justify-center text-center p-8">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="h-auto mb-6"
              >
                <h2 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">
                  A Glimpse Into Our Story
                </h2>
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">
                  We Know You're Excited —{' '}
                  <span className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                    So Are We!
                  </span>
                </h1>
                <p className="text-sm sm:text-lg text-gray-700">
                  Watch a glimpse of our beautiful journey together as we prepare for this special
                  day.
                </p>
              </motion.div>
              <motion.div
                className="w-full h-3/4 max-w-7xl rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: 'easeInOut' }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Yv0a9U0IHks?si=BhzQhgYsVYUWM6N5"
                  title="Daryll & Hannah - Save the Date"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </motion.div>
            </motion.div>
          </div>
          {/* Third Section */}
          <div className="snap-start w-screen h-screen bg-gradient-to-r from-purple-50 to-indigo-100 md:flex md:items-center md:relative">
            {/* Image on the left */}
            <motion.div
              className="h-[50vh] w-screen md:h-screen md:w-[70vw]" // 70% viewport width and 100% viewport height
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }} // Exit animation for smooth transition
              transition={{ delay: 3, duration: 0.8, ease: 'easeInOut' }} // Adjust duration and easing
            >
              <div className="relative w-full h-full overflow-hidden">
                <motion.img
                  key={prenupiamges[currentImageIndex]} // Key ensures animation triggers on image change
                  src={prenupiamges[currentImageIndex]}
                  alt="Slideshow"
                  className="w-full h-full object-cover"
                  initial={{
                    opacity: 0.9,
                    x: isMobile ? -window.innerWidth : -window.innerWidth * 0.7,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 1.15, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>

            {/* Content overlay on the right */}
            <motion.div
              className="w-screen h-[50vh] md:absolute md:top-50 md:right-20 md:w-[45vw] md:h-[70vh] flex flex-col items-center md:items-start justify-center text-center md:text-left p-6 sm:p-12 bg-white bg-opacity-90 rounded-md shadow-md"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1.3, ease: 'easeInOut' }}
            >
              <h2 className="text-sm sm:text-lg font-bold text-gray-500 uppercase mb-2">
                Our Journey
              </h2>
              <h1 className="text-2xl sm:text-5xl font-bold text-gray-800 mb-4">
                From A Single Glance <br /> To A{' '}
                <span className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                  Lifetime Dance
                </span>
              </h1>
              <p className="text-sm sm:text-lg text-gray-700 mb-6">
                From the first glance to the first dance, our journey has been nothing short of
                magical. Every moment we've shared has brought us closer, and now we stand on the
                brink of forever.
                <br />
                As we prepare to celebrate our love, we are reminded of the beauty of life's
                unexpected twists and turns. Thank you for being part of our story.
              </p>
              <div className="flex justify-center md:justify-end mt-4 space-x-4">
                <button
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-4 py-2 rounded-full shadow hover:bg-purple-600 transition"
                  onClick={handlePrev}
                >
                  &#8249; {/* Left arrow */}
                </button>
                <button
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-4 py-2 rounded-full shadow hover:bg-purple-600 transition"
                  onClick={handleNext}
                >
                  &#8250; {/* Right arrow */}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Attire Section */}
          <div className="snap-start w-screen h-screen bg-gradient-to-b from-purple-50 to-indigo-100 flex items-center justify-center text-center">
            <div className="w-screen h-screen flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h2 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                  Dress Code
                </h2>
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">
                  Attire Guidelines for Our{' '}
                  <span className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                    Wedding Day
                  </span>
                </h1>
                <p className="text-sm sm:text-lg text-gray-700 mb-6">
                  Please come dressed in <b>formal attire</b>. We can't wait to see you looking your
                  best!
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
                className="w-full max-w-lg sm:max-w-3xl md:max-w-7xl h-auto overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={isMobile ? attireSquare : attireLandscape}
                  alt="Attire Guidelines"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Fourth Section */}
          <div className="snap-start w-screen h-screen">
            <div className="w-screen h-screen flex flex-col items-center justify-center text-center p-8">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="mb-6"
              >
                <h2 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                  How to Get There
                </h2>
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">
                  Your Journey to Our Big Day{' '}
                  <span className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                    Starts Here
                  </span>
                </h1>
                <p className="text-sm sm:text-lg text-gray-700">
                  Use the <b>Google Maps</b> below or open Waze for step-by-step directions straight
                  to our venue, <b>Crystal Palace of Aquila in the Sky</b>.
                </p>
              </motion.div>
              <motion.div
                className="w-full max-w-[85vw] h-[55vh] overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.6221609334757!2d120.97798227584663!3d14.158297387750922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7900132f27b1%3A0xddad94df53491868!2sCrystal%20Palace%20of%20Aquila%20in%20the%20Sky!5e0!3m2!1sen!2sph!4v1752631463931!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </motion.div>
              <div className="mt-10 flex flex-col md:flex-row items-center md:items-start justify-between w-full md:max-w-[85vw]">
                {/* Text Section */}
                <div className="md:text-left md:w-2/3">
                  <p className="text-md sm:text-2xl text-gray-700 font-bold mb-1">
                    Got a problem with Google Maps?
                  </p>
                  <p className="text-sm sm:text-lg text-gray-700 mb-6">
                    Alternatively, you can use <b>Waze</b> for navigation.
                  </p>
                </div>

                {/* Button Section */}
                <div className="md:w-1/3 flex justify-center md:justify-end">
                  <a
                    href="https://ul.waze.com/ul?place=ChIJsScvEwB5vTMRaBhJU9-Urd0&ll=14.15829220%2C120.98055720&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 shadow transition rounded-md font-bold"
                  >
                    View Directions using Waze
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 5th Section */}
          <div className="snap-start w-screen h-auto">
            <motion.div
              className="w-screen h-auto bg-gradient-to-r from-purple-50 to-indigo-50 flex flex-col items-center justify-center text-center p-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
            >
              <h2 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                Places to Stay
              </h2>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                Airbnb & Hotel{' '}
                <span className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                  Recommendations
                </span>
              </h1>
              <p className="text-sm sm:text-xl text-gray-700 mb-6">
                Here are some accommodations near the venue to make your stay comfortable and
                memorable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl">
                {/* Recommendation 1 */}
                <motion.div
                  {...airBnbDefaultAnimate}
                  transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
                >
                  <RecommendationBox
                    title="Elegant Studio Unit with FREE Parking"
                    content="Classy interior, tricolor vanity mirror for your make up and clothes rack for your gown/suit. Located just behind Ayala Serin Mall."
                    picture="https://a0.muscache.com/im/pictures/hosting/Hosting-1451791930757818211/original/dcd16063-8106-42b8-b1f1-3104080316e5.jpeg"
                    link="https://www.airbnb.com/l/noxSkITw"
                    type="Airbnb"
                    reviews="4.67 Reviews"
                    guests="4 Guests"
                    bedrooms="1 Bedroom"
                    beds="4 Beds"
                    baths="1 Bath"
                  />
                </motion.div>

                {/* Recommendation 2 */}
                <motion.div
                  {...airBnbDefaultAnimate}
                  transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
                >
                  <RecommendationBox
                    title="COZY 21st Flr King+Dbl w/ Pool"
                    content="Relax with the whole family or barkada at this SPACIOUS staycation spot with FREE pool access and UNLI Netflix."
                    picture="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE0NTMyNzgzNTg5NjUzMzI0MA%3D%3D/original/5ba25b6f-4172-4b5d-aaeb-5d678d6a6490.jpeg?im_w=1440"
                    link="https://www.airbnb.com/l/DPRwsvRJ"
                    type="Airbnb"
                    reviews="4.84 Reviews"
                    guests="6 Guests"
                    bedrooms="1 Bedroom"
                    beds="3 Beds"
                    baths="1 Bath"
                  />
                </motion.div>

                {/* Recommendation 3 */}
                <motion.div
                  {...airBnbDefaultAnimate}
                  transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
                >
                  <RecommendationBox
                    title="Serene Escape Tagaytay"
                    content="Your peaceful escape in the heart of Tagaytay. Unwind, relax, and recharge at our cozy getaway located on the 12th floor of Serin East Tagaytay."
                    picture="https://a0.muscache.com/im/pictures/hosting/Hosting-1429464938235773057/original/3eccc298-f36b-4393-8b3e-a4e762b31f4a.jpeg?im_w=1200"
                    link="https://www.airbnb.com/l/6E076Uhe"
                    type="Airbnb"
                    reviews="5.0 Reviews"
                    guests="6 Guests"
                    bedrooms="1 Bedroom"
                    beds="1 Bed"
                    baths="1 Bath"
                  />
                </motion.div>

                {/* Recommendation 4 */}
                <motion.div
                  {...airBnbDefaultAnimate}
                  transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
                >
                  <RecommendationBox
                    title="Quest Hotel Tagaytay"
                    content="Quest Hotel Tagaytay is ideal for two travelers, providing stunning Taal Lake views and exceptional comfort. Relax by the outdoor pool, enjoy the lively café, and experience affordable luxury in serene Tagaytay."
                    picture="https://pix8.agoda.net/hotelImages/5826741/0/5643299815f46330c94b8067edbdfd84.jpeg?s=1024x"
                    link="https://www.agoda.com/sl/GlGJ0JnoRYr"
                    type="Agoda"
                    reviews="4.8 Reviews"
                    guests="Many Options"
                    bedrooms=""
                    beds=""
                    baths=""
                  />
                </motion.div>
              </div>
              <div className="mt-8 mb-4">
                <a
                  href="https://www.airbnb.com/s/Aquila-Crystal-Palace-Tagaytay--Tagaytay-City--Cavite/homes?place_id=ChIJOfyGcNx5vTMRuzCliwxp2VY&refinement_paths%5B%5D=%2Fhomes&checkin=2025-09-05&checkout=2025-09-06&date_picker_type=calendar&search_type=unknown&query=Aquila%20Crystal%20Palace%20Tagaytay%2C%20Tagaytay%20City%2C%20Cavite&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2025-08-01&monthly_length=3&monthly_end_date=2025-11-01&search_mode=regular_search&price_filter_input_type=2&price_filter_num_nights=1&channel=EXPLORE&adults=4&source=structured_search_input_header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 shadow hover:bg-purple-600 transition rounded-md font-bold"
                >
                  View More on Airbnb
                </a>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <footer className="w-full bg-white text-center py-4">
            <p className="text-sm text-gray-500">
              Coded by yours truly &copy; Daryll Joshua Magsombol - 2025
            </p>
          </footer>
        </>
      )}
    </div>
  )
}
