'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type WindowProxyWithClickAction = WindowProxy & {
  clickaction: (url: string) => void
}

export default function WikiPage({ params }: { params: { query: string } }) {
  const router = useRouter()
  const [iframeHeight, setIframeHeight] = useState(0)
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex w-full mt-3">
      <iframe
        className="flex-1"
        src={`/graph/search.php/${params.query}`}
        onLoad={(event) => {
          const target = event.target as HTMLIFrameElement
          const contentWindow = target.contentWindow!! as WindowProxyWithClickAction

          setTimeout(() => {
            const clickaction = contentWindow.clickaction
            contentWindow.clickaction = (url: string) => {
              if (url.startsWith('/index.php')) {
                const subpaths = url.split('/')
                if (subpaths.length === 3) {
                  const query = subpaths[2]
                  router.push(`/app/wiki/${query}`)
                }
              } else {
                clickaction(url)
              }
            }

            setIframeHeight(contentWindow.document.body.scrollHeight)
            setLoading(false)
            console.log('setIframeHeight', contentWindow.document.body.scrollHeight + 100)
          }, 500)
        }}
        height={iframeHeight}
      />
      {loading && (
        <div
          className="absolute w-full z-50 flex items-center justify-center bg-white"
          style={{ height: Math.max(iframeHeight, 400) }}
        >
          <span className="animate-pulse text-3xl">正在加载...</span>
        </div>
      )}
    </div>
  )
}
