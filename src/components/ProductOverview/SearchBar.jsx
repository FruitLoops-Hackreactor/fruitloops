import { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import '../../styles/productOverview.css'

export default function SearchBar() {
  const searchRef = useRef()

  return (
    <nav className="search">
      <div className="logo">[Insert Logo Here]</div>
      <input ref={searchRef} type="text" placeholder="test"></input>
      <div className="search-icon">
        <SearchIcon />
      </div>
    </nav>
  )
}
