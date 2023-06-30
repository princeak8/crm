import department from './department';

export interface Employee {
    name: string;
    email: string;
    phone_number: string;
    department_id?: number;
    department?: department;
}

export interface SaveEmployeePayload {
    name: Employee['name'];
    email: Employee['email'];
    password: string;
    phone_number: Employee['phone_number'];
    department_id: Employee['department_id'];
}