import React from 'react'
import styles from './index.scss'

const NAVIGATION_ITEMS = [
  {
    id: 'home',
    name: 'Home',
    href: '/home',
  },
]

const Navbar = () => {
  return (
    <section className="navbar-container">
      <nav>
        {NAVIGATION_ITEMS.map((item) => (
          <div className='navbar-item'>{item.name}</div>
        ))}
      </nav>
      <style dangerouslySetInnerHTML={{__html: styles}} />
    </section>
  )
}

export default Navbar
