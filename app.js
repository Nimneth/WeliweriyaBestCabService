// AOS Initialization
AOS.init({
  once: true,
  offset: 50,
  duration: 800,
  easing: 'ease-out-cubic',
});

// Preloader & Hero Animation
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const progress = document.getElementById('loader-progress');
  
  progress.style.width = '100%';
  
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      
      // Hero entrance animations
      const tl = gsap.timeline();
      tl.from(".hero-gradient-overlay", { duration: 1.5, opacity: 0, ease: "power2.inOut" })
        .from(".glow-effect", { duration: 2, scale: 0, opacity: 0, stagger: 0.2, ease: "back.out(1.7)" }, "-=1");
        
    }, 500);
  }, 1000);
});

// Sticky Header & Scroll Top Button
const header = document.getElementById('sticky-header');
const scrollTopBtn = document.getElementById('scrollTopBtn');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('bg-black/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-white/5', 'py-4');
    header.classList.remove('py-6');
  } else {
    header.classList.remove('bg-black/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-white/5', 'py-4');
    header.classList.add('py-6');
  }

  // Scroll to Top Button Visibility
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = menuToggle.querySelector('i');
  if (mobileMenu.classList.contains('hidden')) {
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  } else {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  }
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuToggle.querySelector('i').classList.remove('fa-xmark');
    menuToggle.querySelector('i').classList.add('fa-bars');
  });
});

// Booking Form Logic
const bookingForm = document.getElementById('booking-form');
const successModal = document.getElementById('success-modal');

if(bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.error-msg').forEach(msg => msg.classList.add('hidden'));
    document.querySelectorAll('input, select').forEach(input => input.classList.remove('border-red-500'));

    let isValid = true;
    const fields = ['pickup', 'dropoff', 'pickup-date', 'dropoff-date', 'vehicle', 'quantity', 'client-name', 'client-phone'];
    const data = {};

    fields.forEach(field => {
      const el = document.getElementById(field);
      if (!el.value) {
        isValid = false;
        el.classList.add('border-red-500');
        el.nextElementSibling.classList.remove('hidden');
        // Handle select dropdown icon issue slightly differently
        if(el.tagName === 'SELECT') {
           el.parentElement.nextElementSibling.classList.remove('hidden');
        }
      } else {
        data[field] = el.value;
      }
    });

    if (isValid) {
      // Show success modal
      successModal.classList.remove('opacity-0', 'pointer-events-none');
      
      const message = `Hello Tuk Tuk Rental! 🛺

I would like to make a rental reservation:

*Vehicle:* ${data.vehicle}
*Quantity:* ${data.quantity}
*Pickup Location:* ${data.pickup}
*Dropoff Location:* ${data.dropoff}
*Pickup Date:* ${data['pickup-date']}
*Dropoff Date:* ${data['dropoff-date']}

*Name:* ${data['client-name']}
*Phone:* ${data['client-phone']}

Please confirm availability and rates.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/94716797832?text=${encodedMessage}`;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        successModal.classList.add('opacity-0', 'pointer-events-none');
        bookingForm.reset();
      }, 2500);
    }
  });
}

function selectVehicle(vehicleName) {
  const select = document.getElementById('vehicle');
  if(select) {
    select.value = vehicleName;
    // Scroll to form smoothly
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  }
}

// Swiper Testimonials
const testimonialsSwiper = new Swiper('.testimonials-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});

// FAQ Accordion
function toggleFaq(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.faq-icon');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  // Close all others
  document.querySelectorAll('.faq-content').forEach(el => {
    el.style.maxHeight = null;
    el.previousElementSibling.setAttribute('aria-expanded', 'false');
    el.previousElementSibling.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
  });

  if (!isExpanded) {
    button.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + "px";
    icon.style.transform = 'rotate(180deg)';
  }
}

// Lightbox
function openLightbox(img) {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  lightboxImg.src = img.src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// WhatsApp Widget Toggle
function toggleWhatsAppChat() {
  const chat = document.getElementById('whatsapp-chat');
  if (chat.classList.contains('hidden')) {
    chat.classList.remove('hidden');
    // slight delay for animation
    setTimeout(() => {
      chat.classList.remove('scale-95', 'opacity-0');
      chat.classList.add('scale-100', 'opacity-100');
    }, 10);
  } else {
    chat.classList.remove('scale-100', 'opacity-100');
    chat.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      chat.classList.add('hidden');
    }, 300);
  }
}

// Stats Counter Animation
const counters = document.querySelectorAll('.stat-counter');
const speed = 200;

const startCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// ScrollTrigger for stats
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".stat-counter",
  start: "top 85%",
  once: true,
  onEnter: startCounters
});

// Setup continuous scroll gallery
document.addEventListener("DOMContentLoaded", () => {
  const galleryTrack = document.querySelector(".gallery-track");
  if(galleryTrack) {
    // Clone elements to make smooth endless scroll
    const items = Array.from(galleryTrack.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      galleryTrack.appendChild(clone);
    });
  }
});
