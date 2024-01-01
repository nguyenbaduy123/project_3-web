import { ReactNode } from 'react'

import Navbar from '@/components/Navbar'

export default function Layout({
  children,
  currentTabId,
}: {
  children: ReactNode
  currentTabId: string
}) {
  return (
    <div className="main-layout-container">
      <Navbar currentTabId={currentTabId} />
      <main className="main-container" style={{ marginTop: 48 }}>
        {children}
      </main>
    </div>
  )
}
