import { Button, Form, Input } from 'antd'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/reducers/auth';
import { AppDispatch } from '../store';
import { useTypedSelector } from '../hooks/useTypedSelector';


const LoginForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { error, isLoading } = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submit = () => {
        dispatch(login({ username: username, password: password }));
    }

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 700 }}
                autoComplete="off"
                onFinish={submit}
            >
                {error &&
                    <div style={{ color: "red" }}>
                        {error}
                    </div>
                }
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default LoginForm
