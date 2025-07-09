export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-50 to-purple-100 text-center">
      <h1 className="text-6xl font-extrabold text-purple-900 mb-4">404</h1>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-md sm:text-lg text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <a
        href="/"
        className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 rounded shadow hover:bg-purple-600 transition"
      >
        Go Back to Homepage
      </a>
    </div>
  )
}
