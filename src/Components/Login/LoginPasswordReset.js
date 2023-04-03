import React from 'react'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import useFetch from '../../Hooks/useFetch'
import useForm from '../../Hooks/useForm'
import { PASSWORD_RESET } from '../../Api'
import Error from '../Helper/Error'
import { useNavigate } from 'react-router-dom'
import Head from '../Helper/Head'

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password =  useForm();
  const {error,loading,request} = useFetch()
  const navigate = useNavigate()

  async function handleSubmit(event){
    event.preventDefault()
    if (password.validate()){
      const {url, options} = PASSWORD_RESET({
        login,
        key,
        password:password.value
      })
      const {response} = await request(url, options);
      if (response.ok) navigate('/login')
    }

  }


  React.useEffect(() =>{
    const params= new URLSearchParams(window.location.search)
    const key = params.get('key');
    const login = params.get ('login')
    if (key) setKey(key)
    if (login) setLogin(login)
  }, [])

  return (
    <section className='animeLeft'>
      <Head title = "Resetar senha" />
      <h1 className='title'>Resetar a Senha</h1>
      <form  onSubmit={handleSubmit}>
        <Input label = "Nova Senha" type= 'password' name="password" {...password}/>
        {loading ? <Button disabled>Resetando...</Button> : <Button disabled>Resetando...</Button> }
      </form> 
      <Error error = {error} />
    </section>
  )
}

export default LoginPasswordReset