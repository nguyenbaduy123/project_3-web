import React from 'react'
import styles from './index.scss'

const NAVIGATION_ITEMS = [
  {
    id: 'home',
    name: 'Home',
    href: '/home',
  },
]

interface Props {
  currentTabId: string
}

const Navbar = ({ currentTabId }: Props) => {
  return (
    <section className="navbar-container">
      <nav>
        {NAVIGATION_ITEMS.map((item) => (
          <div className={`tab-item${currentTabId == item.id ? ' tab-item-selected' : ''}`}>
            {item.name}
          </div>
        ))}
      </nav>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </section>
  )
}

export default Navbar
