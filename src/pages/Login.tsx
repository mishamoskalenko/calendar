import { Layout, MenuProps, Row } from 'antd'
import React, { FC } from 'react'
import LoginForm from '../components/LoginForm'
import Card from 'antd/es/card/Card'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd'

const Login: FC = () => {
    const items: MenuProps['items'] = [
        {
            label: <p>Username: misha</p>,
            key: '0',
        },
        {
            label: <p>Password: misha12345</p>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <p>Username: user</p>,
            key: '2',
        },
        {
            label: <p>Password: user12345</p>,
            key: '3',
        },
    ];

    return (
        <Layout>
            <Row justify="center" align="middle" className='h100'>
                <h1 className='header'>Calendar</h1>
                <div className='description'>
                    <p>You have 2 profiles. Each profile has its username, password, and tasks that you have written. Also, when you add the event, you can choose a guest, which can also see this event.</p>
                    <p>Profiles:</p>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Click me
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Card>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    )
}

export default Login
