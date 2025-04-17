import TravelExperiencesContent from './travelExperiencesContent'
import PromotionsAndOffersContent from './promotionsAndOffersContent'
import { useControlCommonQuestion } from './commonQuestionsContext'
import ProductsAndServicesContent from './productsAndServicesContent'

export default function Content() {
  const { currentStep } = useControlCommonQuestion()

  return (
    <div className="mt-5">
      {currentStep === 'PROMOTIONS_AND_OFFERS' && (
        <PromotionsAndOffersContent />
      )}
      {currentStep === 'PRODUCTS_AND_SERVICES' && (
        <ProductsAndServicesContent />
      )}
      {currentStep === 'TRAVEL_EXPERIENCES' && <TravelExperiencesContent />}
    </div>
  )
}
