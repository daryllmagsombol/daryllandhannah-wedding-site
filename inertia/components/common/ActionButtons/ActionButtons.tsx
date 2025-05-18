import React from 'react'

type ActionButtonsProps = {
  onView: () => void
  onUpdate: () => void
  onDelete: () => void
  onGenerateKey: () => void
}

export default function ActionButtons({
  onView,
  onUpdate,
  onDelete,
  onGenerateKey,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2 justify-center">
      <button
        className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        onClick={onView}
      >
        View
      </button>
      <button
        className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
        onClick={onUpdate}
      >
        Update
      </button>
      <button
        className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
        onClick={onDelete}
      >
        Delete
      </button>
      <button
        className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
        onClick={onGenerateKey}
      >
        Generate Key
      </button>
    </div>
  )
}
