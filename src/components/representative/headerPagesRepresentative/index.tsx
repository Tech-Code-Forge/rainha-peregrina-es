'use client'

import Button from '@/components/button'
import { ChevronsLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HeaderPagesRepresentativeProps {
  hasBackButton?: boolean
  title: string
  description?: string
  actionButton?: React.ReactNode
}

export default function HeaderPagesRepresentative({
  hasBackButton,
  title,
  description,
  actionButton,
}: HeaderPagesRepresentativeProps) {
  const router = useRouter()

  return (
    <div>
      {hasBackButton && (
        <Button
          onClick={() => router.back()}
          variant="text"
          size="small"
          className="p-0 mb-8"
        >
          <ChevronsLeft size={16} />
          Voltar
        </Button>
      )}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[32px] font-bold text-primary">{title}</h1>
          {description && <p className="text-text text-sm">{description}</p>}
        </div>
        {actionButton}
      </div>
    </div>
  )
}
