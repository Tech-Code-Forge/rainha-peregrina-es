import CardWithPackageInformation from '../cardWithPackageInformation'
import TravelersFields from './travelersFields'

export default function TravelerInformation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-28 xl:gap-44">
      <div className="hidden md:block">
        <CardWithPackageInformation />
      </div>

      <TravelersFields />
    </div>
  )
}
