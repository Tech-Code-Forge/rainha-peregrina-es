import AttentionAndSafetyContent from './attentionAndSafetyContent'
import BookingDetailsContent from './bookingDetailsContent'
import CancellationsContent from './cancellationsContent'
import { useControlCommonQuestion } from './commonQuestionsContext'
import CommunicationContent from './communicationContent'
import CreditCardsContent from './creditCardsContent'
import ExtraAmenitiesContent from './extraAmenitiesContent'
import FareContent from './fareContent'
import PaymentsContent from './paymentsContent'
import PropertyPoliciesContent from './propertyPoliciesContent'
import RoomTypesContent from './roomTypesContent'

export default function Content() {
  const { currentStep } = useControlCommonQuestion()

  return (
    <div className="mt-5">
      {currentStep === 'CANCELLATIONS' && <CancellationsContent />}
      {currentStep === 'PAYMENTS' && <PaymentsContent />}
      {currentStep === 'BOOKING_DETAILS' && <BookingDetailsContent />}
      {currentStep === 'COMMUNICATION' && <CommunicationContent />}
      {currentStep === 'ROOM_TYPES' && <RoomTypesContent />}
      {currentStep === 'FARE' && <FareContent />}
      {currentStep === 'CREDIT_CARD' && <CreditCardsContent />}
      {currentStep === 'PROPERTY_POLICIES' && <PropertyPoliciesContent />}
      {currentStep === 'EXTRA_AMENITIES' && <ExtraAmenitiesContent />}
      {currentStep === 'ATTENTION_AND_SAFETY' && <AttentionAndSafetyContent />}
    </div>
  )
}
