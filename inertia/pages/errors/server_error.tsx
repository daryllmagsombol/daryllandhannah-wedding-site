export default function ServerError(props: { error: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-50 to-red-100 text-center">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">500</h1>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Server Error</h2>
      <p className="text-md sm:text-lg text-gray-600 mb-8">
        Oops! Something went wrong on our end. Please try again later.
      </p>
      {props.error?.message && (
        <p className="text-sm sm:text-md text-gray-500 italic mb-6">
          Error Details: {props.error.message}
        </p>
      )}
      <a
        href="/"
        className="bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600 transition"
      >
        Go Back to Homepage
      </a>
    </div>
  )
}
