function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");
  const theme = isDark ? "dark" : "light";
  localStorage.setItem("theme", theme);
  console.log("Theme toggled to:", theme);
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    console.log("Dark theme applied from localStorage");
  } else {
    document.documentElement.classList.remove("dark");
    console.log("Light theme applied");
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const body = {
        name: formData.get("name")?.trim(),
        email: formData.get("email")?.trim(),
        subject: formData.get("subject")?.trim(),
        message: formData.get("message")?.trim()
      };

      try {
        const response = await fetch(`http://localhost:5000/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        const result = await response.json();
        console.log("Server response:", response.status, result);
        
        if (response.ok && result.success) {
          alert("Message sent! Thank you for contacting me.");
          contactForm.reset();
        } else {
          throw new Error(result.error || `Server error: ${response.status}`);
        }
      } catch (error) {
        console.error("Contact form error:", error);
        alert(`Error: ${error.message}`);
      }
    });
  }
});

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = 'auto';
}
