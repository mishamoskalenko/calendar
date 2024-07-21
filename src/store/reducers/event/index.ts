import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EventState } from './types'
import UserService from '../../../api/UserService';
import { IEvent } from '../../../models/IEvent';

const initialState: EventState = {
    events: [],
    guests: []
}

export const fetchGuests = createAsyncThunk(
    'event/fetchguests',
    async(_, { dispatch }) => {
        try {
            const response = await UserService.getUsers();
            dispatch(setGuests(response.data));
        }
        catch (e) {
            console.log(e)
        }
    }
);

export const createEvent = createAsyncThunk(
    'event/createevent',
    async (event: IEvent, { dispatch }) => {
        try {
            const events = localStorage.getItem("events") || '[]'
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(setEvents(json));
            localStorage.setItem('events', JSON.stringify(json));
        } 
        catch (e) {
            console.log(e)
        }
    }
);

export const fetchEvents = createAsyncThunk(
    'event/fetchevents',
    async(username: string, { dispatch }) => {
        try {
            const events = localStorage.getItem("events") || '[]'
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);
            dispatch(setEvents(currentUserEvents));
        } catch (e) {
            console.log(e)
        }
    }
);

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setGuests: (state, action) => {
            state.guests = action.payload;
        },
        setEvents: (state, action) => {
            state.events = action.payload;
        },
    },
});

export const { setGuests, setEvents } = eventSlice.actions
export default eventSlice.reducer


