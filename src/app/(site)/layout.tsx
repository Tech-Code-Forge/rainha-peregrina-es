'use client'
import Footer from '@/components/footer'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import Header from '@/components/header'
import { ReactNode } from 'react'
import LoggedUserProvider from './loggedUserContext'
import { Toaster } from '@/components/ui/toaster'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LoggedUserProvider>
        <div className="bg-background flex flex-col min-h-screen">
          <Toaster />
          <Header />

          <main>{children}</main>

          <Footer />
        </div>
      </LoggedUserProvider>
    </QueryClientProvider>
  )
}
