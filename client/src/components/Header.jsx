import "./header.css"
import {FaUtensils} from "react-icons/fa"

function Header() {
  return (
    <header className='header'>
    <a>
      <h1>
        <span>Ajoutez</span>
        <span> Recipea</span>
      </h1>
      <h2>Vos recettes <FaUtensils /></h2>
    </a>
  </header>
  )
}

export default Header