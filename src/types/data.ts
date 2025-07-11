// https://jsonplaceholder.typicode.com/ will fetchig the data frommthis Api for the explore screen

export interface Post {
    // userId: number;
    id: number;
    title: string;
    body?: string;
    imageUrl?: string; // Optional field for image URL
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}