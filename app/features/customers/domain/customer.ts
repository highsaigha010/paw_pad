// Lists the customer states supported by the customer directory.
export type CustomerStatus = "Active" | "New" | "Inactive";

// Represents one customer record shown in the customer feature.
export type Customer = {
    id: string;
    name: string;
    phone: string;
    email: string;
    pets: string;
    visits: string;
    status: CustomerStatus;
    lastVisit: string;
};

// Represents the data required to create a customer.
export type CreateCustomerInput = {
    name: string;
    phone: string;
    email: string;
    pets: string;
};

// Represents a customer follow-up task for front-office staff.
export type CustomerTask = {
    id: string;
    title: string;
};
