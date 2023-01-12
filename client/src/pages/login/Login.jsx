import { useState, useEffect } from "react"
import "./login.css"
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import {useSelector, useDispatch} from "react-redux"
import {login, reset} from "../../features/auth/authSlice"
import {useNavigate} from "react-router-dom"
import Loading from "../../components/Loading";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const {email, password} = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  
  useEffect(() => {
    if(isError){
      toast.error(message)
    } 
    
    if(user || isSuccess ) {
      navigate("/")
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])


  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    } 

     dispatch(login(userData))
  }

  
  if(isLoading){
    return <Loading />
  }


  return (
    <div className="auth">
       <h2 className='page-title'><FaUser /> Se connecter</h2>
       <form onSubmit={handleSubmit}>
        <label>
          <span>Email :</span>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Mot de passe :</span>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className='button'>Se connecter !</button>
        </form>
    </div>
  )
}

export default Login