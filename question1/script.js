const products = [
    { name: "Wireless Headphones", price: "₹7,999", description: "Noise-cancelling over-ear headphones.", image: "https://imgs.search.brave.com/O3oGoQO138xEavYyA5j4KmIT7FkhjyAR2Eu1itRP5eQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vVkVB/VDAwTC1XaXJlbGVz/cy1FYXJidWRzLUJs/dWV0b290aC1IZWFk/cGhvbmUtU3BvcnQt/Qmx1ZXRvb3RoLTUt/NC1FYXJidWQtNzJI/cnMtRWFycGhvbmUt/RWFyaG9vay1Ob2lz/ZS1DYW5jZWxsaW5n/LU1pYy1JUDctV2F0/ZXJwcm9vZi1IZWFk/c2V0LVdvcmtvdXQt/UnVfM2Y5YTRkMzgt/NTZiZC00NWNjLWIw/OTctZDJmNTZiYzI5/NGU1LjYxMzcyYTdj/M2U2ZTg1MGMwMTkw/ZDIxYjY3Y2M3NmRl/LmpwZWc_b2RuSGVp/Z2h0PTU4MCZvZG5X/aWR0aD01ODAmb2Ru/Qmc9RkZGRkZG" },
    { name: "Smartwatch", price: "₹12,999", description: "Fitness tracking smartwatch.", image: "https://imgs.search.brave.com/xIL12xs3CrLueGTLlNYvAKRCy85DoGuZOSXOlKqxwYc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGhld2lyZWN1dHRl/ci5jb20vd3AtY29u/dGVudC9tZWRpYS8y/MDI0LzExL0JFU1Qt/V0lSRUxFU1MtTU9V/U0UtMjA0OHB4LTU0/NTIuanBnP2F1dG89/d2VicCZxdWFsaXR5/PTc1JndpZHRoPTEw/MjQ" },
    { name: "Gaming Mouse", price: "₹2,499", description: "Ergonomic gaming mouse.", image: "https://imgs.search.brave.com/DemdX5Zwj_i1SMY7MWWB29TiGUgWM3THVPpaKgtGq_g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTF5U3U1NUp6QUwu/anBn" },
    { name: "Laptop Stand", price: "₹1,999", description: "Adjustable aluminium stand.", image: "https://imgs.search.brave.com/44FwnLTEojitOnP4zCYPD1s2q9i0gIw30H49jsZa7DI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9uZXhz/dGFuZC5pby9jZG4v/c2hvcC9maWxlcy9N/YWluaW1hZ2VORVhT/VEFOREsyXzEuanBn/P3Y9MTY4OTc1Njkx/MSZ3aWR0aD01MzM" },
    { name: "Bluetooth Speaker", price: "₹3,999", description: "Portable Bluetooth speaker.", image: "https://imgs.search.brave.com/MjMzA0i1BThFb-v56bVNEVGJqpeY9aEbhUQsdXdfTo4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEyLzcwLzk4Lzgw/LzM2MF9GXzEyNzA5/ODgwNThfQVN5enV3/TzNRckdsdlZHeElP/eUd0cHJiQWRTZ2lP/N0MuanBn" },
    { name: "Tablet", price: "₹18,499", description: "10-inch display tablet.", image: "https://imgs.search.brave.com/uYx1ZXIOdgtPgNexxwgH_C3-3_OLObTai8eLr_YVqB0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZWxlY3Ryb25p/Y2V4cHJlc3MuY29t/L3Byb2R1Y3QuYy54/bC8yMDk3ODkuanBn" },
    { name: "Webcam", price: "₹1,499", description: "HD 1080p USB webcam.", image: "https://imgs.search.brave.com/JUEYiC3FIkuqbEkjZsql8m_t85EEc8caU3-v5LQX218/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jMS5u/ZXdlZ2dpbWFnZXMu/Y29tL3Byb2R1Y3Rp/bWFnZS9uYjMwMC9B/RDFORDIwMDUxNFM0/MkQ2LmpwZw" },
    { name: "External SSD", price: "₹6,999", description: "Fast external SSD (500GB).", image: "https://imgs.search.brave.com/Iy4JNXCzj8J14HIf5N6OEhWJLYpJmzBNTF-NfUsTBCA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzEzWE15Z0ZjSkwu/X0FDLl9TUjE4MCwy/MzAuanBn" },
    { name: "Wireless Charger", price: "₹2,299", description: "Qi wireless charging pad.", image: "https://imgs.search.brave.com/qX9Z8aKgxt_Y_tNlxVBzcfsk3VNY4QLdZmt-eifhMFY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS53aXJlZC5jb20v/cGhvdG9zLzYxMDgz/YjQ3YWI2MWVhMzY5/YWY3NTE5Mi80OjMv/d18zMjAsY19saW1p/dC9nZWFyX2NoYXJn/ZXJzX2Vpbm92YS5q/cGc" },
    { name: "USB Hub", price: "₹899", description: "Multi-port USB hub.", image: "https://imgs.search.brave.com/rB0Jt8-q1Z9reGQd5tVhAxSGqIqUI-1j4MXIPBbNN2Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEyLzIwLzIxLzc2/LzM2MF9GXzEyMjAy/MTc2NjZfZXlNRjZm/N2hzbGlBZWdjd0dm/SFptUDEyQjY3M3Na/bXEuanBn" },

    { name: "Monitor", price: "₹9,999", description: "24-inch full HD monitor.", image: "https://imgs.search.brave.com/fvNFxNt7LmvAP6VULRj8tNzutwzaIat7iq4rogw4tAA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mbGF0LXNjcmVl/bi1tb25pdG9yLWlz/b2xhdGVkXzcxOTM4/NS0xNjUwLmpwZz9z/ZW10PWFpc19oeWJy/aWQ" }
  ];
  
  const itemsPerPage = 10;
  let currentPage = 1;
  
  function renderTable() {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";
  
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
  
    const pageItems = products.slice(start, end);
  
    pageItems.forEach(product => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td data-label="Image"><img src="${product.image}" alt="${product.name}" /></td>
        <td data-label="Product Name">${product.name}</td>
        <td data-label="Price">${product.price}</td>
        <td data-label="Description">${product.description}</td>
      `;
      tbody.appendChild(row);
    });
  
    const pageIndicator = document.getElementById("pageIndicator");
    const totalPages = Math.ceil(products.length / itemsPerPage);
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  }
  
  function nextPage() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  }
  
  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  }
  
  renderTable();
  