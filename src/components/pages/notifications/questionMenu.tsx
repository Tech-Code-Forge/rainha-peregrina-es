import { useControlCommonQuestion } from './commonQuestionsContext'
import NavigationButton from './navigationButton'

export default function QuestionMenu() {
  const { currentStep, setCurrentStep, QUESTION, CURRENT_STEP_TRANSLATION } =
    useControlCommonQuestion()

  return (
    <div className="text-xl border-r border-gray">
      {QUESTION.map(value => (
        <NavigationButton
          key={value}
          selected={currentStep === value}
          onclick={() => setCurrentStep(value)}
          title={CURRENT_STEP_TRANSLATION[value]}
        />
      ))}
    </div>
  )
}
