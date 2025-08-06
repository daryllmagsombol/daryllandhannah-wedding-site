export default function NavigationBar() {
  // ...existing state and logic...

  return (
    <>
      {/* Navigation Bar */}
      <nav className="mb-8 flex gap-4 items-center bg-white shadow rounded-lg px-6 py-3">
        <a href="/" className="text-gray-700 hover:text-blue-500">
          Home
        </a>
        <a href="/guests" className="text-gray-700 hover:text-blue-500">
          Guests
        </a>
        <a href="/statistics" className="text-gray-700 hover:text-blue-500">
          Statistics
        </a>
        <a href="/seat-inquiry" className="text-gray-700 hover:text-blue-500">
          Seat Inquiry
        </a>
      </nav>
    </>
  )
}
