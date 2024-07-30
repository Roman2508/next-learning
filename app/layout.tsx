import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import Header from '@/components/Header'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Next Learning</title>
      </head>

      <body className={`${inter.className} min-h-screen`}>
        <Header />
        <div className="container pt-10 max-w-2xl">{children}</div>
      </body>
    </html>
  )
}
