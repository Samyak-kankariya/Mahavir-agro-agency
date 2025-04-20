document.addEventListener("DOMContentLoaded", function () {
    console.log("enquiry.js loaded");
    const form = document.getElementById("contactPageForm");
  
    if (form) {
        console.log("contact form found");
        form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevents normal submission
        console.log("form submitted");
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
  
        try {
          const baseURL = window.location.hostname.includes("localhost")
          ? "http://localhost:5000/submit-enquiry"
          : "https://mahavir-agro-agency.onrender.com/submit-enquiry"; // ← Replace with actual backend URL
        
        const res = await fetch(`${baseURL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
          });
  
          const data = await res.json();
  
          if (res.ok) {
            form.reset();
            window.location.href = "thankyou.html";
          } else {
            alert(data.error || "Something went wrong.");
          }
        } catch (err) {
          alert("Could not submit form. Try again later.");
        }
      });
    }
  });
  