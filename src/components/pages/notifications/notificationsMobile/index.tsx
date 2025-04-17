import TravelExperiencesContent from '../travelExperiencesContent'
import PromotionsAndOffersContent from '../promotionsAndOffersContent'
import { useControlCommonQuestion } from '../commonQuestionsContext'
import ProductsAndServicesContent from '../productsAndServicesContent'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function NotificationsMobile() {
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
            {value === 'PROMOTIONS_AND_OFFERS' && (
              <PromotionsAndOffersContent />
            )}
            {value === 'PRODUCTS_AND_SERVICES' && (
              <ProductsAndServicesContent />
            )}
            {value === 'TRAVEL_EXPERIENCES' && <TravelExperiencesContent />}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
