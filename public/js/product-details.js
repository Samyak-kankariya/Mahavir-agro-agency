document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
  
    const products = {
        urea: {
            name: "Urea",
            description: "Urea is a widely used nitrogen fertilizer...",
            image: "assets/images/UREA_0.png",
            gallery: [
              "assets/images/UREA_0.png",
              "assets/images/UREA_1.png",
              "assets/images/UREA_2.png"
            ],
            content: "Nitrogen (46%)",
            instructions: "Apply before irrigation...",
            price: 950,
            rating: 4.5,
            reviews: [
              { name: "Ravi", rating: 5, text: "Great fertilizer, increased my yield." },
              { name: "Sunita", rating: 4, text: "Good results but price is slightly high." }
            ]
          },
          
      dap: {
        name: "Di-Ammonium Phosphate (DAP)",
        description: "Balanced fertilizer with nitrogen and phosphorus.",
        image: "assets/images/DAP-18-46-0.jpg",
        content: "N (18%), P (46%)",
        instructions: "Apply during sowing. Avoid mixing directly with urea.",
        price: 1100,
        rating: "4.7"
      },
      mop: {
        name: "Muriate of Potash (MOP)",
        description: "MOP improves the quality of fruits and vegetables by enhancing potassium levels.",
        image: "assets/images/bharat_mop.jpg",
        content: "Potassium (60%)",
        instructions: "Best used during flowering and fruiting stages.",
        price: 1050,
        rating: "4.4"
      }
    };
  
    const product = products[productId];

    const mainImage = document.getElementById("main-image");
    const thumbnails = document.getElementById("thumbnails");
    const stars = document.getElementById("product-rating-stars");
    const reviewList = document.getElementById("review-list");
  
    let currentImageIndex = 0;
  
    if (product) {
      // 🖼️ Image gallery
      mainImage.src = product.gallery[0];
  
      thumbnails.innerHTML = product.gallery.map((img, index) => `
        <img src="${img}" data-index="${index}" class="thumbnail" alt="Product image ${index+1}" />
      `).join("");
  
      thumbnails.querySelectorAll(".thumbnail").forEach(th => {
        th.addEventListener("click", () => {
          currentImageIndex = parseInt(th.dataset.index);
          mainImage.src = product.gallery[currentImageIndex];
        });
      });
  
      document.getElementById("prev-btn").addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + product.gallery.length) % product.gallery.length;
        mainImage.src = product.gallery[currentImageIndex];
      });
  
      document.getElementById("next-btn").addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % product.gallery.length;
        mainImage.src = product.gallery[currentImageIndex];
      });
  
      // 🌟 Rating stars
      stars.innerHTML = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));
  
      // 🧑 Reviews
      reviewList.innerHTML = product.reviews.map(r => `
        <div class="review">
          <strong>${r.name}</strong> <span class="stars"> ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
          <p>${r.text}</p>
        </div>
      `).join("");
    } else {
      document.getElementById("product-detail").innerHTML = "<p>Product not found.</p>";
    }
  });
  
    if (product) {
      document.getElementById("product-image").src = product.image;
      document.getElementById("product-image").alt = product.name;
      document.getElementById("product-name").textContent = product.name;
      document.getElementById("product-description").textContent = product.description;
      document.getElementById("product-content").textContent = product.content;
      document.getElementById("product-instructions").textContent = product.instructions;
      document.getElementById("product-price").textContent = product.price;
      document.getElementById("product-rating").textContent = product.rating;
    } else {
      document.getElementById("product-detail").innerHTML = "<p>Product not found.</p>";
    }
  