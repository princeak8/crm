import Prospect from "../prospect";

export interface SaveProspectPayload {
    name: Prospect['name'];
    email?: Prospect['email'];
    phone_number: Prospect['phone_number'];
    address?: Prospect['address'];
}