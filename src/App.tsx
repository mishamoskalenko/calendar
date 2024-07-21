import React, { FC, useEffect } from 'react'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import { Layout } from 'antd'
import './App.css'
import { setAuth, setUser } from './store/reducers/auth'
import { IUser } from './models/IUser'
import { useDispatch } from 'react-redux'

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(setUser({ username: localStorage.getItem('username' || '') } as IUser))
      dispatch(setAuth(true))
    }
  }, [])

  return (
    <div>
      <Layout>
        <Navbar />
        <Layout.Content>
          <AppRouter />
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default App
