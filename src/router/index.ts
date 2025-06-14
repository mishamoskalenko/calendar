import React from "react"
import Login from "../pages/Login"
import Event from "../pages/Event"

interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames{ 
    LOGIN = "/login",
    EVENT = "/event"
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: Login }
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.EVENT, element: Event }
]

