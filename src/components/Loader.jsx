import React from 'react'

const Loader = () => {
  return (
    <div className="min-h-500 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-4 border-red-500 rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader