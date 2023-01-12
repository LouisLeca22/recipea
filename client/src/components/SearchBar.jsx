import "./searchbar.css"
import {FaSearch} from "react-icons/fa"
import { useState } from "react"
import {useNavigate} from "react-router-dom"

function SearchBar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    if(open === false){
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const [term, setTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if(term.length >= 3){
      navigate(`/search?q=${term}`)
      setTerm("")
      setOpen(false)
    }
  }

  return (
    <form className="search-container" onSubmit={handleSubmit}>
    <div className={open ? "search active" : "search"}>
    <input type="text" className="input" value={term} placeholder="Recherche..." onChange={(e) => setTerm(e.target.value)} />
   <button className="btn-search" onClick={handleClick}>
     <FaSearch />
   </button>
  </div>
  </form>
  )
}

export default SearchBar