'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  return (
    <div>
      <div className="mt-4 mx-4 sm:mx-6 flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          知识库
        </h1>

        {/* Search bar */}
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search-input"
              id="search-input"
              className="block w-full rounded-none rounded-l-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
              placeholder="搜索..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  router.push(`/app/wiki/${query}`)
                }
              }}
            />
          </div>

          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => router.push(`/app/wiki/${query}`)}
          >
            搜索
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
