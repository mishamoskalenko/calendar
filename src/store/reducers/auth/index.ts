import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthState } from './types'
import { IUser } from '../../../models/IUser';
import UserService from '../../../api/UserService';

const initialState: AuthState = {
    auth: false,
    error: "",
    isLoading: false,
    user: {} as IUser
}

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string; password: string }, { dispatch }) => {
        try {
            dispatch(setIsLoading(true));
            setTimeout(async () => {
                const response = await UserService.getUsers();
                const mockUser = response.data.find(user => user.username === username && user.password === password);
                if (mockUser) {
                    localStorage.setItem("username", mockUser.username)
                    localStorage.setItem("auth", "true")
                    dispatch(setAuth(true));
                    dispatch(setUser(mockUser));
                }
                else {
                    dispatch(setError("Wrong username or password"));
                }
                dispatch(setIsLoading(false));
            }, 1000)
        }
        catch (e) {
            dispatch(setError('Error has occured'));
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        localStorage.removeItem("auth")
        localStorage.removeItem("username")
        dispatch(setAuth(false));
        dispatch(setUser({} as IUser));
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
            state.isLoading = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setAuth, setUser, setError, setIsLoading } = authSlice.actions
export default authSlice.reducer


