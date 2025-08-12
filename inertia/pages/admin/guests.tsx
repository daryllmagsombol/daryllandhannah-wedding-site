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
import { format } from 'date-fns'

import '../../css/guests.css'
import qrTemplate from '~/assets/images/RSVP-qr-template.png'
import NavigationBar from '~/components/common/NavigationBar/navigation-bar'
import { getUrlAction, getUserAgentInfo } from '~/shared/util'

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
  const [inviteImage, setInviteImage] = useState<string | null>(null)
  const [loaderMessage, setLoaderMessage] = useState<string>(
    'Loading and processing, please wait...'
  )
  const [totalKidsBelow7, setTotalKidsBelow7] = useState<number>(0)
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [auditLogsLoading, setAuditLogsLoading] = useState<boolean>(false)

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
    // Fetch total kids below 7/yo
    axios.get('/guest/total-kids-below-7').then((res) => {
      setTotalKidsBelow7(Number(res.data.count))
    })
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
      accessorKey: 'updatedAt',
      header: 'Updated At',
      cell: ({ getValue }: { getValue: () => string | null }) => {
        const value = getValue()
        if (!value) return '-'
        // Try to parse and format, fallback to raw if parsing fails
        try {
          const date = new Date(value)
          return format(date, 'MMM-dd-yyyy hh:mm a')
        } catch {
          return value
        }
      },
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
            onGenerateKey={() => generateInviteKey(family.find((f) => f.id === value))}
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
    data: filteredFamilies,
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
      sorting: [
        { id: 'isAttending', desc: true },
        { id: 'updatedAt', desc: true },
      ],
    },
  })

  const openModal = async (guest: Guest, type: ModalType) => {
    setSelectedGuest(guest)
    setModalType(type)

    if (type === 'update') setNewGuestData(guest)

    if (type === 'view') {
      // Fetch audit logs for this guest
      setAuditLogsLoading(true)
      try {
        const res = await axios.get(`/guest/audit-logs/${guest.id}`)
        setAuditLogs(res.data || [])
      } catch (err) {
        console.error('Error fetching audit logs:', err)
        setAuditLogs([])
      } finally {
        setAuditLogsLoading(false)
      }
    }
  }

  const closeModal = () => {
    setSelectedGuest(null)
    setModalType(null)
    setNewGuestData(emptyGuest)
  }

  const generateInviteKey = async (g?: Guest) => {
    if (!g) return
    setError(null)
    setSelectedGuest(g)
    try {
      const res = await axios.post(`/guest/generate-invite-key/${g.id}`)
      if (res.data.error) {
        Swal.fire('Error', res.data.error, 'error')
        return
      }
      const baseUrl = window.location.origin
      const link = `${baseUrl}/rsvp?key=${res.data.code}`
      setInviteLink(link)
      // Generate the invite image with QR and family name
      const guest = family.find((f) => f.id === g.id)
      if (guest) {
        const img = await drawQRWithTemplate(link, guest.familyName || 'Family')
        setInviteImage(img)
      }
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
      link.download = `${selectedGuest?.familyName || 'Family'}-QR.png` // Set the filename
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
        const url = `${window.location.origin}/rsvp?key=${qr.inviteKey}`

        // Generate QR Invite template image
        const inviteDataUrl = await drawQRWithTemplate(url, qr.familyName || 'Family')
        const inviteBase64 = inviteDataUrl.split(',')[1]
        zip.file(`${qr.familyName || 'Family'}-Invite.png`, inviteBase64, { base64: true })

        // Generate plain QR code image (no template)
        const QRCode = (await import('qrcode')).default
        const qrDataUrl = await QRCode.toDataURL(url, { width: 423, margin: 0 })
        const qrBase64 = qrDataUrl.split(',')[1]
        zip.file(`${qr.familyName || 'Family'}-QR.png`, qrBase64, { base64: true })
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

  async function drawQRWithTemplate(qrUrl: string, familyName: string): Promise<string> {
    // Load template image
    const template = await new Promise<HTMLImageElement>((resolve) => {
      const img = new window.Image()
      img.src = qrTemplate
      img.onload = () => resolve(img)
    })

    // Generate QR code as image
    const QRCode = (await import('qrcode')).default
    // The placeholder is about 320x320px, so generate QR at that size
    const qrDataUrl = await QRCode.toDataURL(qrUrl, { width: 320, margin: 0 })
    const qrImg = await new Promise<HTMLImageElement>((resolve) => {
      const img = new window.Image()
      img.src = qrDataUrl
      img.onload = () => resolve(img)
    })

    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.width = template.width
    canvas.height = template.height
    const ctx = canvas.getContext('2d')!

    // Draw template
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height)

    // Draw QR code in the placeholder (centered horizontally, positioned for new template)
    // For 768x922px, placeholder is at x=224, y=410, size=320x320
    const qrX = (canvas.width - 423) / 2
    const qrY = 636
    ctx.drawImage(qrImg, qrX, qrY, 423, 423)

    // Draw family name centered below the QR code
    let fontSize = 48
    const maxWidth = canvas.width - 70 // leave some padding
    ctx.textAlign = 'center'
    ctx.fillStyle = '#404040'

    // Dynamically shrink font size if text is too wide
    let text = familyName.toUpperCase()
    ctx.font = `${fontSize}px Quincy, Sofia Pro, sans-serif`
    let letterSpacing = 6
    function getTextWidthWithSpacing(
      context: CanvasRenderingContext2D,
      text: string,
      spacing: number
    ) {
      return context.measureText(text).width + spacing * (text.length - 1)
    }
    while (getTextWidthWithSpacing(ctx, text, letterSpacing) > maxWidth && fontSize > 18) {
      fontSize -= 2
      ctx.font = `${fontSize}px Quincy, sans-serif`
    }

    // Draw with letter spacing
    function drawTextWithLetterSpacing(
      context: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      letterSpacing: number
    ) {
      const totalWidth = context.measureText(text).width + letterSpacing * (text.length - 1)
      let currentX = x - totalWidth / 2
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        context.fillText(char, currentX + context.measureText(char).width / 2, y)
        currentX += context.measureText(char).width + letterSpacing
      }
    }

    drawTextWithLetterSpacing(ctx, text, canvas.width / 2, qrY + 465 + fontSize, letterSpacing)

    return canvas.toDataURL('image/png')
  }

  return (
    <div className="max-w-7xl md:max-w-[90dvw] mx-auto mt-5 p-6">
      <NavigationBar />
      <div className="flex flex-col justify-between items-start mb-8 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 w-full">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center transform hover:scale-105">
            <div className="rounded-full bg-blue-100 p-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <span className="text-3xl font-bold text-blue-700">{totalAttending}</span>
            <span className="text-gray-700 font-medium">Attending Guests</span>
            <span className="text-sm text-gray-500 mt-1">{`out of ${totalMaxGuests}`}</span>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center transform hover:scale-105">
            <div className="rounded-full bg-green-100 p-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span className="text-3xl font-bold text-green-700">
              {totalMaxGuests - totalKidsBelow7}
            </span>
            <span className="text-gray-700 font-medium">Adults</span>
            <span className="text-sm text-gray-500 mt-1">Total</span>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center transform hover:scale-105">
            <div className="rounded-full bg-purple-100 p-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-purple-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-3xl font-bold text-purple-700">{family.length}</span>
            <span className="text-gray-700 font-medium">Families</span>
            <span className="text-sm text-gray-500 mt-1">Total</span>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center transform hover:scale-105">
            <div className="rounded-full bg-yellow-100 p-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-yellow-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-3xl font-bold text-yellow-700">{totalKidsBelow7}</span>
            <span className="text-gray-700 font-medium">Kids</span>
            <span className="text-sm text-gray-500 mt-1">
              Below <span className="font-semibold">7</span> years old
            </span>
          </div>
        </div>

        <div className="relative w-full md:w-1/3 mt-4 md:mt-0 md:ml-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search families or guests..."
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-all duration-300"
          />
        </div>
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

            {/* Audit Logs Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Audit Logs</h2>
              {auditLogs.length > 0 ? (
                <div className="max-h-60 overflow-y-auto border rounded">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Date/Time
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          IP Address
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Device
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Action
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[20vw]">
                          Request
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {auditLogs.map((log) => {
                        const requestBody =
                          typeof log.request_body === 'string'
                            ? log.request_body
                            : JSON.stringify(log.request_body)
                        return (
                          <tr key={log.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 text-xs text-gray-900">
                              {format(new Date(log.created_at), 'MMM dd, yyyy hh:mm a')}
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-900">
                              <a
                                href={`https://whatismyipaddress.com/ip/${log.ip_address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                title="Look up IP information"
                              >
                                {log.ip_address}
                              </a>
                            </td>
                            <td
                              className="px-3 py-2 text-xs text-gray-500 max-w-[30vw] truncate"
                              title={log.user_agent}
                            >
                              {getUserAgentInfo(log.user_agent)}
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-900 max-w-[40vw]">
                              {getUrlAction(log.request_url)}
                            </td>
                            <td
                              className="px-3 py-2 text-xs text-gray-900 max-w-[20vw] truncate"
                              title={requestBody}
                            >
                              {requestBody}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : auditLogsLoading ? (
                <p className="text-gray-500 text-center py-4">Loading audit logs...</p>
              ) : (
                <p className="text-gray-500 text-center py-4">No audit logs available</p>
              )}
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
            <div className="flex flex-col items-center mt-2">
              {inviteImage && (
                <div className="mt-2">
                  <img
                    src={inviteImage}
                    alt="Invite Template"
                    className="max-w-full rounded shadow-md border"
                    style={{ width: 350, margin: '0 auto' }}
                  />
                  <div className="inline-flex flex-col items-center mt-1">
                    <a
                      href={inviteImage}
                      download={`${selectedGuest?.familyName || 'Family'}-Invite.png`}
                      className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                      Download Invite Template
                    </a>
                    <QRCodeCanvas value={inviteLink} size={192} style={{ display: 'none' }} />
                    <button
                      onClick={() => downloadQRCode()}
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Download QR Code
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
      {/* work around to load the font when generate */}
      <p style={{ fontFamily: 'Quincy, sans-serif' }}>‎</p>
      {error && (
        <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 text-center">
          {error}
        </div>
      )}
    </div>
  )
}
