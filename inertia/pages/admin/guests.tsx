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
import { QRCodeCanvas } from 'qrcode.react'
import { Loader } from '../shared/loader'
import axios from '~/shared/axios_config'
import Swal from 'sweetalert2'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

type Guest = {
  id: number
  familyName: string | null
  guests: Array<{
    id?: number
    name: string
    familyInvitationId: number | null
    tableNumber: string | null
  }>
  isAttending: boolean | null
  noOfGuestsAttending: number
  maxGuests: number
}

type ModalType = 'create' | 'view' | 'update' | 'delete' | 'inviteLink' | null

const emptyGuest: Guest = {
  id: 0,
  familyName: null,
  guests: [],
  isAttending: null,
  noOfGuestsAttending: 0,
  maxGuests: 1,
}

export default function GuestsAdmin() {
  const [family, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [modalType, setModalType] = useState<ModalType>(null)
  const [newGuestData, setNewGuestData] = useState<Partial<Guest>>(emptyGuest)
  const [globalFilter, setGlobalFilter] = useState('')
  const [inviteLink, setInviteLink] = useState<string | null>(null)
  const [loaderMessage, setLoaderMessage] = useState<string>(
    'Loading and processing, please wait...'
  )

  const fetchGuests = async () => {
    setLoaderMessage('Loading families, please wait...')
    setLoading(true)
    try {
      const res = await axios.get('/guest/lists')
      if (res.data.error) {
        Swal.fire('Error', res.data.error, 'error')
        return
      }
      const guestsData = res.data.map((guest: Guest) => ({
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
      setGuests(guestsData)
    } catch (err) {
      Swal.fire('Error', err.response.data.message || err.response.data.error, 'error')
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
      header: 'Family Name', // Add family column
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

  const filteredFamilies = useMemo(() => {
    if (!globalFilter) return family

    const lowerCaseFilter = globalFilter.toLowerCase()

    const fam = family.filter((f) => {
      // Check if the family name matches the filter
      const familyNameMatch = f.familyName?.toLowerCase().includes(lowerCaseFilter)

      // Check if any guest name matches the filter

      const guestNameMatch = f.guests.some(
        (guest) => guest.name?.toLowerCase().includes(lowerCaseFilter) // Ensure guest.name is not null or undefined
      )

      return familyNameMatch || guestNameMatch
    })

    return fam
  }, [globalFilter, family])

  const table = useReactTable({
    data: filteredFamilies, // Use the filtered families
    columns,
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
      if (res.data.error) {
        Swal.fire('Error', res.data.error, 'error')
        return
      }
      const baseUrl = window.location.origin
      const link = `${baseUrl}/rsvp?key=${res.data.code}`
      setInviteLink(link)
      setModalType('inviteLink') // Open the modal for the invite link
    } catch (err) {
      Swal.fire('Error', err.response.data.message || err.response.data.error, 'error')
    }
  }

  // Update guest using PUT /guest/update-guest
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

      const res = await axios.put('/guest/update-guest', payload)
      if (res.data.error) {
        Swal.fire('Error', res.data.error, 'error')
        return
      }
      fetchGuests()
      closeModal()
      Swal.fire(
        'Updated!',
        `<strong>${newGuestData.familyName}</strong> has been updated successfully!`,
        'success'
      )
    } catch (err) {
      Swal.fire('Error', err.response.data.message || err.response.data.error, 'error')
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

      const res = await axios.post('/guest/create', payload)
      if (res.data.error) {
        Swal.fire('Error', res.data.error, 'error')
        return
      }
      fetchGuests()
      closeModal()
      Swal.fire(
        'Created!',
        `<strong>${newGuestData.familyName}</strong> has been created successfully!`,
        'success'
      )
    } catch (err) {
      Swal.fire('Error', err.response.data.message || err.response.data.error, 'error')
    }
  }

  // Delete guest using DELETE /guest/delete-guest
  const handleDelete = async () => {
    if (!selectedGuest) return
    setError(null)
    try {
      const res = await axios.delete('/guest/delete-guest', {
        data: { id: selectedGuest.id },
      })
      if (res.data.error) {
        Swal.fire('Error', res.data.error, 'error')
        return
      }
      setGuests((prev) => prev.filter((g) => g.id !== selectedGuest.id))
      closeModal()
      Swal.fire(
        'Deleted!',
        `<strong>${selectedGuest.familyName}</strong> has been deleted successfully!`,
        'success'
      )
    } catch (err) {
      Swal.fire('Error', err.response.data.message || err.response.data.error, 'error')
    }
  }

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas') // Select the QR code canvas
    if (canvas) {
      const imageURL = canvas.toDataURL('image/png') // Convert canvas to image URL
      const link = document.createElement('a')
      link.href = imageURL
      link.download = 'invite-qr-code.png' // Set the filename
      link.click() // Trigger download
    }
  }

  const generateAllQRs = async () => {
    const result = await Swal.fire({
      title: 'Generate All QR Codes',
      text: 'Are you sure you want to generate QR codes for all families? This may take some time.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, generate them!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
    })

    if (!result.isConfirmed) return

    setLoaderMessage('Generating QR codes, please wait...')
    setLoading(true)

    try {
      const res = await axios.post('/guest/generate-all-invite-keys')
      if (res.data.error) {
        Swal.fire('Error', res.data.error, 'error')
        return
      }
      const zip = new JSZip()

      for (const qr of res.data) {
        const QRCode = (await import('qrcode')).default
        const url = `${window.location.origin}/rsvp?key=${qr.inviteKey}`
        const dataUrl = await QRCode.toDataURL(url, {
          width: 192,
          margin: 2,
        })
        const base64Data = dataUrl.split(',')[1]
        zip.file(`${qr.familyName || 'Family'}-QR.png`, base64Data, { base64: true })
      }

      const now = new Date()
      const timestamp = now
        .toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
        .replace(/[/:, ]/g, '_')

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      saveAs(zipBlob, `Family_QR_Codes_${timestamp}.zip`)
      Swal.fire('Success', 'All QR codes have been downloaded!', 'success')
    } catch (err) {
      Swal.fire('Error', err.response.data.message || err.response.data.error, 'error')
    } finally {
      setLoading(false)
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
          placeholder="Search families or guests..."
          className="border rounded px-4 py-2 w-sm md:w-1/4"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex justify-start">
          <span className="text-2xl font-semibold text-gray-700">Family List</span>
        </div>
        <div className="flex flex-col md:flex-row justify-end gap-4 w-full md:w-auto">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition w-full md:w-auto"
            onClick={() => openModal(emptyGuest, 'create')}
          >
            Create Family
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-full md:w-auto"
            onClick={generateAllQRs}
          >
            Generate All QR
          </button>
        </div>
      </div>

      {loading ? (
        <Loader message={loaderMessage} noBG />
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
        <Modal title="Create Family" onClose={closeModal}>
          <form onSubmit={handleCreateGuest}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="guestNames">
                Family Name
              </label>
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="guestList">
                Guest List
              </label>
              {newGuestData.guests?.map((guest, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <div className="w-3/4">
                    <label
                      className="block text-gray-700 text-md mb-1"
                      htmlFor={`guestName-${index}`}
                    >
                      Guest Name
                    </label>
                    <input
                      type="text"
                      id={`guestName-${index}`}
                      placeholder="Guest Name"
                      value={guest.name}
                      onChange={(e) =>
                        setNewGuestData((prev) => {
                          const updatedGuests = [...(prev.guests || [])]
                          updatedGuests[index] = { ...updatedGuests[index], name: e.target.value }
                          return { ...prev, guests: updatedGuests }
                        })
                      }
                      className="border rounded px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="w-1/4">
                    <label
                      className="block text-gray-700 text mb-1"
                      htmlFor={`tableNumber-${index}`}
                    >
                      Table No.
                    </label>
                    <input
                      type="text"
                      id={`tableNumber-${index}`}
                      placeholder="Table No."
                      value={guest.tableNumber || ''}
                      onChange={(e) =>
                        setNewGuestData((prev) => {
                          const updatedGuests = [...(prev.guests || [])]
                          updatedGuests[index] = {
                            ...updatedGuests[index],
                            tableNumber: e.target.value,
                          }
                          return { ...prev, guests: updatedGuests }
                        })
                      }
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNewGuestData((prev) => ({
                        ...prev,
                        guests: (prev.guests || []).filter((_, i) => i !== index),
                      }))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setNewGuestData((prev) => ({
                    ...prev,
                    guests: [
                      ...(prev.guests || []),
                      {
                        name: '',
                        familyInvitationId: null,
                        tableNumber: '',
                      },
                    ],
                  }))
                }
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Add Guest
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="maxGuests">
                Max Guests
              </label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
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
              Create Family
            </button>
          </form>
        </Modal>
      )}
      {modalType === 'view' && selectedGuest && (
        <Modal title="Family Details" onClose={closeModal}>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="familyName">
                Family Name
              </label>
              <input
                type="text"
                id="familyName"
                value={selectedGuest.familyName || ''}
                readOnly
                className="border rounded w-full px-3 py-2 bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="guestList">
                Guest List
              </label>
              {selectedGuest.guests.map((guest, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <div className="w-3/4">
                    <label
                      className="block text-gray-700 text-md mb-1"
                      htmlFor={`guestName-${index}`}
                    >
                      Guest Name
                    </label>
                    <input
                      type="text"
                      id={`guestName-${index}`}
                      value={guest.name}
                      readOnly
                      className="border rounded px-3 py-2 w-full bg-gray-100"
                    />
                  </div>
                  <div className="w-1/4">
                    <label
                      className="block text-gray-700 text-md mb-1"
                      htmlFor={`tableNumber-${index}`}
                    >
                      Table No.
                    </label>
                    <input
                      type="text"
                      id={`tableNumber-${index}`}
                      value={guest.tableNumber || ''}
                      readOnly
                      className="border rounded px-3 py-2 w-full bg-gray-100"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="maxGuests">
                Max Guests
              </label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                id="maxGuests"
                value={selectedGuest.maxGuests}
                readOnly
                className="border rounded w-full px-3 py-2 bg-gray-100"
              />
            </div>
          </form>
        </Modal>
      )}
      {modalType === 'update' && selectedGuest && (
        <Modal title="Update Family" onClose={closeModal}>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="familyName">
                Family Name
              </label>
              <input
                type="text"
                id="familyName"
                value={newGuestData.familyName || ''}
                onChange={(e) =>
                  setNewGuestData((prev) => ({ ...prev, familyName: e.target.value }))
                }
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="guestList">
                Guest List
              </label>
              {newGuestData.guests?.map((guest, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <div className="w-3/4">
                    <label
                      className="block text-gray-700 text-md mb-1"
                      htmlFor={`guestName-${index}`}
                    >
                      Guest Name
                    </label>
                    <input
                      type="text"
                      id={`guestName-${index}`}
                      placeholder="Guest Name"
                      value={guest.name}
                      onChange={(e) =>
                        setNewGuestData((prev) => {
                          const updatedGuests = [...(prev.guests || [])]
                          updatedGuests[index] = { ...updatedGuests[index], name: e.target.value }
                          return { ...prev, guests: updatedGuests }
                        })
                      }
                      className="border rounded px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="w-1/4">
                    <label
                      className="block text-gray-700 text-md mb-1"
                      htmlFor={`tableNumber-${index}`}
                    >
                      Table No.
                    </label>
                    <input
                      type="text"
                      id={`tableNumber-${index}`}
                      placeholder="Table No."
                      value={guest.tableNumber || ''}
                      onChange={(e) =>
                        setNewGuestData((prev) => {
                          const updatedGuests = [...(prev.guests || [])]
                          updatedGuests[index] = {
                            ...updatedGuests[index],
                            tableNumber: e.target.value,
                          }
                          return { ...prev, guests: updatedGuests }
                        })
                      }
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setNewGuestData((prev) => ({
                        ...prev,
                        guests: (prev.guests || []).filter((_, i) => i !== index),
                      }))
                    }
                    className="text-red-500 hover:text-red-700 mt-5"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setNewGuestData((prev) => ({
                    ...prev,
                    guests: [
                      ...(prev.guests || []),
                      {
                        name: '',
                        familyInvitationId: null,
                        tableNumber: '',
                      },
                    ],
                  }))
                }
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Add Guest
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="isAttending">
                Attending
              </label>
              <select
                id="isAttending"
                value={
                  newGuestData.isAttending === null || newGuestData.isAttending === undefined
                    ? ''
                    : String(newGuestData.isAttending)
                }
                onChange={(e) =>
                  setNewGuestData((prev) => ({
                    ...prev,
                    isAttending:
                      e.target.value === 'true' ? true : e.target.value === 'false' ? false : null, // Set to null for "No Response"
                  }))
                }
                className="border rounded w-full px-3 py-2"
              >
                <option value="">No Response</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="noOfGuestsAttending">
                Number of Guests Attending
              </label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                id="noOfGuestsAttending"
                value={newGuestData.noOfGuestsAttending || ''}
                onChange={(e) =>
                  setNewGuestData((prev) => ({
                    ...prev,
                    noOfGuestsAttending: Number(e.target.value),
                  }))
                }
                className="border rounded w-full px-3 py-2"
                disabled={newGuestData.isAttending === false || newGuestData.isAttending === null} // Disable if not attending
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-lg" htmlFor="maxGuests">
                Max Guests
              </label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                id="maxGuests"
                value={newGuestData.maxGuests || ''}
                onChange={(e) =>
                  setNewGuestData((prev) => ({ ...prev, maxGuests: Number(e.target.value) }))
                }
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update Family
            </button>
          </form>
        </Modal>
      )}
      {modalType === 'delete' && selectedGuest && (
        <Modal title="Delete Guest" maxWidth="xl" onClose={closeModal}>
          <p>
            Are you sure you want to delete <strong>{selectedGuest.familyName}</strong>?
          </p>
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
        <Modal title="Invite Link" maxWidth="xl" onClose={() => setModalType(null)}>
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
              <button
                onClick={() => downloadQRCode()}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Download QR Code
              </button>
            </div>
          </div>
        </Modal>
      )}
      {error && (
        <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 text-center">
          {error}
        </div>
      )}
    </div>
  )
}
