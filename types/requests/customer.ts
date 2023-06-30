export interface Customer {
    name: string;
    email?: string;
    phone_number: string;
    address: string;
  }
  
  export interface CustomerUpdatePayload {
    id: number;
    name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
  }
  