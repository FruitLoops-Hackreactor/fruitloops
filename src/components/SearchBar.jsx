import { useRef } from 'react'
import { IconSearch } from '@tabler/icons'
import logo from '../assets/images/lgtm-logo2.png'
import '@/styles/productOverview/searchBar.css'

export default function SearchBar() {
  const searchRef = useRef()

  return (
    <nav className="navbar-container" data-testid="navbar-test-id">
      <div className="insert-logo">
        <img className="logo-image" src={logo} alt="Logo" />
      </div>
      <div className="empty-space"></div>
      <input className="text-box" ref={searchRef} type="text"></input>
      <div className="search-icon">
        <IconSearch />
      </div>
    </nav>
  )
}
