import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useQueryParams } from '~/hooks/common'
import { Loader } from './shared/loader'
import letterIcon from '~/assets/images/letter-icon.png'

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

    let countdown = 3

    const swalWithCountdown = Swal.mixin({
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton()

        if (confirmButton) {
          confirmButton.disabled = true
        }

        const interval = setInterval(() => {
          countdown -= 1
          Swal.update({
            confirmButtonText: `Yes, I am sure (${countdown}s)`,
          })

          if (countdown <= 0) {
            clearInterval(interval)
            if (confirmButton) {
              confirmButton.disabled = false
            }
            Swal.update({
              confirmButtonText: 'Yes, I am sure',
            })
          }
        }, 1000)
      },
    })

    const result = await swalWithCountdown.fire({
      title: 'Confirm Your RSVP',
      html: isAttending
        ? `Before submitting, please confirm that all the information you’ve provided is accurate. Confirming for <strong>${noOfGuests} guest(s)</strong>.`
        : `Confirming your RSVP as <strong>not attending</strong>. Are you sure?`,
      // icon: 'question',
      iconHtml: `<img src="${letterIcon}" alt="Invitation Icon"`,
      showCancelButton: true,
      confirmButtonText: `Yes, I am sure (${countdown}s)`,
      cancelButtonText: 'No, not yet',
      confirmButtonColor: '#786cf3',
      cancelButtonColor: '#f14e4e',
      customClass: {
        icon: 'no-border', // Add this custom class
      },
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
          html: `<p className="text-sm sm:text-lg"> You have successfully RSVP'd ${
            isAttending
              ? `for <strong>${noOfGuests} guest(s)</strong>`
              : 'as <strong>not attending</strong>'
          }.</p>`,
          icon: isAttending ? 'success' : 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#786cf3',
        })
      } else {
        const errorMessage = await res.text()
        setError(errorMessage)

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#f14e4e',
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
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
            Oops! {error}
          </h2>
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

  const SuccessRSVP = () => {
    return (
      <div>
        {isAttending ? (
          <>
            <p className="text-2xl sm:text-5xl text-center mb-8">
              Thank You for <br />
              Your{' '}
              <strong className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                RSVP!
              </strong>
            </p>
            <p className="text-sm sm:text-lg text-center text-gray-500 mb-6">
              We're thrilled you'll be joining us!
              <br />
              Having you there to share in our joy means so much. We’re counting down the days and
              can’t wait to celebrate this special moment together with you.
              <br /> <br /> <br />
              More details and updates will be shared soon —
              <strong className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                {' '}
                stay tuned!
              </strong>
            </p>
          </>
        ) : (
          <>
            <p className="text-2xl sm:text-5xl text-center mb-8">
              Thank You for <br />
              the{' '}
              <strong className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                Time!
              </strong>
            </p>
            <p className="text-sm sm:text-lg text-center text-gray-500 mb-6">
              We're sad to hear that you're unable to join us to our wedding. But that's totally
              fine! <br /> <br />
              We hope to see you soon!
            </p>
          </>
        )}
        <p className="text-sm sm:text-lg text-center text-gray-600">With love,</p>
        <p
          className="text-sm sm:text-lg text-center bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent"
          style={{ fontFamily: 'Dancing Script, Sans Serif' }}
        >
          Daryll and Hannah
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="mx-auto p-4 sm:p-8 max-w-[85vw] sm:max-w-xl w-full bg-white rounded-lg shadow-md"
      >
        <div className="flex justify-center items-center mb-6">
          <img src={letterIcon} alt="Invitation Icon" className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        {success ? (
          <SuccessRSVP />
        ) : (
          <>
            <p className="text-2xl sm:text-5xl text-center mb-8">
              You're{' '}
              <strong className="bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent">
                Invited
              </strong>{' '}
              to <br />
              Celebrate with Us!
            </p>
            <p className="text-sm sm:text-lg text-center text-gray-500 mb-6">
              We are so excited to celebrate our special day with you, and we can't wait to see you
              there!
            </p>
            <div className="mb-6 text-center">
              <span className="block text-sm sm:text-lg font-medium text-gray-800">
                Please RSVP by August 15, 2025 so we can prepare for your attendance.
              </span>
            </div>
            <div className="mb-6 text-center">
              <span
                className="antialiased block text-2xl sm:text-4xl bg-gradient-to-r from-[#8388F8] to-[#A559F7] bg-clip-text text-transparent"
                style={{
                  fontFamily: `'Dancing Script', cursive, 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', serif`,
                }}
              >
                {guest?.guestNames}
              </span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div>
                  <label
                    className="block mb-2 text-sm sm:text-md font-medium text-gray-700"
                    htmlFor="noOfGuests"
                  >
                    Number of Guests Attending{' '}
                    <span className="text-gray-400">(max {guest?.maxGuests})</span>
                  </label>
                  <input
                    type="number"
                    placeholder={`${noOfGuests}`}
                    id="noOfGuests"
                    min={1}
                    max={guest?.maxGuests}
                    value={noOfGuests || ''}
                    onChange={(e) => setNoOfGuests(Number(e.target.value))}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <button
                  type="submit"
                  onClick={() => setIsAttending(true)}
                  className={`w-full bg-gradient-to-r from-indigo-500 to-purple-400 hover:from-indigo-500 hover:to-purple-700 text-white py-3 sm:py-4 rounded-md text-xs md:text-md font-bold sm:text-md shadow-sm transition disabled:opacity-50`}
                  disabled={noOfGuests < 1 || noOfGuests > (guest?.maxGuests ?? 0)}
                >
                  Yes, I will attend
                </button>
                <button
                  type="submit"
                  formNoValidate
                  onClick={() => setIsAttending(false)}
                  className={`w-full bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-3 sm:py-4 rounded-md text-xs md:text-md font-bold sm:text-md shadow-sm transition disabled:opacity-50`}
                >
                  Sorry, I can't make it
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left py-2">
                <span className="block sm:inline text-xs sm:text-md text-gray-600">
                  September 5, 2025 at 4:30 PM
                </span>
                <span className="block sm:inline text-xs sm:text-md text-gray-600 mt-2 sm:mt-0">
                  Crystal Palace of Aquila in the Sky, Tagaytay City
                </span>
              </div>

              {error && (
                <div className="text-red-700 bg-red-50 border border-red-200 rounded px-4 py-2 text-center animate-fade-in">
                  {error}
                </div>
              )}
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}
