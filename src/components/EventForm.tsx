import React, { FC, useState } from 'react'
import { Button, DatePicker, Input, Row, Select } from 'antd';
import { Form } from 'antd'
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
import { Dayjs } from 'dayjs';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
    guests: IUser[]
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
    const {user} = useTypedSelector(state => state.auth)

    const [event, setEvent] = useState<IEvent>({
        author: "",
        date: "",
        description: "",
        guest: ""
    } as IEvent)

    const selectDate = (date: Dayjs | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Name event"
                name="description"
                rules={[{ required: true, message: 'Please input your name event!' }]}
            >
                <Input
                    value={event.description}
                    onChange={e => setEvent({ ...event, description: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="Date event"
                name="date"
                rules={[{ required: true, message: 'Please input your date event!' }]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Choose guest"
                name="guest">
                <Select style={{ width: 120 }} onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify="center">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create event
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default EventForm;
