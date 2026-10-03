/* ================================
   MOBILE MENU
================================ */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


/* ================================
   FAQ ACCORDION
================================ */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const currentItem = question.parentElement;

        const answer = currentItem.querySelector(".faq-answer");


        /* Close other FAQ items */

        document.querySelectorAll(".faq-item").forEach(function (item) {

            if (item !== currentItem) {

                item.classList.remove("active");

                item.querySelector(".faq-answer").style.maxHeight = null;

            }

        });


        /* Open / close current FAQ */

        currentItem.classList.toggle("active");


        if (currentItem.classList.contains("active")) {

            answer.style.maxHeight = answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});


/* ================================
   WHATSAPP BOOKING
================================ */

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;
    const sessionType = document.getElementById("sessionType").value;
    const focus = document.getElementById("focus").value;


    const message =
        "Hello, I would like to book a counselling session.%0A%0A" +

        "Name: " + encodeURIComponent(name) + "%0A" +

        "Email: " + encodeURIComponent(email) + "%0A" +

        "Date: " + encodeURIComponent(date) + "%0A" +

        "Time: " + encodeURIComponent(time) + "%0A" +

        "Session Type: " + encodeURIComponent(sessionType) + "%0A" +

        "Focus: " + encodeURIComponent(focus || "Not specified");


    const whatsappNumber = "923337048997";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber + "?text=" + message;


    window.open(whatsappURL, "_blank");

});

/* ================================
   CLIENT REVIEW
================================ */

const reviewForm = document.querySelector(".review-form");

if (reviewForm) {

    reviewForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton = reviewForm.querySelector(".submit-button");

        submitButton.disabled = true;
        submitButton.innerHTML = "Submitting...";

        const formData = new FormData(reviewForm);

        try {

            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {

                reviewForm.innerHTML = `
                    <div class="review-success">
                        <div class="review-success-icon">✓</div>

                        <h3>Thank you!</h3>

                        <p>
                            Your review has been submitted successfully.
                            Thank you for sharing your experience.
                        </p>
                    </div>
                `;

            } else {

                submitButton.disabled = false;
                submitButton.innerHTML = "Submit Review →";

                alert("Something went wrong. Please try again.");

            }

        } catch (error) {

            submitButton.disabled = false;
            submitButton.innerHTML = "Submit Review →";

            alert("Something went wrong. Please try again.");

        }

    });

}
