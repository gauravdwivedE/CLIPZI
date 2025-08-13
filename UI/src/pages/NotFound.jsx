import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 text-white bg-[#144EE3] rounded-full transition duration-300"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
