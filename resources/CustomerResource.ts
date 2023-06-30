import CustomerInterface from "../types/customer";

// Customizes DB table data
interface resource {
    name: CustomerInterface['name'];
    email?: CustomerInterface['email'];
    phone_number: CustomerInterface['phone_number'];
    address?: CustomerInterface['address'];
}

export default class CustomerResource
{

    static single(customer: CustomerInterface)
    {
        return {
            name: customer.name,
            email: customer.email,
            phone_number: customer.phone_number,
            address: customer.address
        }
    }

    static collection(customers: CustomerInterface[])
    {
        const collection: resource[] = [];
        if(customers.length > 0) {
            customers.forEach((customer: CustomerInterface) => {
                let newResource = this.single(customer);
                collection.push(newResource);
            })
        }
        return collection;
    }
}

