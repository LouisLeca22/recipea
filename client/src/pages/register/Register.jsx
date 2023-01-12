import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import "./register.css"
import Loading from "../../components/Loading"

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const {name, email, password, password2} = formData


  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      console.log("pass")
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
    
  }

  if (isLoading){
    return <Loading />
  }


  return (
    <div className="auth">
       <h2 className='page-title'><FaUserPlus /> Créer un compte</h2>
       <form onSubmit={handleSubmit}>
       <label>
          <span>Nom d'utilisateur :</span>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Email :</span>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Mot de passe :</span>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Confirmer le mot de passe :</span>
          <input
            type='password'
            name='password2'
            value={formData.password2}
            onChange={handleChange}
       
          />
        </label>
        <button className='button'>Créer mon compte !</button>
        </form>
    </div>
  )
}

export default Register