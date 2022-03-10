
import {FaTimes, FaBars} from "react-icons/fa"
import "./menubutton.css"


function MenuButton({open, setOpen}) {

  return (
    <div className="menu-button">
    <div className="menu-circle">
        <button id="close" onClick={() => setOpen(false)}>
          <FaTimes />
        </button>
        <button id="open">
          <FaBars onClick={() => setOpen(true)} />
        </button>
      </div>
    </div>
  )
}

export default MenuButton