import { writable } from 'svelte/store';
import { subscribe } from './mqtt';

export const bookings = writable([]);

export type Booking = {
    "garage": string,
    "time_period": {
        "start_time": typeof Date,
        "end_time": typeof Date
    },
    "licence_plate": string,
    "parking_space": number,
    "price": number
}

type ServerBooking = {
    "garage": string,
    "time_period": {
        "start_time": number,
        "end_time": number
    },
    "licence_plate": string,
    "parking_space": number,
    "price": number 
}

export const getBookings = async () => {
    const response = await fetch('/api/bookings');
    const result = await response.json()
    bookings.set(result["bookings"].map((booking: ServerBooking) => ({
        "garage": booking["garage"],
        "time_period": {
            "start_time": new Date(booking["time_period"]["start_time"] * 1000),
            "end_time": new Date(booking["time_period"]["end_time"] * 1000)
        },
        "licence_plate": booking["licence_plate"],
        "parking_space": booking["parking_space"],
        "price": booking["price"]
    })
    ))
};