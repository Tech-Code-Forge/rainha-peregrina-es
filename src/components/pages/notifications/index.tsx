'use client'

import NotificationsMobile from './notificationsMobile'
import ControlCommonQuestionProvider from './commonQuestionsContext'
import Content from './content'
import QuestionMenu from './questionMenu'

export default function Notifications() {
  return (
    <ControlCommonQuestionProvider>
      <div className="mx-auto px-5 md:px-0 w-full md:max-w-5xl my-5 md:my-14 pb-28">
        <h1 className="text-2xl md:text-[32px] font-semibold md:font-bold text-primary">
          Notificações por e-mail
        </h1>

        <p className="text-sm my-4">
          Decida quais notificações quer receber e se descadastre do resto.
        </p>

        <div className="hidden md:grid shadow-md rounded-lg bg-white grid-cols-[30%_1fr] mt-10">
          <QuestionMenu />

          <Content />
        </div>

        <NotificationsMobile />
      </div>
    </ControlCommonQuestionProvider>
  )
}
