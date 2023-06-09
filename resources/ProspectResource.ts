import ProspectInterface from "../types/prospect";

// Customizes DB table data
interface resource {
    name: ProspectInterface['name'];
    email?: ProspectInterface['email'];
    phone_number: ProspectInterface['phone_number'];
    address?: ProspectInterface['address'];
}

export default class ProspectResource
{

    static single(prospect: ProspectInterface)
    {
        return {
            name: prospect.name,
            email: prospect.email,
            phone_number: prospect.phone_number,
            address: prospect.address
        }
    }

    static collection(prospects: ProspectInterface[])
    {
        const collection: resource[] = [];
        if(prospects.length > 0) {
            prospects.forEach((prospect: ProspectInterface) => {
                let newResource = this.single(prospect);
                collection.push(newResource);
            })
        }
        return collection;
    }
}

