import { Employee } from "./employee";

export interface LoginPayload {
    email: Employee['email'];
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message?: string;
    data?: Employee;
    token?: string;
}