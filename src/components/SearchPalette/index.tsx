import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'

type Person = {
  id: number
  name: string
  phone: string
  email: string
  role: string
  url: string
  profileUrl: string
  imageUrl: string
}

const people: Person[] = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'EEEEE',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'FDFFFF',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'GGGGGG',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

const recent: Person[] = [people[0], people[2], people[3], people[1]]

export default function SearchPalette() {
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState('')

  const filteredItems =
    query === ''
    ? []
    : people.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <>
      {/* Floating button to open the search palette */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
          onClick={() => setShow(!show)}
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Search palette */}
      <Transition.Root show={show} as={Fragment} afterLeave={() => setQuery('')} appear>
        <Dialog as="div" className="relative z-10" onClose={setShow}>
          {/* BG mask */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mt-4 mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                <Combobox onChange={(person: Person) => console.log('Combobox onChange', person)}>
                  {({ activeOption }) => (
                    <>
                      <div className="relative">
                        <MagnifyingGlassIcon
                          className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <Combobox.Input
                          className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                          placeholder="搜索..."
                          onChange={(event) => setQuery(event.target.value)}
                        />
                      </div>

                      {(query === '' || filteredItems.length > 0) && (
                        <Combobox.Options as="div" static hold className="flex divide-x divide-gray-100">
                          <div
                            className={classNames(
                              'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                              !!activeOption && 'sm:h-96'
                            )}
                          >
                            {query === '' && (
                              <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">最近搜索 </h2>
                            )}
                            <div className="-mx-2 text-sm text-gray-700">
                              {(query === '' ? recent : filteredItems).map((person) => (
                                <Combobox.Option
                                  as="div"
                                  key={person.id}
                                  value={person}
                                  className={({ active }) =>
                                    classNames(
                                      'flex cursor-pointer select-none items-center rounded-md p-2',
                                      active && 'bg-gray-100 text-gray-900'
                                    )
                                  }
                                >
                                  {({ active }) => (
                                    <>
                                      <img src={person.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" />
                                      <span className="ml-3 flex-auto truncate">{person.name}</span>
                                      {active && (
                                        <ChevronRightIcon
                                          className="ml-3 h-5 w-5 flex-none text-gray-400"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))}
                            </div>
                          </div>

                          {!!activeOption && (
                            <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                              <div className="flex-none p-6 text-center">
                                <img src={activeOption.imageUrl} alt="" className="mx-auto h-16 w-16 rounded-full" />
                                <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                                <p className="text-sm leading-6 text-gray-500">{activeOption.role}</p>
                              </div>
                              <div className="flex flex-auto flex-col justify-between p-6">
                                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                                  <dt className="col-end-1 font-semibold text-gray-900">Phone</dt>
                                  <dd>{activeOption.phone}</dd>
                                  <dt className="col-end-1 font-semibold text-gray-900">URL</dt>
                                  <dd className="truncate">
                                    <a href={activeOption.url} className="text-indigo-600 underline">
                                      {activeOption.url}
                                    </a>
                                  </dd>
                                  <dt className="col-end-1 font-semibold text-gray-900">Email</dt>
                                  <dd className="truncate">
                                    <a href={`mailto:${activeOption.email}`} className="text-indigo-600 underline">
                                      {activeOption.email}
                                    </a>
                                  </dd>
                                </dl>
                                <button
                                  type="button"
                                  className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  发送消息
                                </button>
                              </div>
                            </div>
                          )}
                        </Combobox.Options>
                      )}

                      {query !== '' && filteredItems.length === 0 && (
                        <div className="px-6 py-14 text-center text-sm sm:px-14">
                          <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                          <p className="mt-4 font-semibold text-gray-900">No people found</p>
                          <p className="mt-2 text-gray-500">
                            找不到任何结果，请尝试其他关键字。
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
