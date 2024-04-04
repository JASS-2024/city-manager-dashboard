<script>
    // Mock data with an initial price and a field to store the last price for comparison
    let parkingSpots = [
      { id: 1, name: 'Spot A', price: 10, lastPrice: 10 },
      { id: 2, name: 'Spot B', price: 15, lastPrice: 15 },
      { id: 3, name: 'Spot C', price: 20, lastPrice: 20 },
    ];
  
    // Function to simulate price updates
    function updatePrices() {
      parkingSpots = parkingSpots.map(spot => {
        const oldPrice = spot.price;
        // Randomly increase, decrease, or keep the price the same for demonstration
        const newPrice = oldPrice + (Math.round(Math.random() * 5) - 2); // Changes by -2 to +2
        return { ...spot, lastPrice: oldPrice, price: Math.max(1, newPrice) }; // Ensure price doesn't go below 1
      });
    }
  
    // Simulate price updates every 5 seconds
    setInterval(updatePrices, 5000);
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
      background-color: #f2f2f2; /* Light grey background for header */
      color: black;
    }
  
    tr:nth-child(odd) {
      background-color: #f9f9f9; /* Zebra striping for rows */
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
      {#each parkingSpots as { id, name, price, lastPrice }}
        <tr>
          <td>{name}</td>
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
  

  