document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");
    let interval;
  
    function showSlide(n) {
      slides.forEach((slide, i) => {
        slide.style.display = "none";
        dots[i].classList.remove("active");
      });
  
      slides[n].style.display = "block";
      dots[n].classList.add("active");
    }
  
    function nextSlide() {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    }
  
    function startSlideshow() {
      interval = setInterval(nextSlide, 3000);
    }
  
    function stopSlideshow() {
      clearInterval(interval);
    }
  
    // Init
    showSlide(slideIndex);
    startSlideshow();
  
    // Pause on hover
    document.querySelector(".slideshow-container")?.addEventListener("mouseenter", stopSlideshow);
    document.querySelector(".slideshow-container")?.addEventListener("mouseleave", startSlideshow);
  
    // Dot control
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        slideIndex = i;
        showSlide(slideIndex);
      });
    });
  });
  