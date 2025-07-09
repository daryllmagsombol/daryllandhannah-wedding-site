import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useQueryParams } from '~/hooks/common'

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
        setIsAttending(data.isAttending ?? null)
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

    // SweetAlert confirmation prompt
    const result = await Swal.fire({
      title: 'Confirm RSVP',
      html: `Are you sure you want to RSVP ${isAttending ? `for <strong>${noOfGuests} guest(s)</strong>` : 'as <strong>not attending</strong>'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
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

        // SweetAlert success confirmation
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

        // SweetAlert error
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    )
  if (error)
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded shadow">
          {error}
        </div>
      </div>
    )
  if (!guest)
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-6 py-4 rounded shadow">
          Guest not found.
        </div>
      </div>
    )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-100">
      <div className="mx-auto p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
        <h2
          className="text-5xl font-extrabold mb-2 text-center text-purple-700 tracking-tight"
          style={{
            fontFamily: `'Dancing Script', cursive, 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', serif`,
          }}
        >
          You're Invited!
        </h2>
        <p className="text-center text-gray-500 mb-6">Please RSVP below</p>
        <div className="mb-6 text-center">
          <span className="block text-lg font-medium text-gray-800">Guest Name(s):</span>
          <span className="block text-xl font-semibold text-blue-900">{guest.guestNames}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Will you attend?</label>
            <div className="flex justify-center gap-6">
              <button
                type="button"
                aria-pressed={isAttending === true}
                className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-150
              ${isAttending === true ? 'bg-blue-600 text-white scale-105' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}
            `}
                onClick={() => setIsAttending(true)}
              >
                Accept
              </button>
              <button
                type="button"
                aria-pressed={isAttending === false}
                className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-150
              ${isAttending === false ? 'bg-red-600 text-white scale-105' : 'bg-red-50 text-red-700 hover:bg-red-100'}
            `}
                onClick={() => setIsAttending(false)}
              >
                Decline
              </button>
            </div>
          </div>
          {isAttending ? (
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="noOfGuests">
                Number of Guests Attending{' '}
                <span className="text-gray-400">(max {guest.maxGuests})</span>
              </label>
              <input
                type="number"
                id="noOfGuests"
                min={1}
                max={guest.maxGuests}
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(Number(e.target.value))}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          ) : (
            ''
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white py-3 rounded-full font-bold text-lg shadow hover:from-indigo-500 hover:to-purple-700 transition disabled:opacity-50"
            disabled={isAttending === null}
          >
            Submit RSVP
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
      </div>
    </div>
  )
}
