import BuyPackageHeader from './buyPackageHeader'
import ControlInformationStepProvider from './controlInformationStepContext'
import InformationStep from './InformationStep'
import Steps from './steps'

export default function BuyPackage() {
  return (
    <ControlInformationStepProvider>
      <div className="mx-auto px-5 md:px-0 w-full md:max-w-5xl mt-5 text-text mb-52">
        <BuyPackageHeader />

        <InformationStep />

        <div className="mt-20">
          <Steps />
        </div>
      </div>
    </ControlInformationStepProvider>
  )
}
