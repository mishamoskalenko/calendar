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

/**
 * Event page component.
 * This page displays the user's event calendar, allows creating new events,
 * and fetches necessary data like guests and events from the server.
 */
const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const { guests, events } = useTypedSelector(state => state.event)
    const { user } = useTypedSelector(state => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    // Fetch guests and user's events on component mount
    useEffect(() => {
        dispatch(fetchGuests());
        dispatch(fetchEvents(user.username));
    }, [dispatch])

    // Handler to close the modal
    const handleOk = () => {
        setModalVisible(false);
    };

    // Handler to close the modal
    const handleCancel = () => {
        setModalVisible(false);
    };

    // Handler for creating a new event
    const addNewEvent = (event: IEvent) => {
        dispatch(createEvent(event));
        setModalVisible(false);
    }

    return (
        <Layout>
            {/* Component to display the event calendar */}
            <EventCalendar events={events} />
            <Row justify="center">
                <Button type="primary" style={{ fontSize: "24px" }} onClick={() => setModalVisible(true)}>Add event</Button>
            </Row>
            {/* Modal for adding a new event */}
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
