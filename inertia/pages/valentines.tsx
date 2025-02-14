import { useState } from "react";
import { motion } from "framer-motion";

const gifs = [
    "https://media4.giphy.com/media/6Uqa3vLCikV1yNRmdU/200w.gif?cid=6c09b9524tkptnxju5gduqo5i161d7uvycabdp9hinnq1upt&ep=v1_gifs_search&rid=200w.gif&ct=g",
    "https://media.tenor.com/JOiBmvPAvPsAAAAM/crying.gif",
    "https://media.tenor.com/dGjGVVewn_EAAAAM/sad.gif",
    "https://media4.giphy.com/media/SkCBOCW2hr6SAtRa8m/200w.gif?cid=6c09b952gmm03wto1m8a93jnomlwgkzy9h5g9t2234mpc60o&ep=v1_gifs_search&rid=200w.gif&ct=g",
    "https://media4.giphy.com/media/GwskZm1jXg8cDvuZJ6/200w.gif?cid=6c09b952iffo4kj4h8yyu0s1xozjp7zi7ctu1m5xrvm88n8n&ep=v1_gifs_search&rid=200w.gif&ct=g",
    "https://media4.giphy.com/media/HTjuQryixrSZB1uA3Z/200w.gif?cid=6c09b95240y4911230ipwyuoc1dggtl3qzy7gkek3wyn8y4q&ep=v1_gifs_search&rid=200w.gif&ct=g",
    "https://media.tenor.com/1z6kPxGgBu4AAAAM/tonton.gif",
    "https://gifsec.com/wp-content/uploads/2022/09/sad-gif-3.gif",
    "https://i.pinimg.com/originals/61/47/2b/61472b8ee65a7fc3ea0e98688e32760c.gif"

];

const endCatHappyGif = "https://media1.giphy.com/media/WsSB3qO2Dfwmc6jV6e/giphy.gif?cid=6c09b952tcbx37nv2h1b6qihjslu55d75jovzqb76tqzzs3b&ep=v1_stickers_search&rid=giphy.gif&ct=s"

export default function ValentineProposal() {
  const [showFoodOptions, setShowFoodOptions] = useState(false);
  const [gifIndex, setGifIndex] = useState(0);
  const [selectedFood, setSelectedFood] = useState<String | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleNoClick = () => {
    setGifIndex((prev) => (prev + 1) % gifs.length);
  };
  const handleFoodSelection = (food: string) => {
    setSelectedFood(food);
    setShowMessage(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-fuchsia-200 to-white-400 text-center p-6">
      <div className="p-8 bg-white shadow-2xl rounded-3xl w-90 text-center border border-red-300">
        <h1 className="text-4xl font-extrabold mb-6 text-red-600">Hey Hannah, Will You Be My Valentine? ❤️</h1>
        {showMessage ? (
            <div className="flex flex-col items-center" >
                <h2 className="text-2xl font-semibold text-gray-700">You selected <b>{selectedFood}</b> mahal! See you tomorrow in the morning! ☀️</h2>
                <img src={endCatHappyGif} alt="Funny reaction" className="w-60 h-80 mt-6 rounded-2xl" />
            </div>
        ) : showFoodOptions ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Yay! Where should we go?</h2>
            <ul className="space-y-3">
              <li><button onClick={() => handleFoodSelection("Chicken")} className="w-full px-5 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600"> 🍗 Chicken</button></li>
              <li><button onClick={() => handleFoodSelection("Pizza")} className="w-full px-5 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600">🍕 Pizza</button></li>
              <li><button onClick={() => handleFoodSelection("Burgers")} className="w-full px-5 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600">🍔 Burgers</button></li>
              <li><button onClick={() => handleFoodSelection("Steak")} className="w-full px-5 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600">🥩 Steak</button></li>
              <li><button onClick={() => handleFoodSelection("Breakfast Buffet")} className="w-full px-5 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600">🍽️ Breakfast Buffet</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={gifs[gifIndex]} alt="Funny reaction" className="w-64 h-64 mt-6 rounded-2xl shadow-md border border-gray-300" />
            <motion.div whileHover={{ scale: 1.1 }}>
              <button onClick={() => setShowFoodOptions(true)} className="m-2 px-8 py-4 text-xl bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600">Yes 💖</button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <button onClick={handleNoClick} className="m-2 px-8 py-4 text-xl bg-gray-500 text-white rounded-xl shadow-lg hover:bg-gray-600">No 😢</button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
