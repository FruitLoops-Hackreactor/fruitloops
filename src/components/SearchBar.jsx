import { useRef } from 'react'
import logo from '../assets/images/lgtm-logo2.png'
import '@/styles/productOverview/searchBar.css'

export default function SearchBar() {
  const searchRef = useRef()

  return (
    <nav className="navbar-container" data-testid="navbar-test-id">
      <div className="insert-logo">
        <a href="/">
          <img className="logo-image" src={logo} alt="Logo" />
        </a>
      </div>
      <div className="empty-space"></div>
      <input className="text-box" ref={searchRef} type="text"></input>
      <div className="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-search"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="10" cy="10" r="7"></circle>
          <line x1="21" y1="21" x2="15" y2="15"></line>
        </svg>
      </div>
    </nav>
  )
}
