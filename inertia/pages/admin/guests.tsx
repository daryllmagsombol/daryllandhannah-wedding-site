import { useEffect, useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import Modal from '../../components/common/Modal/Modal'
import ActionButtons from '../../components/common/ActionButtons/ActionButtons'
import { headers } from '~/shared/config'
import { QRCodeCanvas } from 'qrcode.react'

type Guest = {
  id: number
  guestNames: string
  isAttending: boolean | null
  noOfGuestsAttending: number
  maxGuests: number
}

type ModalType = 'create' | 'view' | 'update' | 'delete' | 'inviteLink' | null

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
  const [globalFilter, setGlobalFilter] = useState('')
  const [inviteLink, setInviteLink] = useState<string | null>(null)

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
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchGuests()
  }, [])

  const columns = [
    {
      accessorKey: 'guestNames',
      header: 'Name(s)',
    },
    {
      accessorKey: 'isAttending',
      header: 'Attending',
      cell: ({ getValue }: { getValue: () => boolean | null }) => {
        const value = getValue()
        return value === null ? (
          <span className="text-gray-400">No Response</span>
        ) : value ? (
          <span className="text-green-600 font-semibold">Yes</span>
        ) : (
          <span className="text-red-600 font-semibold">No</span>
        )
      },
    },
    {
      accessorKey: 'noOfGuestsAttending',
      header: '# Attending',
    },
    {
      accessorKey: 'maxGuests',
      header: 'Max Guests',
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      cell: ({ getValue }: { getValue: () => number }) => {
        const value = getValue()
        return (
          <ActionButtons
            onView={() => openModal(guests.find((guest) => guest.id === value)!, 'view')}
            onUpdate={() => openModal(guests.find((guest) => guest.id === value)!, 'update')}
            onDelete={() => openModal(guests.find((guest) => guest.id === value)!, 'delete')}
            onGenerateKey={() => generateInviteKey(value)}
          />
        )
      },
    },
  ]

  const totalAttending = useMemo(
    () =>
      guests.reduce((sum, guest) => sum + (guest.isAttending ? guest.noOfGuestsAttending : 0), 0),
    [guests]
  )

  const totalMaxGuests = useMemo(
    () => guests.reduce((sum, guest) => sum + guest.maxGuests, 0),
    [guests]
  )

  const table = useReactTable({
    data: guests,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const openModal = (guest: Guest, type: ModalType) => {
    setSelectedGuest(guest)
    setUpdateData(guest)
    setModalType(type)

    if (type === 'update') setNewGuestData(guest)
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
      const link = `${baseUrl}/rsvp?key=${data.code}`
      setInviteLink(link)
      setModalType('inviteLink') // Open the modal for the invite link
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
        guestNames: newGuestData.guestNames,
        isAttending: newGuestData.isAttending,
        noOfGuestsAttending: newGuestData.noOfGuestsAttending,
        maxGuests: newGuestData.maxGuests ?? selectedGuest.maxGuests,
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
    <div className="max-w-7xl mx-auto mt-12 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-blue-700">
          Total Attending Guests:{' '}
          <span className="text-green-600">{`${totalAttending} out of ${totalMaxGuests}`}</span>
        </div>
        <input
          type="text"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search guests..."
          className="border rounded px-4 py-2"
        />
      </div>
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
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-blue-50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-semibold text-gray-700"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : // Use flexRender to render header content
                          flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' ? ' 🔼' : ''}
                      {header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-blue-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {
                        // Use flexRender to render cell content
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition ml-2"
            >
              Next
            </button>
            <div>
              Page{' '}
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border rounded px-4 py-2"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
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
                value={newGuestData.guestNames || ''}
                onChange={(e) => setNewGuestData({ ...newGuestData, guestNames: e.target.value })}
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
                value={newGuestData.isAttending ? 'yes' : 'no'}
                onChange={(e) =>
                  setNewGuestData({
                    ...newGuestData,
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
                value={newGuestData.noOfGuestsAttending || 0}
                onChange={(e) =>
                  setNewGuestData({ ...newGuestData, noOfGuestsAttending: Number(e.target.value) })
                }
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="noOfGuestsAttending">
                Max Guests
              </label>
              <input
                type="number"
                id="maxGuests"
                value={newGuestData.maxGuests || 0}
                onChange={(e) =>
                  setNewGuestData({ ...newGuestData, maxGuests: Number(e.target.value) })
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
      {modalType === 'inviteLink' && inviteLink && (
        <Modal title="Invite Link" onClose={() => setModalType(null)}>
          <div className="text-center">
            <p className="mb-4 text-gray-700">Share this invite link with your guest:</p>
            <div className="mb-4">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="border rounded px-4 py-2 w-full text-center"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink)
                  alert('Invite link copied to clipboard!')
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Copy Link
              </button>
            </div>
            <div className="flex flex-col items-center mt-4">
              <QRCodeCanvas value={inviteLink} size={192} />
              <p className="mt-2 text-gray-500 text-center">
                Scan the QR code to access the invite link.
              </p>
            </div>
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
