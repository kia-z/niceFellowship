document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("my_form");
  const submitBtn = document.getElementById("dynamic_btn");

  if (!form || !submitBtn) return;

  submitBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    // Validation
    const requiredFields = [
      // Add your required field names here
    ];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        alert("Please fill in all required fields.");
        return;
      }
    }

    // Optional: Validate that image was uploaded if required
    const imageUrl = document.getElementById('imageUrl').value; // Fixed: access from DOM, not FormData
    if (!imageUrl) {
      alert('Please upload an image first');
      return;
    }

    // Add imageUrl to formData
    formData.append('imageUrl', imageUrl);

    // Debug: log form data
    for (const [key, value] of formData.entries()) {
      console.log(key, ":", value);
    }

    try {
      console.log("Submitting form…");

      await fetch(
        "https://script.google.com/macros/s/AKfycbwxZhGLqz4gpbLnhz53FCLJzy4K6rhwsuX8QsfY9jsRBb7-dHLq642Ps3mG_woLvC2x1w/exec",
        {
          method: "POST",
          body: formData
        }
      );

      alert("Record added successfully.");
      form.reset();
      
      // Reset image preview
      const imagePreview = document.getElementById('imagePreview');
      if (imagePreview) {
        imagePreview.style.display = 'none';
      }

    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed.");
    }
  });
});