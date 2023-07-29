'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchPalette from '@/components/SearchPalette'

export default function VisPage() {
  const [searchPaletteOpen, setsearchPaletteOpen] = useState(false)

  return (
    <div>
      {/* Button to open the search palette */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
          onClick={() => setsearchPaletteOpen(!searchPaletteOpen)}
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Search palette */}
      <SearchPalette />
    </div>
  )
}

