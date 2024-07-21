import React, { FC } from 'react'
import { Layout, Menu, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../router'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { logout } from '../store/reducers/auth'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

const Navbar: FC = () => {
    const router = useNavigate()
    const isAuth = useTypedSelector(state => state.auth.auth);
    const {user} = useTypedSelector(state => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ?
                    <>
                        <div style={{ color: "white", marginRight: "10px", fontSize: "15px" }}>
                            {user.username}
                        </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item
                                onClick={() => dispatch(logout())}
                                key={1}
                            >
                                Logout
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item
                                onClick={() => router(RouteNames.LOGIN)}
                                key={1}
                            >
                                Account
                            </Menu.Item>
                        </Menu>
                    </>
                }
            </Row>
        </Layout.Header>
    )
}

export default Navbar
