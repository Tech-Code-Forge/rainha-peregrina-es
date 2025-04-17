import AttentionAndSafetyContent from '../attentionAndSafetyContent'
import BookingDetailsContent from '../bookingDetailsContent'
import CancellationsContent from '../cancellationsContent'
import { useControlCommonQuestion } from '../commonQuestionsContext'
import CommunicationContent from '../communicationContent'
import CreditCardsContent from '../creditCardsContent'
import ExtraAmenitiesContent from '../extraAmenitiesContent'
import FareContent from '../fareContent'
import PaymentsContent from '../paymentsContent'
import PropertyPoliciesContent from '../propertyPoliciesContent'
import RoomTypesContent from '../roomTypesContent'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion'

export default function QuestionsMobile() {
  const { QUESTION, CURRENT_STEP_TRANSLATION } = useControlCommonQuestion()

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full shadow-md bg-white rounded-lg mt-8 md:hidden"
    >
      {QUESTION.map(value => (
        <AccordionItem key={value} value={value} className="border-none">
          <AccordionTrigger className="p-5 text-primary font-bold text-xl [&[data-state=open]]:bg-[#F6F6F6]">
            {CURRENT_STEP_TRANSLATION[value]}
          </AccordionTrigger>
          <AccordionContent className="px-5">
            {value === 'CANCELLATIONS' && <CancellationsContent />}
            {value === 'PAYMENTS' && <PaymentsContent />}
            {value === 'BOOKING_DETAILS' && <BookingDetailsContent />}
            {value === 'COMMUNICATION' && <CommunicationContent />}
            {value === 'ROOM_TYPES' && <RoomTypesContent />}
            {value === 'FARE' && <FareContent />}
            {value === 'CREDIT_CARD' && <CreditCardsContent />}
            {value === 'PROPERTY_POLICIES' && <PropertyPoliciesContent />}
            {value === 'EXTRA_AMENITIES' && <ExtraAmenitiesContent />}
            {value === 'ATTENTION_AND_SAFETY' && <AttentionAndSafetyContent />}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
