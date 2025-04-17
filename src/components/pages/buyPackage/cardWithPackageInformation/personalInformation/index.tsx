import CardWithPackageInformation from '..'
import InformationFields from './InformationFields'

export default function PersonalInformation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-28 xl:gap-44">
      <CardWithPackageInformation />

      <InformationFields />
    </div>
  )
}
