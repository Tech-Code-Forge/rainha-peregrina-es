'use client'

import HeaderRepresentative from '@/components/representative/headerRepresentative'
import { ReactNode } from 'react'
import LoggedRepresentativeProvider from './loggedRepresentativeContext'
import FooterRepresentative from '@/components/representative/footerRepresentative'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { Toaster } from '@/components/ui/toaster'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LoggedRepresentativeProvider>
        <div className="bg-background flex flex-col min-h-screen">
          <Toaster />
          <HeaderRepresentative />

          <main>{children}</main>

          <FooterRepresentative />
        </div>
      </LoggedRepresentativeProvider>
    </QueryClientProvider>
  )
}
