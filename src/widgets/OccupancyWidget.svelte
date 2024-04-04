<script lang="ts">
    import Map from "./shared/Map.svelte";

    type Slots = {
        [key: number]: [number, number, boolean];
    };
    type Booking = {
    garage: string;
    time_period: {
        start_time: Date; // Unix timestamp
        end_time: Date;   // Unix timestamp
    };
    licence_plate: string;
    parking_space: number;
    price: number;
};
function generateRandomBooking(now): Booking {
  const isCurrent = Math.random() > 0.5; // 50% chance the booking is current
  const startOffset = isCurrent ? 0 : (Math.floor(Math.random() * 10) + 1) * 60000; // Start time offset in milliseconds
  const endOffset = startOffset + (Math.floor(Math.random() * 5) + 1) * 60000; // End time at least 1 minute after start

  return {
    garage: `Garage ${Math.ceil(Math.random() * 10)}`, // Example garage name
    time_period: {
      start_time: new Date(now.getTime()  - 10 * 60000/*+ startOffset*/),
      end_time: new Date(now.getTime() + endOffset),
    },
    licence_plate: `ABC${Math.ceil(Math.random() * 999)}`, // Example license plate
    parking_space: Math.ceil(Math.random() * 9), // Random parking space from 1 to 10
    price: Math.ceil(Math.random() * 100) + 3, // Random price between 50 and 150
  };
}

function switchBookings(bookings) {
  const now = new Date();
  for (let i = 0; i < bookings.length; i++) {
    bookings[i] = generateRandomBooking(now);
  }
}
const now = new Date();
// Example initial bookings array
let bookings = [
  generateRandomBooking(new Date()),
  generateRandomBooking(new Date()),
  generateRandomBooking(new Date()),
  {
    "garage": "Athena Garage",
    "time_period": {
        "start_time": new Date(now.getTime() - 5 * 60000),
    "end_time": new Date(now.getTime() + 10 * 60000)
    },
    "licence_plate": "ABC123",
    "parking_space": 1,
    "price": 100
 }
];

// Switch bookings every 5 seconds
setInterval(() => {
  switchBookings(bookings);
  console.log('Bookings updated:', bookings);
}, 10000);

function getCurrentBookings(bookings: Booking[]): Booking[] {
    const currentTime = new Date(); // Get the current time
    let newCurrentBookings = bookings.filter(booking => 
        booking.time_period.start_time <= currentTime && 
        booking.time_period.end_time >= currentTime
    );
    console.log(`current bookings ${newCurrentBookings}`)
    Object.keys(slots).forEach(id => {
        // Check if this slot ID is occupied in current bookings
        const isOccupied = currentBookings.some(booking => booking.parking_space === Number(id));
        // Update only the boolean part of the slot tuple
        slots[id][2] = isOccupied;
    });

    return slots;
}

    let slots: Slots = {
    1: [13, 16, false],
    2: [23, 16, false],
    3: [33, 16, false],
    4: [51, 16, false],
    5: [60, 10.5, false],
    6: [60, 15.5, false], //
    7: [60, 33.5, false],
    8: [51, 30, false],
    9: [51, 36, false],

    }

    let tileSize = 100;

    function updateTileSize(event: CustomEvent<number>) {
        console.log("Tile size updated")
        tileSize = event.detail;
        slots = { ...slots };
    }

    function handleBookingsChange(newBookings) {
    bookings = newBookings;
    slots = updateSlotsBasedOnBookings(bookings, slots);
    console.log("Bookings updated:", bookings);
    console.log("Slots updated:", slots);
}

</script>
<div class="widget">
    <Map on:send-data={updateTileSize}/>
    <svg>

    {#each Object.entries(slots) as [slotId, [x, y, occupancy]]}
        <rect
            x={(x / 10) * tileSize} y={(y / 10) * tileSize} width={tileSize / 2.5} height={tileSize / 2.5}
            fill={occupancy ? "red" : "green"} opacity={0.6}
            transform="rotate(90, {(x / 10) * tileSize}, {(y / 10) * tileSize})"
        />
    {/each}
    </svg>
</div>

<style>
    @import './WidgetStyles.css';

   .widget {
    position: relative;
  }
  .widget svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>