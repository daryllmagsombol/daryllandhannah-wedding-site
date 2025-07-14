import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useQueryParams } from '~/hooks/common'
import { Loader } from './shared/loader'

type Guest = {
  id: number
  guestNames: string
  isAttending: boolean | null
  noOfGuestsAttending: number
  maxGuests: number
}

export default function RSVP() {
  const searchParams = useQueryParams()
  const key = searchParams.get('key')
  const [guest, setGuest] = useState<Guest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAttending, setIsAttending] = useState<boolean | null>(null)
  const [noOfGuests, setNoOfGuests] = useState<number>(1)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!key) {
      setError('No RSVP key provided.')
      setLoading(false)
      return
    }
    fetch(`/rsvp/view-invitation?key=${key}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text())
        return res.json()
      })
      .then((data) => {
        setGuest(data)
        setNoOfGuests(data.noOfGuestsAttending ?? 1)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [key])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guest) return
    setError(null)
    setSuccess(null)

    const result = await Swal.fire({
      title: 'Confirm Your RSVP',
      html: isAttending
        ? `Before submitting, please confirm that all the information you’ve provided is accurate. Confrming for <strong>${noOfGuests} guest(s)</strong>.`
        : `Confirming your RSVP as <strong>not attending</strong>. Are you sure?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, I am sure',
      cancelButtonText: 'No, not yet',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })

    if (result.isConfirmed) {
      const res = await fetch('/rsvp/update-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: guest.id,
          isAttending,
          noOfGuestsAttending: isAttending ? noOfGuests : 0,
          code: key,
        }),
      })

      if (res.ok) {
        setSuccess('Thank you! Your RSVP has been received.')

        Swal.fire({
          title: 'RSVP Confirmed!',
          html: `You have successfully RSVP'd ${isAttending ? `for <strong>${noOfGuests} guest(s)</strong>` : 'as <strong>not attending</strong>'}.`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        })
      } else {
        const errorMessage = await res.text()
        setError(errorMessage)

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#d33',
        })
      }
    }
  }

  if (loading) return <Loader message="Fetching your RSVP..." />

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-50 to-indigo-100">
        <div className="flex flex-col items-center text-gray-700 px-6 py-8 max-w-md">
          <img
            src="https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/Not_found_the_recipient-no_found-person-user-search-searching-4-1024.png" // Replace with your fancy image or illustration
            alt="Guest Not Found"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-xl font-bold text-purple-600 mb-2">Oops! {error}</h2>
          <p className="text-center text-gray-500 mb-4">
            We couldn't find your RSVP details. Please check your <strong>RSVP key</strong> or
            contact us for assistance.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-full shadow hover:from-indigo-500 hover:to-purple-700 transition"
          >
            Back To Home
          </a>
        </div>
      </div>
    )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="mx-auto p-8 max-w-lg sm:max-w-xl w-full"
      >
        <h2
          className="text-5xl font-extrabold mb-5 text-center text-purple-600 tracking-tight"
          style={{
            fontFamily: `'Dancing Script', cursive, 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', serif`,
          }}
        >
          The Wedding of Daryll & Hannah
        </h2>
        <p className="text-center text-gray-500 mb-6">
          We are so excited to celebrate our special day with you, and we can't wait to see you
          there!
        </p>
        <div className="mb-6 text-center">
          <span className="block text-lg font-medium text-gray-800">
            Please RSVP by August 15, 2025 so we can prepare for your attendance.
          </span>
        </div>
        <div className="mb-6 text-center">
          <span className="block text-lg font-medium text-gray-800">Wedding Details:</span>
          <span className="block text-md text-gray-700">September 5, 2025 at 4:30 PM</span>
          <span className="block text-md text-gray-700">Aquila Crystal Palace, Tagaytay City</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="noOfGuests">
                Number of Guests Attending{' '}
                <span className="text-gray-400">(max {guest?.maxGuests})</span>
              </label>
              <input
                type="number"
                id="noOfGuests"
                min={1}
                max={guest?.maxGuests}
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(Number(e.target.value))}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={() => setIsAttending(true)}
            className={`w-full bg-gradient-to-r from-indigo-500 to-purple-400 hover:from-indigo-500 hover:to-purple-700 text-white py-3 rounded-full font-bold text-lg shadow transition disabled:opacity-50`}
            disabled={noOfGuests < 1 || noOfGuests > (guest?.maxGuests ?? 0)}
          >
            Yes, I will attend
          </button>
          <button
            type="submit"
            onClick={() => setIsAttending(false)}
            className={`w-full bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-3 rounded-full font-bold text-lg shadow transition disabled:opacity-50`}
          >
            Sorry, I can't make it
          </button>
          {success && (
            <div className="text-green-700 bg-green-50 border border-green-200 rounded px-4 py-2 text-center animate-fade-in">
              {success}
            </div>
          )}
          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 rounded px-4 py-2 text-center animate-fade-in">
              {error}
            </div>
          )}
        </form>
      </motion.div>
    </div>
  )
}
