import React from 'react'
import styles from './index.scss'
import Router from 'next/router'

const NAVIGATION_ITEMS = [
  {
    id: 'home',
    name: 'Home',
    href: '/home',
  },
  {
    id: 'filters',
    name: 'Filters',
    href: '/filters',
  },
  {
    id: 'search',
    name: 'Recommend',
    href: '/search',
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
          <div
            key={item.id}
            className={`tab-item${
              currentTabId == item.id ? ' tab-item-selected' : ''
            }`}
            onClick={() => Router.push(item.href)}
          >
            {item.name}
          </div>
        ))}
      </nav>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </section>
  )
}

export default Navbar
