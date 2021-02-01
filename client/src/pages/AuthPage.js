import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: '',name: "" // здесь даные из инпута
  })

  useEffect(() => {
    console.log(error)
    clearError()
  }, [error, clearError])


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })// передаём даные из инпута
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      console.log(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId, data.name)
    } catch (e) {}
  }

  return (
    <div >
      <div >
        <h1>Игра 21</h1>
        <div >
          <div >
            <span >Авторизация</span>
            <div>
              <div >
                <input
                    placeholder="Введите Имя"
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={changeHandler}
                />
                <label htmlFor="email">Имя</label>
              </div>
              <div >
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div >
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>

            </div>
          </div>
          <div>
            <button
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
