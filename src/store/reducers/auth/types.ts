import { IUser } from "../../../models/IUser";

export interface AuthState{
    auth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}
