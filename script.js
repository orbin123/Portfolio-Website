//Function for toggling to hambuger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

//Function for  Validation

document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Get error message containers
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  // Validation flags
  let isValid = true;

  // Reset previous errors
  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";
  nameInput.classList.remove("error");
  emailInput.classList.remove("error");
  messageInput.classList.remove("error");

  // Validate name
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name cannot be empty.";
    nameError.style.display = "block";
    nameInput.classList.add("error");
    isValid = false;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email cannot be empty.";
    emailError.style.display = "block";
    emailInput.classList.add("error");
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email.";
    emailError.style.display = "block";
    emailInput.classList.add("error");
    isValid = false;
  }

  // Validate message
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters long.";
    messageError.style.display = "block";
    messageInput.classList.add("error");
    isValid = false;
  }

  // If form is valid, submit or show success (for demonstration purposes)
  if (isValid) {
    // Prepare email content
    const emailContent = `
      <strong>Name:</strong> ${nameInput.value.trim()}<br>
      <strong>Email:</strong> ${emailInput.value.trim()}<br>
      <strong>Message:</strong><br>${messageInput.value.trim()}
    `;

    // Use SMTP.js to send email
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "orbinsunny@gmail.com",
      Password: "E0E06B711EC7DF1E015A96C9294F8A497584", // Replace with your SMTP.js secure token
      To: "orbinsunny@gmail.com", // Replace with your email address
      From: emailInput.value.trim(), // Sender's email
      Subject: "New Enquiry from Portfolio Website",
      Body: emailContent,
    }).then((message) => {
      console.log(message);
      if (message === "OK") {
        alert("Your message has been sent successfully!");
        document.getElementById("enquiryForm").reset(); // Reset the form
      } else {
        alert("Failed to send your message. Please try again later.");
        alert(message);
        document.getElementById("enquiryForm").reset();
      }
    });
  }
});
