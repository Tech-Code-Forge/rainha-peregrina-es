'use client'

import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Camera, NotePencil, X } from '@phosphor-icons/react'
import { useRef, useState } from 'react'
import EditUser from './editUser'
import { User } from 'lucide-react'

interface UserCardProps {
  name: string | null
}

export default function UserCard({ name }: UserCardProps) {
  const [editCard, setEditCard] = useState(false)
  const [openAddPhoto, setOpenAddPhoto] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  return (
    <>
      {!editCard ? (
        <div className="shadow-md bg-white flex flex-col md:flex-row md:items-center rounded-lg p-8 justify-between gap-8">
          <div className="flex justify-between">
            <span className="text-lg">{name}</span>
            <div className="flex md:hidden gap-6">
              <Button className="rounded-full size-[28px] p-1">
                <Camera
                  className="w-full h-full"
                  onClick={() => setOpenAddPhoto(true)}
                />
              </Button>
              <Button
                className="rounded-full size-[28px] p-1"
                onClick={() => setEditCard(true)}
              >
                <NotePencil className="w-full h-full" />
              </Button>
            </div>
          </div>

          <div className="md:flex gap-6 hidden">
            <Button className="rounded-full size-[50px] p-2">
              <Camera
                className="w-full h-full"
                onClick={() => setOpenAddPhoto(true)}
              />
            </Button>
            <Button
              className="rounded-full size-[50px] p-2"
              onClick={() => setEditCard(true)}
            >
              <NotePencil className="w-full h-full" />
            </Button>
          </div>
        </div>
      ) : (
        <EditUser setEditCard={setEditCard} />
      )}

      <Dialog open={openAddPhoto} onOpenChange={setOpenAddPhoto}>
        <DialogContent className="max-w-xs sm:max-w-xl">
          <div className="flex flex-col gap-10 items-center mt-4 sm:mt-0">
            <div className="flex gap-4 sm:gap-10 items-center">
              <div>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-36 h-36 object-cover rounded-full mb-4"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] md:w-[137px] md:h-[137px] rounded-full bg-gray flex items-end justify-center relative">
                    <User className="text-white size-[80px] md:size-[110px]" />
                  </div>
                )}
              </div>
              <div className="space-y-3 flex flex-col items-start ">
                <label
                  htmlFor="file"
                  className="hover:cursor-pointer px-4 text-sm sm:text-base sm:px-10 text-white bg-primary py-2"
                >
                  Carregar imagem
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                </label>

                <Button
                  onClick={() => setSelectedImage(null)}
                  variant="text"
                  size="small"
                  className="w-full text-red-500"
                >
                  <X size={16} />
                  Remover foto
                </Button>
              </div>
            </div>
            <Button
              className="sm:max-w-52"
              color="secondary"
              onClick={() => {}}
            >
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
