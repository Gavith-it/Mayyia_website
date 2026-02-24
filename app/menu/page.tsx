import { Metadata } from 'next'
import MenuHero from '@/components/pages/MenuHero'
import MenuContent from '@/components/pages/MenuContent'

export const metadata: Metadata = {
  title: "Our Menu - Sri Mayyia Caterers",
  description: 'Explore our exquisite menu featuring premium dishes crafted by master chefs.',
}

import MenuBook from '@/components/pages/MenuBook'

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <MenuBook />
    </>
  )
}
