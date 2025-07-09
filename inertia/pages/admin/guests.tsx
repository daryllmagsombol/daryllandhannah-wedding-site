import { useEffect, useState } from 'react'
// Make sure the Modal component exists at this path, or update the path if necessary
import Modal from '../../components/common/Modal/Modal'
import ActionButtons from '../../components/common/ActionButtons/ActionButtons'
import { headers } from '~/shared/config'

type Guest = {
  id: number
  guestNames: string
  isAttending: boolean | null
  noOfGuestsAttending: number
  maxGuests: number
}

type ModalType = 'create' | 'view' | 'update' | 'delete' | null

const emptyGuest: Guest = {
  id: 0,
  guestNames: '',
  isAttending: null,
  noOfGuestsAttending: 0,
  maxGuests: 1,
}

export default function GuestsAdmin() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [modalType, setModalType] = useState<ModalType>(null)
  const [updateData, setUpdateData] = useState<Partial<Guest>>({})
  const [newGuestData, setNewGuestData] = useState<Partial<Guest>>(emptyGuest)

  const fetchGuests = () => {
    setLoading(true)
    fetch('/guest/lists', {
      method: 'GET',
      headers,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text())
        return res.json()
      })
      .then(setGuests)
      .catch((err) => {
        setError(err.message)
        if (err.message && err.message.includes('Unauthorized access')) {
          window.location.href = '/login'
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchGuests()
  }, [])

  const totalAttending = guests.reduce(
    (sum, guest) => sum + (guest.isAttending ? guest.noOfGuestsAttending : 0),
    0
  )
  const totalMaxGuests = guests.reduce((sum, guest) => sum + guest.maxGuests, 0)

  const openModal = (guest: Guest, type: ModalType) => {
    setSelectedGuest(guest)
    setUpdateData(guest)
    setModalType(type)
  }

  const closeModal = () => {
    setSelectedGuest(null)
    setModalType(null)
    setNewGuestData(emptyGuest)
  }

  const generateInviteKey = async (guestId: number) => {
    setError(null)
    setSuccess(null)
    const res = await fetch(`/guest/generate-invite-key/${guestId}`, {
      method: 'POST',
      headers,
    })
    if (res.ok) {
      const data = await res.json()
      const baseUrl = window.location.origin
      const inviteUrl = `${baseUrl}/rsvp?key=${data.code}`
      setSuccess(`Invite Link: ${inviteUrl}`)
    } else {
      setError(await res.text())
    }
  }

  // Update guest using PUT /guest/update-guest
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGuest) return
    setError(null)
    const res = await fetch('/guest/update-guest', {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        id: selectedGuest.id,
        guestNames: updateData.guestNames,
        isAttending: updateData.isAttending,
        noOfGuestsAttending: updateData.noOfGuestsAttending,
        maxGuests: updateData.maxGuests ?? selectedGuest.maxGuests,
      }),
    })
    if (res.ok) {
      fetchGuests()
      closeModal()
    } else {
      setError(await res.text())
    }
  }

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/guest/create', {
      method: 'POST',
      headers,
      body: JSON.stringify(newGuestData),
    })
    if (res.ok) {
      fetchGuests()
      closeModal()
    } else {
      setError(await res.text())
    }
  }

  // Delete guest using DELETE /guest/delete-guest
  const handleDelete = async () => {
    if (!selectedGuest) return
    setError(null)
    const res = await fetch('/guest/delete-guest', {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ id: selectedGuest.id }),
    })
    if (res.ok) {
      setGuests((prev) => prev.filter((g) => g.id !== selectedGuest.id))
      closeModal()
    } else {
      setError(await res.text())
    }
  }

  const copyLinkToClipboard = (text: string) => {
    const isLink = text.startsWith('Invite Link: ')

    if (isLink) {
      const link = text.replace('Invite Link: ', '')
      navigator.clipboard.writeText(link)
    }

    alert('Invite link copied to clipboard!')
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-blue-700">
          Total Attending:{' '}
          <span className="text-green-600">
            {totalAttending} out of {totalMaxGuests}
          </span>
        </div>
      </div>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-tight">
        Guest List
      </h2>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={() =>
            openModal(
              {
                id: 0,
                guestNames: '',
                isAttending: null,
                noOfGuestsAttending: 0,
                maxGuests: 0,
              },
              'create'
            )
          }
        >
          Create Guest
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Name(s)</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Attending</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700"># Attending</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Max Guests</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-3">{guest.guestNames}</td>
                  <td className="px-4 py-3">
                    {guest.isAttending === null ? (
                      <span className="text-gray-400">No Response</span>
                    ) : guest.isAttending ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{guest.noOfGuestsAttending}</td>
                  <td className="px-4 py-3">{guest.maxGuests}</td>
                  <td className="px-4 py-3">
                    <ActionButtons
                      onView={() => openModal(guest, 'view')}
                      onUpdate={() => openModal(guest, 'update')}
                      onDelete={() => openModal(guest, 'delete')}
                      onGenerateKey={() => generateInviteKey(guest.id)}
                    />
                  </td>
                </tr>
              ))}
              {guests.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No guests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {modalType === 'create' && (
        <Modal title="Create Guest" onClose={closeModal}>
          <form onSubmit={handleCreateGuest}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="guestNames">
                Name(s)
              </label>
              <input
                type="text"
                id="guestNames"
                value={newGuestData.guestNames}
                onChange={(e) =>
                  setNewGuestData((prev) => ({ ...prev, guestNames: e.target.value }))
                }
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="maxGuests">
                Max Guests
              </label>
              <input
                type="number"
                id="maxGuests"
                value={newGuestData.maxGuests}
                onChange={(e) =>
                  setNewGuestData((prev) => ({ ...prev, maxGuests: Number(e.target.value) }))
                }
                className="border rounded w-full px-3 py-2"
                required
                min={1}
                max={20}
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Create Guest
            </button>
          </form>
        </Modal>
      )}
      {modalType === 'view' && selectedGuest && (
        <Modal title="Guest Details" onClose={closeModal}>
          <p>
            <strong>Name(s):</strong> {selectedGuest.guestNames}
          </p>
          <p>
            <strong>Attending:</strong>{' '}
            {selectedGuest.isAttending === null
              ? 'No Response'
              : selectedGuest.isAttending
                ? 'Yes'
                : 'No'}
          </p>
          <p>
            <strong># Attending:</strong> {selectedGuest.noOfGuestsAttending}
          </p>
          <p>
            <strong>Max Guests:</strong> {selectedGuest.maxGuests}
          </p>
        </Modal>
      )}
      {modalType === 'update' && selectedGuest && (
        <Modal title="Update Guest" onClose={closeModal}>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="guestNames">
                Name(s)
              </label>
              <input
                type="text"
                id="guestNames"
                value={updateData.guestNames}
                onChange={(e) => setUpdateData({ ...updateData, guestNames: e.target.value })}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="isAttending">
                Attending
              </label>
              <select
                id="isAttending"
                value={updateData.isAttending ? 'yes' : 'no'}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    isAttending: e.target.value === 'yes',
                  })
                }
                className="border rounded w-full px-3 py-2"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="noOfGuestsAttending">
                # Attending
              </label>
              <input
                type="number"
                id="noOfGuestsAttending"
                value={updateData.noOfGuestsAttending}
                onChange={(e) =>
                  setUpdateData({ ...updateData, noOfGuestsAttending: Number(e.target.value) })
                }
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update Guest
            </button>
          </form>
        </Modal>
      )}
      {modalType === 'delete' && selectedGuest && (
        <Modal title="Delete Guest" onClose={closeModal}>
          <p>Are you sure you want to delete {selectedGuest.guestNames}?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {success && (
        <div className="mt-4 text-green-600 bg-green-50 border border-green-200 rounded px-4 py-2 text-center flex items-center justify-center gap-2">
          <span>{success}</span>
          <button
            onClick={() => copyLinkToClipboard(success)}
            className="text-green-700 hover:text-green-900 transition"
            aria-label="Copy to clipboard"
          >
            Copy
          </button>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 text-center">
          {error}
        </div>
      )}
    </div>
  )
}
