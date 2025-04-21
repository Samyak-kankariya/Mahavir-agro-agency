document.addEventListener("DOMContentLoaded", function () {
  const preview = document.getElementById("preview");
  const overlay = document.getElementById("preview-overlay");
  const closeBtn = document.getElementById("preview-close");

  const isMobile = window.innerWidth <= 768;
  let hoverTimeout; // ⏳ Used to delay closing on desktop to prevent flickering

  /**
   * 🧠 Function to open preview with selected card's details
   */
  function openPreview(card) {
    // Populate preview with card data
    document.getElementById("preview-img").src = card.dataset.image;
    document.getElementById("preview-name").textContent = card.dataset.name;
    document.getElementById("preview-description").textContent = card.dataset.description;
    document.getElementById("preview-content").textContent = card.dataset.content;
    document.getElementById("preview-price").textContent = card.dataset.price;

    // Show overlay and preview
    overlay.classList.add("active");
    preview.classList.add("active");

    // Prevent background scroll when preview is open
    document.body.style.overflow = "hidden";
  }

  /**
   * 🚪 Function to close the preview
   */
  function closePreview() {
    overlay.classList.remove("active");
    preview.classList.remove("active");

    // Re-enable background scrolling
    document.body.style.overflow = "";
  }

  /**
   * 🔁 Setup for each product card
   */
  document.querySelectorAll(".product-card").forEach(card => {
    if (isMobile) {
      // 📱 Mobile devices: tap to open preview
      card.addEventListener("click", () => openPreview(card));
    } else {
      // 🖱️ Desktop: hover to open preview
      card.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimeout); // Cancel pending close
        openPreview(card);
      });

      // 🐭 When mouse leaves card, wait briefly before closing
      card.addEventListener("mouseleave", () => {
        hoverTimeout = setTimeout(() => {
          // Only close if mouse isn't on the preview anymore
          if (!preview.matches(":hover")) {
            closePreview();
          }
        }, 300); // 300ms delay = natural feel
      });

      // 🔒 Keep preview open if mouse enters it
      preview.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimeout); // Cancel close timeout
      });

      // 🚫 Close preview when mouse leaves the preview area
      preview.addEventListener("mouseleave", () => {
        closePreview();
      });
    }
  });

  /**
   * ❌ Close logic on overlay click or close button
   */
  closeBtn.addEventListener("click", closePreview);

  // Ensure only background click (not preview) closes the overlay
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closePreview();
    }
  });
});
