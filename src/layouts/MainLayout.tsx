import { ReactNode } from 'react'

import Navbar from '@/components/Navbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='main-layout-container'>
      <Navbar currentTabId="home" />
      <main>{children}</main>
    </div>
  )
}
