'use client'

import PersonalInformation from './cardWithPackageInformation/personalInformation'
import { useControlInformationStep } from './controlInformationStepContext'
import OrderConfirmation from './orderConfirmation'
import PaymentInformation from './paymentInformation'
import PurchaseCompleted from './purchaseCompleted'
import TravelerInformation from './travelerInformation'

export default function Steps() {
  const { currentStep } = useControlInformationStep()
  return (
    <>
      {currentStep === 1 && <PersonalInformation />}
      {currentStep === 2 && <TravelerInformation />}
      {currentStep === 3 && <PaymentInformation />}
      {currentStep === 4 && <OrderConfirmation />}
      {currentStep === 5 && <PurchaseCompleted />}
    </>
  )
}
