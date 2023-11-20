import { ReactNode } from "react";

export interface InitialState {
    name: string,
    email: string,
    password: string,
    reg_time: string,
    login_time: string,
    activityStatus: string,
}

export interface ButtonComponentType {
    type: string;
    color: string;
    icon: ReactNode;
    onClick: () => void;
}

export interface CheckboxType {
    id?: string;
    onClick: () => void;
}