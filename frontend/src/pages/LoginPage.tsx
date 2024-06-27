import { useState } from 'react'

function LoginPage() {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      <main>
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={loginInfo.email} onChange={(e) => changeHandler(e)} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={loginInfo.password} onChange={(e) => changeHandler(e)} />

          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  )
}

export default LoginPage
