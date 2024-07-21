import React, { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import { Layout, Row } from 'antd'
import { Button } from 'antd/es/radio'
import Modal from 'antd/es/modal/Modal'
import EventForm from '../components/EventForm'
import { useDispatch } from 'react-redux'
import { createEvent, fetchEvents, fetchGuests } from '../store/reducers/event'
import { AppDispatch } from '../store'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../models/IEvent'

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const { guests, events } = useTypedSelector(state => state.event)
    const { user } = useTypedSelector(state => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchGuests());
        dispatch(fetchEvents(user.username));
    }, [dispatch])

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const addNewEvent = (event: IEvent) => {
        dispatch(createEvent(event));
        setModalVisible(false);
    }

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify="center">
                <Button type="primary" style={{ fontSize: "24px" }} onClick={() => setModalVisible(true)}>Add event</Button>
            </Row>
            <Modal
                title="Add event"
                visible={modalVisible}
                footer={null}
                onOk={handleOk} onCancel={handleCancel}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    )
}

export default Event
