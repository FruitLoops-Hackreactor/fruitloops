import { useRef } from 'react'
import { IconSearch } from '@tabler/icons'
import '@/styles/productOverview/searchBar.css'

export default function SearchBar() {
  const searchRef = useRef()

  return (
    <nav className="navbar-container">
      <div className="insert-logo">Logo</div>
      <div className="empty-space"></div>
      <input className="text-box" ref={searchRef} type="text"></input>
      <div className="search-icon">
        <IconSearch />
      </div>
    </nav>
  )
}
