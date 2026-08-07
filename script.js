// =======================================
// LOADER
// =======================================

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1200);
});

// =======================================
// TYPING ANIMATION
// =======================================

const words = [
    "Cybersecurity Enthusiast",
    "Full Stack Developer",
    "Ethical Hacker",
    "AI Developer",
    "Computer Engineering Student"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    const current = words[wordIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, letterIndex++);

        if (letterIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typing.textContent = current.substring(0, letterIndex--);

        if (letterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length)
                wordIndex = 0;

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();


// =======================================
// MOBILE MENU
// =======================================

const menuBtn = document.querySelector(".menu-btn");

const navbar = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


// =======================================
// STICKY HEADER
// =======================================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 80) {

        header.style.background = "#08111f";

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(5,8,22,.75)";

        header.style.boxShadow = "none";

    }

});


// =======================================
// ACTIVE NAVIGATION
// =======================================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") == "#" + current) {

            link.classList.add("active");

        }

    });

});


// =======================================
// SCROLL REVEAL
// =======================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(
".about,.skill,.project-card,.certificate-card,.timeline-item,.contact-form"
).forEach(el => {

    observer.observe(el);

});


// =======================================
// SMOOTH SCROLL
// =======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});


// =======================================
// SCROLL TO TOP BUTTON
// =======================================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.className = "top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};



// ======================
// EmailJS Contact Form
// ======================

emailjs.init("vT6lCTujYvXAi3RID");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_puiu2f5",
        "template_9ctllbk",
        this
    )
    .then(() => {
        alert("✅ Message Sent Successfully!");
        contactForm.reset();
    })
    .catch((error) => {
        alert("❌ Message Failed!");
        console.error(error);
    });
});