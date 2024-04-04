<script lang="ts">
  import {bookings} from "$lib/bookings";

  type Booking = {
  garage: string;
  time_period: {
      start_time: Date; 
      end_time: Date; 
  };
  licence_plate: string;
  parking_space: number;
  price: number;
};

let currentBookingPrices = [
  // {name: 1, lastPrice: 0, price: 0},
  // {name: 2, lastPrice: 0, price: 0},
  {name: 3, lastPrice: 0, price: 0},
  // {name: 4, lastPrice: 0, price: 0},
  // {name: 5, lastPrice: 0, price: 0},
  // {name: 6, lastPrice: 0, price: 0},
  // {name: 7, lastPrice: 0, price: 0},
  // {name: 8, lastPrice: 0, price: 0},
  // {name: 9, lastPrice: 0, price: 0},
]
function updateCurrentBookingPrices(bookings: Bookings[]) {
  let bookingsCurrent = bookings.filter(booking =>
      booking.time_period.start_time <= new Date() &&
      booking.time_period.end_time >= new Date()
    );
  return currentBookingPrices.map(currentBookingPrice => {
    let thisBooking = bookingsCurrent.filter(booking => booking.parking_space == currentBookingPrice.name)
    if (thisBooking.length == 0) return currentBookingPrice;
    currentBookingPrice.lastPrice = currentBookingPrice.price;
    currentBookingPrice.price = thisBooking[0].price;
    return currentBookingPrice;
  })
}

bookings.subscribe((bookings) => {currentBookingPrices = updateCurrentBookingPrices(bookings)})

function generateRandomBooking(now) {
    const isCurrent = Math.random() > 0.5;
    const startOffset = (Math.floor(Math.random() * 10) + 1) * 60000;
    const endOffset = startOffset + 6 * 60000; // End time at least 1 minute after start
    return {
      garage: `Garage ${Math.ceil(Math.random() * 10)}`, // Example garage name
      time_period: {
        start_time: new Date(now.getTime()  - 60 * 60000 + startOffset),
      end_time: new Date(now.getTime() + endOffset),
      },
      licence_plate: `ABC${Math.ceil(Math.random() * 999)}`, // Example license plate
      parking_space: 3, // Random parking space from 1 to 10
      price: Math.ceil(Math.random() * 100) + 3, // Random price between 50 and 150
    };
  }

setInterval(() => {
        bookings.set([generateRandomBooking(new Date)]);
        console.log('Bookings updated:', bookings);
        }, 5000);
</script>

<style>
  .price-increased { color: green; }
  .price-decreased { color: red; }
  .price-stagnant { color: grey; }
  table {
    width: 100%; /* Use the full width of the container */
    border-collapse: collapse; /* Removes the gap between borders */
    font-size: 18px; /* Increases the font size for better readability */
  }
  th, td {
    border: 1px solid #ddd; /* Adds border around each cell */
    text-align: left;
    padding: 12px; /* Adds padding inside each cell */
  }
  th {
    background-color: #F2F2F2; /* Light grey background for header */
    color: black;
  }
  tr:nth-child(odd) {
    background-color: #F9F9F9; /* Zebra striping for rows */
  }
  .price-increased { color: green; }
  .price-decreased { color: red; }
  .price-stagnant { color: grey; }
  /* Additional styles for the indicators to increase visibility */
  .price-increased::before {
    content: '↑ ';
  }
  .price-decreased::before {
    content: '↓ ';
  }
  .price-stagnant::before {
    content: '— ';
  }
</style>
<table>
  <thead>
    <tr>
      <th>Parking Spot</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {#each currentBookingPrices as {name, lastPrice, price}}
      <tr>
        <td>Parking space {name}</td>
        <td>
          {price}
          <span class:price-increased={price > lastPrice}
                class:price-decreased={price < lastPrice}
                class:price-stagnant={price === lastPrice}>
          </span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>