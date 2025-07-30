import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import Modal from '../../components/Modal'
import Loader from '../../components/Loader'
import ActionButtons from '../../components/ActionButtons'

const emptyGuest = { familyName: '', maxGuests: 1, guests: [] }

export default function GuestsAdmin() {
  const [family, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [modalType, setModalType] = useState<ModalType>(null)
  const [newGuestData, setNewGuestData] = useState<Partial<Guest>>(emptyGuest)
  const [globalFilter, setGlobalFilter] = useState('')
  const [inviteLink, setInviteLink] = useState<string | null>(null)

  const fetchGuests = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/guest/lists')
      setGuests(
        res.data.map((guest: Guest) => ({
          ...guest,
          isAttending:
            typeof guest.isAttending === 'number'
              ? guest.isAttending === 1
                ? true
                : guest.isAttending === 0
                  ? false
                  : null
              : guest.isAttending,
        }))
      )
    } catch (err) {
      setError(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuests()
  }, [])

  const columns = [
    {
      accessorKey: 'familyName',
      header: 'Family Name',
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
            onView={() => openModal(family.find((f) => f.id === value)!, 'view')}
            onUpdate={() => openModal(family.find((f) => f.id === value)!, 'update')}
            onDelete={() => openModal(family.find((f) => f.id === value)!, 'delete')}
            onGenerateKey={() => generateInviteKey(value)}
          />
        )
      },
    },
  ]

  const totalAttending = useMemo(
    () =>
      family.reduce((sum, guest) => sum + (guest.isAttending ? guest.noOfGuestsAttending : 0), 0),
    [family]
  )

  const totalMaxGuests = useMemo(
    () => family.reduce((sum, guest) => sum + guest.maxGuests, 0),
    [family]
  )

  const table = useReactTable({
    data: family,
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
    try {
      const res = await axios.post(`/guest/generate-invite-key/${guestId}`)
      const baseUrl = window.location.origin
      const link = `${baseUrl}/rsvp?key=${res.data.code}`
      setInviteLink(link)
      setModalType('inviteLink')
    } catch (err) {
      setError(err.response?.data || err.message)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGuest) return
    setError(null)

    const result = await Swal.fire({
      title: 'Confirm Family Update',
      text: 'Are you sure you want to update this family?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
    })

    if (!result.isConfirmed) return

    try {
      const payload = {
        id: selectedGuest.id,
        familyName: newGuestData.familyName,
        maxGuests: newGuestData.maxGuests,
        noOfGuestsAttending: newGuestData.noOfGuestsAttending,
        isAttending: newGuestData.isAttending,
        guests: newGuestData.guests?.map((guest) => ({
          id: guest.id,
          name: guest.name,
          tableNumber: guest.tableNumber,
        })),
      }

      await axios.put('/guest/update-guest', payload)
      fetchGuests()
      closeModal()
      Swal.fire('Updated!', 'The family has been updated successfully.', 'success')
    } catch (err) {
      setError(err.response?.data || err.message)
    }
  }

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const result = await Swal.fire({
      title: 'Confirm Family Creation',
      text: 'Are you sure you want to create this family?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
    })

    if (!result.isConfirmed) return

    try {
      const payload = {
        familyName: newGuestData.familyName,
        maxGuests: newGuestData.maxGuests,
        guests: newGuestData.guests?.map((guest) => ({
          name: guest.name,
          tableNumber: guest.tableNumber,
        })),
      }

      await axios.post('/guest/create', payload)
      fetchGuests()
      closeModal()
      Swal.fire('Created!', 'The family has been created successfully.', 'success')
    } catch (err) {
      setError(err.response?.data || err.message)
    }
  }

  const handleDelete = async () => {
    if (!selectedGuest) return
    setError(null)
    try {
      await axios.delete('/guest/delete-guest', {
        data: { id: selectedGuest.id },
      })
      setGuests((prev) => prev.filter((g) => g.id !== selectedGuest.id))
      closeModal()
    } catch (err) {
      setError(err.response?.data || err.message)
    }
  }

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const imageURL = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = imageURL
      link.download = 'invite-qr-code.png'
      link.click()
    }
  }

  const generateAllQR = async () => {
    setError(null)
    try {
      const res = await axios.post('/guest/generate-all-qr')
      const qrCodes = res.data.qrCodes // Assuming the response contains the QR codes
      qrCodes.forEach((qrCode) => {
        const link = document.createElement('a')
        link.href = qrCode.imageUrl // Assuming each QR code has an imageUrl
        link.download = `qr-code-${qrCode.familyName}.png`
        link.click()
      })
      Swal.fire('Success!', 'All QR codes have been generated and downloaded.', 'success')
    } catch (err) {
      setError(err.response?.data || err.message)
    }
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
          placeholder="Search families..."
          className="border rounded px-4 py-2"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-start">
          <span className="text-2xl font-semibold text-gray-700">Family List</span>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={() => openModal(emptyGuest, 'create')}
          >
            Create Family
          </button>
          <button
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={generateAllQR}
          >
            Generate All QR
          </button>
        </div>
      </div>

      {loading ? (
        <Loader message="Loading families..." noBG />
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-blue-50">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="border px-4 py-2">{header.renderHeader()}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-blue-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border px-4 py-2">{cell.renderCell()}</td>
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
              Page
            </div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border rounded px-4 py-2"
            >
            </select>
          </div>
        </div>
      )}
      {modalType === 'create' && (
        <Modal title="Create Family" onClose={closeModal}>
          <form onSubmit={handleCreateGuest}>
            <div className="mb-4">
              <input
                type="text"
                id="guestNames"
                value={newGuestData.familyName || ''}
                onChange={(e) =>
                  setNewGuestData((prev) => ({ ...prev, familyName: e.target.value }))
                }
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
          </form>
        </Modal>
      )}
      {modalType === 'view' && selectedGuest && (
      )}
      {modalType === 'update' && selectedGuest && (
      )}
      {modalType === 'delete' && selectedGuest && (
      )}
      {modalType === 'inviteLink' && inviteLink && (
      )}
      {error && (
      )}
    </div>
  )
}