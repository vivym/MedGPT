'use client'

import { useRouter } from 'next/navigation'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

const items = [
  {
    id: 1,
    name: '内科',
    numSubItems: 21,
  },
  {
    id: 2,
    name: '外科',
    numSubItems: 19,
  },
  {
    id: 3,
    name: '妇产科',
    numSubItems: 3,
  },
  {
    id: 4,
    name: '小儿科',
    numSubItems: 13,
  },
  {
    id: 5,
    name: '生殖医学科',
    numSubItems: 1,
  },
  {
    id: 6,
    name: '骨科',
    numSubItems: 4,
  },
  {
    id: 7,
    name: '耳鼻喉科',
    numSubItems: 2,
  },
  {
    id: 8,
    name: '眼科',
    numSubItems: 2,
  },
  {
    id: 9,
    name: '口腔科',
    numSubItems: 5,
  },
  {
    id: 10,
    name: '皮肤性病科',
    numSubItems: 2,
  },
  {
    id: 11,
    name: '肿瘤科',
    numSubItems: 4,
  },
  {
    id: 12,
    name: '精神病科',
    numSubItems: 4,
  },
  {
    id: 13,
    name: '康复医学科',
    numSubItems: 2,
  },
  {
    id: 14,
    name: '介入科',
    numSubItems: 1,
  },
  {
    id: 15,
    name: '急诊科',
    numSubItems: 6,
  },
  {
    id: 16,
    name: '中医科',
    numSubItems: 1,
  },
  {
    id: 17,
    name: '疼痛科',
    numSubItems: 1,
  },
  {
    id: 18,
    name: '烧伤科',
    numSubItems: 1,
  },
  {
    id: 19,
    name: '专病',
    numSubItems: 1,
  },
]

export default function WikiHomePage() {
  const router = useRouter()

  return (
    <div className="mx-4 mt-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <button
            key={item.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 cursor-pointer"
            onClick={(e) => {
              router.push(`/app/wiki/${item.name}`)
              e.preventDefault()
            }}
          >
            <span>{item.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-gray-300">
                {item.numSubItems}
              </span>
              <span className="sr-only">sub-items</span>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
