import React from 'react'

type ModalProps = {
  title: string
  children: React.ReactNode
  maxWidth?: string
  onClose: () => void
}

export default function Modal({ title, children, onClose, maxWidth = '4xl' }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-6 max-w-sm md:max-w-${maxWidth} w-full max-h-[90vh] scrollable overflow-y-auto relative`}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  )
}
