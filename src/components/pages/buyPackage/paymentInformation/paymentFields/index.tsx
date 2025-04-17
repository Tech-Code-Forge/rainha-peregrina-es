'use client'

import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Barcode, CreditCard, PixLogo } from '@phosphor-icons/react'
import { useState } from 'react'
import { useControlInformationStep } from '../../controlInformationStepContext'
import Link from 'next/link'
import TicketMethod from './ticketMethod'
import CreditCardMethod from './creditCardMethod'
import TwoCreditCardMethod from './twoCreditCardMethod'
import PIXMethod from './pixMethod'
import DebitMethod from './debitMethod'

export default function PaymentFields() {
  const { setCurrentStep } = useControlInformationStep()
  const [activeCupom, setActiveCupom] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('ticket' as string)
  const [qrCodeGenerated, setQrCodeGenerated] = useState(true)

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <aside>
      <h2 className="text-text text-2xl md:text-[32px] font-bold mb-5">
        Informações de Pagamento
      </h2>

      <div className="flex flex-col shadow-md rounded-xl bg-white p-3">
        <div className="mt-4 flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Insira o nome aqui"
            label="Nome do titular"
          />

          <Input
            type="text"
            placeholder="Número do Documento"
            label="CPF do Titular"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <Select>
              <SelectTrigger label="Data de Nascimento">
                <SelectValue placeholder="Dia" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="step1">01</SelectItem>
                  <SelectItem value="step2">02</SelectItem>
                  <SelectItem value="step3">03</SelectItem>
                  <SelectItem value="step4">04</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="step1">Janeiro</SelectItem>
                  <SelectItem value="step2">Fevereiro</SelectItem>
                  <SelectItem value="step3">Março</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="step1">1990</SelectItem>
                  <SelectItem value="step2">1991</SelectItem>
                  <SelectItem value="step3">1992</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col shadow-md rounded-xl bg-white p-3 mt-4">
        <span className="font-bold">Como você quer pagar?</span>

        <RadioGroup value={paymentMethod}>
          <div className="flex items-center space-x-4 border-b border-gray py-4">
            <RadioGroupItem
              value="ticket"
              id="r1"
              onClick={() => setPaymentMethod('ticket')}
            />
            <label htmlFor="r1" className="flex items-center gap-1">
              <Barcode size={16} className="text-gray" />
              <div className="flex items-center gap-5">
                <span>Boleto parcelado</span>
                <span className="text-[10px] py-1 px-2 rounded-full bg-green text-white">
                  Até 5% OFF
                </span>
              </div>
            </label>
          </div>

          <div className="flex items-center space-x-4 border-b border-gray py-4">
            <RadioGroupItem
              value="credit_card"
              id="r2"
              onClick={() => setPaymentMethod('credit_card')}
            />
            <label htmlFor="r2" className="flex items-center gap-1">
              <CreditCard size={16} className="text-gray" />
              <span>Cartão de crédito</span>
            </label>
          </div>

          <div className="flex items-center space-x-4 border-b border-gray py-4">
            <RadioGroupItem
              value="two_credit_card"
              id="r3"
              onClick={() => setPaymentMethod('two_credit_card')}
            />
            <label htmlFor="r3" className="flex items-center gap-1">
              <CreditCard size={16} className="text-gray" />
              <span>2 cartões de crédito</span>
            </label>
          </div>

          <div className="flex items-center space-x-4 border-b border-gray py-4">
            <RadioGroupItem
              value="PIX"
              id="r4"
              onClick={() => setPaymentMethod('PIX')}
            />
            <label htmlFor="r4" className="flex items-center gap-1">
              <PixLogo weight="fill" size={16} className="text-gray" />
              <div className="flex items-center gap-5">
                <span>Pix</span>
                <span className="text-[10px] py-1 px-2 rounded-full bg-green text-white">
                  Até 5% OFF
                </span>
              </div>
            </label>
          </div>

          <div className="flex items-center space-x-4 border-b border-gray py-4">
            <RadioGroupItem
              value="debit"
              id="r5"
              onClick={() => setPaymentMethod('debit')}
            />
            <label htmlFor="r5" className="flex items-center gap-1">
              <CreditCard size={16} className="text-gray" />
              <span>Débito automático</span>
            </label>
          </div>
        </RadioGroup>

        <div className="mt-6 flex flex-col md:flex-row items-start">
          <span className="mt-2 whitespace-nowrap">Você tem um cupom?</span>
          <div>
            <Button
              className="pl-0 md:pl-4"
              variant="text"
              color="primary"
              onClick={() => setActiveCupom(!activeCupom)}
            >
              Ative seu cupom aqui
            </Button>

            {activeCupom && (
              <div className="flex gap-3 ml-0 md:ml-4">
                <Input type="text" placeholder="Cupom" />
                <Button variant="contained" color="secondary">
                  Validar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col shadow-md rounded-xl bg-white p-3 mt-4">
        {paymentMethod === 'ticket' && <TicketMethod />}

        {paymentMethod === 'credit_card' && <CreditCardMethod />}

        {paymentMethod === 'two_credit_card' && <TwoCreditCardMethod />}

        {paymentMethod === 'PIX' && <PIXMethod />}

        {paymentMethod === 'debit' && <DebitMethod />}
        <RadioGroup className="my-10">
          <div className="flex items-center space-x-2 md:space-x-4">
            <RadioGroupItem value="ticket" id="r1" />
            <label htmlFor="r1" className="text-sm md:text-base">
              Li e aceito os{' '}
              <Link
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Termos de Uso e Condições.
              </Link>
            </label>
          </div>
        </RadioGroup>
        <Button
          className="mt-3 md:hidden"
          variant="outlined"
          onClick={() => {
            setCurrentStep(2), scrollToTop()
          }}
        >
          Retornar
        </Button>

        {paymentMethod === 'PIX' && qrCodeGenerated ? (
          <Button className="mt-3" onClick={() => setQrCodeGenerated(false)}>
            Gerar QR Code
          </Button>
        ) : (
          paymentMethod === 'PIX' && (
            <Button
              className="mt-3"
              color="secondary"
              onClick={() => {
                setCurrentStep(4), scrollToTop()
              }}
            >
              Avançar
            </Button>
          )
        )}
        {paymentMethod !== 'PIX' && (
          <Button
            className="mt-3"
            color="secondary"
            onClick={() => {
              setCurrentStep(4), scrollToTop()
            }}
          >
            Avançar
          </Button>
        )}
      </div>
    </aside>
  )
}
