import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { motion } from 'framer-motion'

export default function SeatInquiry() {
  const [guestList, setGuestList] = useState<
    { label: string; value: string; seatNumber: string }[]
  >([])
  const [selectedGuest, setSelectedGuest] = useState<{
    label: string
    value: string
    seatNumber: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch all guest names and seat numbers on component mount
  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const response = await axios.get('/seat-inquiry/fetch-guests') // Endpoint to fetch guest names and seat numbers
        const formattedGuestList = response.data.map(
          (guest: { guestName: string; seatNumber: string }) => ({
            label: guest.guestName,
            value: guest.guestName,
            seatNumber: guest.seatNumber,
          })
        )
        setGuestList(formattedGuestList)
      } catch (err) {
        setError('Failed to fetch guest list.')
      }
    }

    fetchGuestList()
  }, [])

  const handleSelect = (
    selectedOption: { label: string; value: string; seatNumber: string } | null
  ) => {
    setSelectedGuest(selectedOption)
    setError(null)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-50 to-purple-100 text-center px-4">
      <h1 className="text-5xl font-bold text-purple-900 mb-6 sm:text-6xl">Find Your Seat</h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-8">
        Select your name below to find your table number.
      </p>
      <div className="flex flex-col items-center w-full max-w-lg">
        <Select
          options={guestList}
          onChange={handleSelect}
          placeholder="Type or select your name"
          className="w-full mb-4"
          isClearable // Enables the clear button
        />
      </div>
      {error && <p className="text-red-500 mt-4 text-lg">{error}</p>}
      {selectedGuest && (
        <motion.div
          className="mt-8 bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-purple-900 mb-4">{selectedGuest.label}</h2>
          <p className="text-lg text-gray-700">Seat Number: {selectedGuest.seatNumber}</p>
        </motion.div>
      )}
    </div>
  )
}
