import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import CarouselTab from './CarouselTab'

export default function PrivacyTab() {
  return (
    <Tabs defaultValue="1" className="">
      <TabsList className="w-full bg-transparent mb-4 md:mb-8">
        <CarouselTab />
      </TabsList>
      <TabsContent value="1">
        <div className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          laudantium suscipit iure ipsam obcaecati nam hic odio repellendus
          praesentium pariatur! A, quod quaerat tempore voluptatum itaque
          laboriosam quasi adipisci architecto? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sunt voluptatum incidunt soluta possimus
          asperiores laborum itaque natus sequi mollitia officiis! Explicabo,
          exercitationem deleniti illo assumenda repellat sequi mollitia ipsum
          quis! Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Unde soluta
          temporibus qui aperiam earum delectus consectetur? Exercitationem,
          nostrum tempora aliquid esse quam saepe distinctio vel? Adipisci
          molestias quia expedita! Earum. Lorem ipsum dolor sit amet consectetur
          adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing
          elit Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Laboriosam nihil itaque impedit rem repellendus culpa, esse fugiat
          facilis odit officiis ut, suscipit facere iste? Ad quaerat esse unde
          officiis aliquam.
        </div>
      </TabsContent>
    </Tabs>
  )
}
