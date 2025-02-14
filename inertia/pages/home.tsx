import { Head } from "@inertiajs/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import mainImage from '../assets/images/violet-backdrop-us.png';

export default function Home()  {
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
  );
};

const MainHome = () => (
  <div className=" overflow-hidden flex flex-col">
    {/* First Section */}
    <div 
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white" 
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      <h1 className="text-5xl font-bold">Daryll & Hannah</h1>
      <p className="text-xl mt-2">Crystal Place Aquila, Tagaytay - Sept 5, 2025, 3PM</p>
      <Link to="/rsvp" className="mt-10 bg-purple-700 text-white px-8 py-4 rounded-full shadow-lg hover:bg-purple-800 transition duration-300">
        RSVP Now
      </Link>
    </div>

    {/* Second Section (Hidden if it exceeds the viewport) */}
    <div 
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-white" 
    >
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-2">
    <div className="bg-white p-8 rounded-2xl max-w-3xl flex flex-col items-center">
      <h1 className="text-6xl font-extrabold mb-6 text-purple-900">Daryll & Hannah</h1>
      <p className="text-xl text-gray-700 italic mb-6">"Two souls, one heart, one beautiful journey."</p>
      <p className="text-lg text-gray-600 mb-6">From the very beginning, we believed that love is not just about finding the right person—it’s about discovering God’s perfect plan. Our journey together is a testament to His faithfulness, timing, and grace.
<br/> <br/>
Every step we’ve taken has led us here, to a love that is deeper than words, rooted in faith, and strengthened by His promises. We are beyond grateful for this beautiful gift of love, knowing that our story was written long before we even met.
<br/> <br/>
As we prepare to say "I do," we celebrate not just our love, but the One who made it possible. Our marriage is a covenant, a promise to love, honor, and serve each other—always guided by His wisdom and unconditional love.
<br/> <br/>
We invite you to join us in witnessing this special day, as we begin a new chapter filled with love, faith, and a future designed by God.</p>
    </div>
  </div>
    </div>
  </div>
);

const RSVP = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-r from-[#D6B4FC] to-[#B08BEB]">
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md">
      <h2 className="text-4xl font-bold mb-6 text-purple-900">RSVP</h2>
      <p className="text-lg text-gray-700 mb-6">We can't wait to celebrate with you! Let us know if you can join.</p>
      <form className="flex flex-col gap-6">
        <input type="text" placeholder="Your Name" className="border p-3 rounded-lg shadow-md text-gray-700" required />
        <select className="border p-3 rounded-lg shadow-md text-gray-700">
          <option>Yes, I'll be there!</option>
          <option>Sorry, I can't make it.</option>
        </select>
        <button type="submit" className="bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-800 transition duration-300">
          Submit
        </button>
      </form>
    </div>
  </div>
);
