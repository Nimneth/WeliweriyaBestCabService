// Wait until the DOM is fully parsed and loaded
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initParticles();
  initHeroParallax();
  initBookingForm();
  initStatsCounter();
  initSwiper();
  initAos();
  initScrollTop();
});

// 1. Preloader Screen Logic
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const progressBar = document.getElementById("loader-progress");
  
  if (!preloader || !progressBar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      progressBar.style.width = `${progress}%`;
      clearInterval(interval);
      
      // Add a slight delay before hiding the preloader
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }, 400);
    } else {
      progressBar.style.width = `${progress}%`;
    }
  }, 50);
}

// 2. Navbar Scrolling Tracking
function initNavbar() {
  const header = document.getElementById("sticky-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-darkbg/95", "shadow-xl", "py-4", "backdrop-blur-md", "border-b", "border-white/5");
      header.classList.remove("py-6");
    } else {
      header.classList.remove("bg-darkbg/95", "shadow-xl", "py-4", "backdrop-blur-md", "border-b", "border-white/5");
      header.classList.add("py-6");
    }
  });
}

// 3. Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    }
  });

  // Close mobile menu on clicking any link
  const links = mobileMenu.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    });
  });

  // Close menu if clicked outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.classList.contains("hidden") && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.add("hidden");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    }
  });
}

// 4. Hero Particles Background (Canvas)
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  const numberOfParticles = 40;

  // Set canvas dimension
  function setCanvasSize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  // Particle Blueprint
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.6 - 0.3 - 0.2; // slight upward drift
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = `rgba(253, 185, 19, ${this.alpha})`; // gold tint
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around screen boundaries
      if (this.y < 0) {
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
      }
      if (this.x < 0 || this.x > canvas.width) {
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#FDB913";
      ctx.fill();
    }
  }

  // Generate particles
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// 5. GSAP Hero Vehicles Parallax & Scroll Animations
function initHeroParallax() {
  if (typeof gsap === "undefined") return;

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Intro reveal animations for vehicles inside hero
  gsap.from("#hero-vehicles img", {
    y: 120,
    opacity: 0,
    duration: 1.6,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.6
  });

  // Scroll parallax effect using GSAP ScrollTrigger
  gsap.to("#hero-vehicles img:nth-child(1)", {
    y: -40,
    scrollTrigger: {
      trigger: "#hero-vehicles",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    }
  });

  gsap.to("#hero-vehicles img:nth-child(2)", {
    y: -80,
    scrollTrigger: {
      trigger: "#hero-vehicles",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2
    }
  });

  gsap.to("#hero-vehicles img:nth-child(3)", {
    y: -120,
    scrollTrigger: {
      trigger: "#hero-vehicles",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });

  gsap.to("#hero-vehicles img:nth-child(4)", {
    y: -70,
    scrollTrigger: {
      trigger: "#hero-vehicles",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.4
    }
  });

  // Interactive mouse move parallax for desktop screen
  const heroSection = document.querySelector("section");
  const vehicles = document.querySelectorAll("#hero-vehicles img");
  
  if (heroSection && window.innerWidth > 1024) {
    heroSection.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const xOffset = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const yOffset = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      // Distribute offset weights among vehicle layers to create visual depth
      gsap.to(vehicles[0], { x: xOffset * 10, y: yOffset * 5, duration: 0.5, ease: "power1.out" });
      gsap.to(vehicles[1], { x: xOffset * 20, y: yOffset * 10, duration: 0.5, ease: "power1.out" });
      gsap.to(vehicles[2], { x: xOffset * 30, y: yOffset * 15, duration: 0.5, ease: "power1.out" });
      gsap.to(vehicles[3], { x: xOffset * 18, y: yOffset * 8, duration: 0.5, ease: "power1.out" });
    });

    // Reset positions when mouse leaves the hero section
    heroSection.addEventListener("mouseleave", () => {
      vehicles.forEach(vehicle => {
        gsap.to(vehicle, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
      });
    });
  }
}

// 6. Booking Form Fields Validation & Redirect Coordination
function initBookingForm() {
  const bookingForm = document.getElementById("booking-form");
  const successModal = document.getElementById("success-modal");
  
  if (!bookingForm) return;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let isValid = true;
    const inputs = bookingForm.querySelectorAll("input[required], select[required]");
    
    inputs.forEach(input => {
      const errorMsg = input.parentElement.nextElementSibling;
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("border-red-500");
        input.classList.remove("border-white/10");
        if (errorMsg && errorMsg.classList.contains("error-msg")) {
          errorMsg.classList.remove("hidden");
        }
      } else {
        input.classList.remove("border-red-500");
        input.classList.add("border-white/10");
        if (errorMsg && errorMsg.classList.contains("error-msg")) {
          errorMsg.classList.add("hidden");
        }
      }
    });

    if (isValid) {
      // Gather inputs
      const pickup = document.getElementById("pickup").value;
      const destination = document.getElementById("destination").value;
      const date = document.getElementById("booking-date").value;
      const time = document.getElementById("booking-time").value;
      const vehicle = document.getElementById("vehicle").value;
      const passengers = document.getElementById("passengers").value;
      const name = document.getElementById("client-name").value;
      const phone = document.getElementById("client-phone").value;

      // Animate Confirmation Modal
      if (successModal) {
        successModal.classList.add("active");
        gsap.to(successModal, { opacity: 1, duration: 0.5, pointerEvents: "auto" });
      }

      // Structure WhatsApp message template
      const message = `*NEW BOOKING REQUEST - Weliweriya Best Cab*
---------------------------------------
*Passenger Name:* ${name}
*Phone Number:* ${phone}
*Pickup Location:* ${pickup}
*Destination Location:* ${destination}
*Pickup Date:* ${date}
*Pickup Time:* ${time}
*Selected Vehicle:* ${vehicle}
*Number of Guests:* ${passengers}
---------------------------------------
Please confirm the booking status and rate estimate.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/94716797832?text=${encodedMessage}`;

      // Open WhatsApp window after 2.5 seconds
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        // Reset form and close modal
        bookingForm.reset();
        if (successModal) {
          gsap.to(successModal, {
            opacity: 0, 
            duration: 0.5, 
            onComplete: () => {
              successModal.classList.remove("active");
              successModal.style.pointerEvents = "none";
            }
          });
        }
      }, 2500);
    }
  });

  // Attach input event listeners to clear error styling
  const formInputs = bookingForm.querySelectorAll("input, select");
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("border-red-500");
      input.classList.add("border-white/10");
      const errorMsg = input.parentElement.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains("error-msg")) {
        errorMsg.classList.add("hidden");
      }
    });
  });
}

// Quick vehicle selector from Fleet Section
window.selectVehicle = function(vehicleName) {
  const vehicleSelect = document.getElementById("vehicle");
  if (vehicleSelect) {
    vehicleSelect.value = vehicleName;
    // Scroll smoothly to booking card
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  }
}

// Quick tour booking function
window.bookTour = function(tourName) {
  const pickup = document.getElementById("pickup");
  const destination = document.getElementById("destination");
  
  if (pickup && destination) {
    pickup.value = "Weliweriya / Client Location";
    destination.value = `Tour Package: ${tourName}`;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  }
}

// 7. Stat Count-Up Animation
function initStatsCounter() {
  if (typeof gsap === "undefined") return;

  const counters = document.querySelectorAll(".stat-counter");
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    
    gsap.fromTo(counter, 
      { textContent: 0 }, 
      {
        textContent: target,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        snap: { textContent: 1 }, // increase in integer increments
        onUpdate: function() {
          if (target === 5000) {
            counter.textContent = Math.floor(counter.textContent) + "+";
          } else if (target === 10) {
            counter.textContent = Math.floor(counter.textContent) + "+";
          } else if (target === 100) {
            counter.textContent = Math.floor(counter.textContent) + "%";
          }
        }
      }
    );
  });
}

// 8. Swiper Testimonials Carousel Config
function initSwiper() {
  if (typeof Swiper === "undefined") return;

  new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
}

// 9. AOS Scroll Animations Setup
function initAos() {
  if (typeof AOS === "undefined") return;
  AOS.init({
    duration: 1000,
    once: true,
    offset: 50,
    easing: "ease-out-cubic"
  });
}

// 10. FAQ Accordion Expanding
window.toggleFaq = function(button) {
  const faqItem = button.parentElement;
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  
  // Close all other FAQ items
  const allFaqItems = document.querySelectorAll(".faq-item");
  allFaqItems.forEach(item => {
    if (item !== faqItem) {
      item.classList.remove("active");
      item.querySelector("button").setAttribute("aria-expanded", "false");
    }
  });

  // Toggle active item
  faqItem.classList.toggle("active");
  button.setAttribute("aria-expanded", !isExpanded);
}

// 11. Custom Lightbox for Masonry Gallery
window.openLightbox = function(element) {
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const clickedImg = element.querySelector("img");

  if (!lightbox || !lightboxImg || !clickedImg) return;

  lightboxImg.src = clickedImg.src;
  lightboxImg.alt = clickedImg.alt;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // disable background scrolling
}

window.closeLightbox = function() {
  const lightbox = document.getElementById("gallery-lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // enable scrolling
}

// 12. Floating WhatsApp Widget Chat Toggle
window.toggleWhatsAppChat = function() {
  const chatWindow = document.getElementById("whatsapp-chat");
  if (!chatWindow) return;

  if (chatWindow.classList.contains("hidden")) {
    chatWindow.classList.remove("hidden");
    setTimeout(() => {
      chatWindow.classList.remove("scale-95", "opacity-0");
      chatWindow.classList.add("scale-100", "opacity-100");
    }, 10);
  } else {
    chatWindow.classList.remove("scale-100", "opacity-100");
    chatWindow.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      chatWindow.classList.add("hidden");
    }, 300);
  }
}

// 13. Scroll to Top Button Action
function initScrollTop() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });
}

window.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
