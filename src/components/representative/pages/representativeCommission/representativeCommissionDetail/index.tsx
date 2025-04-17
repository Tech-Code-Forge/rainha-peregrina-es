import Button from '@/components/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Headset } from 'lucide-react'

interface RepresentativeCommissionDetailProps {
  openModalDetail: boolean
  setOpenModalDetail: (openModalDetail: boolean) => void
}

export default function RepresentativeCommissionDetail({
  openModalDetail,
  setOpenModalDetail,
}: RepresentativeCommissionDetailProps) {
  return (
    <Dialog open={openModalDetail} onOpenChange={setOpenModalDetail}>
      <DialogContent className="max-w-xs sm:max-w-4xl flex flex-col py-10">
        <div>
          <h1 className="text-primary font-bold text-[32px]">
            Detalhes da Comissão
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-primary text-xs">Nome do Cliente</span>
            <span className="text-lg">Maria Bethânia da Silva</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-primary text-xs">Data de Compra</span>
            <span className="text-lg">25-jun-2024</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-primary text-xs">Status da Compra</span>
            <span className="text-lg">Finalizada</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-12 mt-3">
          <div className="flex flex-col gap-2">
            <span className="text-primary text-xs">Destino/Pacote</span>
            <span className="text-lg">Terra Santa Especial</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-primary text-xs">Valor do Serviço</span>
            <span className="text-lg">R$ 32.223,00</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-primary text-xs">Taxa de Embarque</span>
            <span className="text-lg">R$ 567,00</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-primary text-xs">Taxa Extra</span>
            <span className="text-lg">R$ 100,00</span>
          </div>
        </div>

        <div className="grid grid-cols-[70%_1fr] items-center justify-between gap-8 border border-primary rounded-[20px] py-6 px-12 my-9">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-primary font-bold text-sm">
                Taxa Adicional
              </span>
              <span className="text-primary text-xs">
                Cálculo em percentual Real ou Dólar pré-definido em acordo
                contratual
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 items-center">
              <div className="inline-flex gap-2 items-center border border-gray p-1 rounded-md text-gray justify-between">
                <span className="text-sm font-bold border-r border-gray pr-1">
                  R$
                </span>
                <span>100</span>
                <div className="bg-gray flex items-center justify-center max-w-[18px] max-h-[18px] rounded-[3px] p-[3px] text-white uppercase text-[10px] text-center">
                  <span>ok</span>
                </div>
              </div>

              <div className="inline-flex gap-2 items-center border border-gray p-1 rounded-md text-gray justify-between">
                <span className="text-sm font-bold border-r border-gray pr-1">
                  US$
                </span>
                <span>0</span>
                <div className="bg-gray flex items-center justify-center max-w-[18px] max-h-[18px] rounded-[3px] p-[3px] text-white uppercase text-[10px] text-center">
                  <span>ok</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-primary font-bold text-sm">
                Taxa de Serviço
              </span>
              <span className="text-primary text-xs">
                Cálculo de percentual valor do pacote após o embarque.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 items-center">
              <div className="inline-flex gap-2 items-center border border-gray p-1 rounded-md text-gray justify-between">
                <span className="text-sm font-bold border-r border-gray pr-1">
                  %
                </span>
                <span>45</span>
                <div className="bg-gray flex items-center justify-center max-w-[18px] max-h-[18px] rounded-[3px] p-[3px] text-white uppercase text-[10px] text-center">
                  <span>ok</span>
                </div>
              </div>

              <div>
                <span className="text-sm font-bold text-primary">
                  R$ 5.564,00
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-primary font-bold text-sm">
                Comissão Pós-Embarque
              </span>
              <span className="text-primary text-xs">
                Cálculo de percentual da taxa de serviço.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 items-center">
              <div className="inline-flex gap-2 items-center border border-gray p-1 rounded-md text-gray justify-between">
                <span className="text-sm font-bold border-r border-gray pr-1">
                  %
                </span>
                <span>3</span>
                <div className="bg-gray flex items-center justify-center max-w-[18px] max-h-[18px] rounded-[3px] p-[3px] text-white uppercase text-[10px] text-center">
                  <span>ok</span>
                </div>
              </div>

              <div>
                <span className="text-sm font-bold text-primary">
                  R$ 4.000,00
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-primary">
              Valor do Total da Comissão
            </span>
            <span className="text-lg">R$ 34.664,99</span>
          </div>
        </div>

        <div className="flex items-center py-6 px-12 rounded-[20px] bg-[#F8F8F8] gap-5">
          <div className="text-primary w-[75px]">
            <Headset size={75} />
          </div>

          <div className="text-sm text-primary">
            <p>Caro Representante,</p>
            <p>
              Em Caso de dúvidas ou contestações em relação ao seu
              comissionamento, por gentileza entrar em contato pelo{' '}
              <strong>(81) 99999-9999</strong> ou pelo e-mail{' '}
              <a href="mailto:#">contato@rainhadasperegrinacoes.com.br</a>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => setOpenModalDetail(false)}
            color="secondary"
            className="w-52"
          >
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
