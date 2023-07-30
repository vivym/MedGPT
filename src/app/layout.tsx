import './globals.css'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedGPT',
  description: 'MedGPT, a medical knowledge graph powered by Large Language Model.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={classNames(inter.className, 'h-full flex flex-col')}
      >
        {children}
      </body>
    </html>
  )
}
