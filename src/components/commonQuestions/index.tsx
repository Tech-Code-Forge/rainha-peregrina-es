'use client'

import { twMerge } from 'tailwind-merge'
import QuestionsMobile from './QuestionsMobile'
import ControlCommonQuestionProvider from './commonQuestionsContext'
import Content from './content'
import QuestionMenu from './questionMenu'

interface CommonQuestionsProps {
  isPage?: boolean
  title: string
}

export default function CommonQuestions({
  isPage,
  title,
}: CommonQuestionsProps) {
  return (
    <ControlCommonQuestionProvider>
      <div
        className={twMerge(
          isPage
            ? 'mx-auto px-5 md:px-0 w-full md:max-w-5xl my-5 md:my-14 pb-28'
            : '',
        )}
      >
        <h1 className="text-2xl md:text-[32px] font-semibold md:font-bold text-primary">
          {title}
        </h1>

        <p className="text-sm my-4">
          Tire todas as suas dúvidas a respeito de diversos temas com as
          perguntas mais frequentes.
        </p>

        <div className="hidden md:grid shadow-md rounded-lg bg-white grid-cols-[30%_1fr] gap-5 mt-10">
          <QuestionMenu />

          <Content />
        </div>

        <QuestionsMobile />
      </div>
    </ControlCommonQuestionProvider>
  )
}
