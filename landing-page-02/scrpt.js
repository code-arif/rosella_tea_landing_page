// Product Card Flip
let isFlipped = false;

function flipCard() {
  const card = document.getElementById("productCard");
  isFlipped = !isFlipped;
  if (isFlipped) {
    card.classList.add("flipped");
  } else {
    card.classList.remove("flipped");
  }
}

// Product Rotation
const products = [
  {
    front: {
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
      title: "প্রিমিয়াম হিবিস্কাস টি",
      subtitle: "১০০% অর্গানিক ও প্রাকৃতিক",
    },
    back: {
      benefits: [
        "রক্তচাপ নিয়ন্ত্রণ করে",
        "ওজন কমাতে সাহায্য করে",
        "হজম শক্তি বৃদ্ধি করে",
        "অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ",
        "রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
      ],
    },
  },
  {
    front: {
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
      title: "স্পেশাল রোজেলা টি",
      subtitle: "বিশেষ ভেষজ উপাদান যুক্ত",
    },
    back: {
      benefits: [
        "ডায়াবেটিস নিয়ন্ত্রণে সাহায্য করে",
        "কোলেস্টেরল কমায়",
        "লিভার সুস্থ রাখে",
        "ত্বকের সৌন্দর্য বাড়ায়",
        "এনার্জি বাড়ায়",
      ],
    },
  },
];

let currentProductIndex = 0;
let autoRotateInterval = null;

function updateProductDisplay() {
  const product = products[currentProductIndex];
  const productCard = document.getElementById("productCard");

  if (!productCard) return;

  // Reset flip state
  isFlipped = false;
  productCard.style.transform = "rotateY(0deg)";

  // Update front side
  const front = productCard.querySelector(".product-front");
  if (front) {
    const img = front.querySelector(".product-image");
    const title = front.querySelector(".product-title");
    const subtitle = front.querySelector(".product-subtitle");
    const flipBtn = front.querySelector(".flip-btn");

    if (img) img.src = product.front.image;
    if (title) title.textContent = product.front.title;
    if (subtitle) subtitle.textContent = product.front.subtitle;

    // Reattach event listener for front flip button
    if (flipBtn) {
      flipBtn.onclick = function (e) {
        e.preventDefault();
        flipProduct();
      };
    }
  }

  // Update back side
  const back = productCard.querySelector(".product-back");
  if (back) {
    const benefitsList = back.querySelector(".benefits-list");
    const flipBtn = back.querySelector(".flip-btn");

    if (benefitsList) {
      benefitsList.innerHTML = "";
      product.back.benefits.forEach((benefit) => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${benefit}`;
        benefitsList.appendChild(li);
      });
    }

    // Reattach event listener for back flip button
    if (flipBtn) {
      flipBtn.onclick = function (e) {
        e.preventDefault();
        flipProduct();
      };
    }
  }

  console.log(`Product updated to index: ${currentProductIndex}`);
}

function showNextProduct() {
  currentProductIndex = (currentProductIndex + 1) % products.length;
  updateProductDisplay();
}

function showPrevProduct() {
  currentProductIndex =
    (currentProductIndex - 1 + products.length) % products.length;
  updateProductDisplay();
}

function startAutoRotate() {
  stopAutoRotate();
  autoRotateInterval = setInterval(showNextProduct, 8000);
  console.log("Auto rotate started");
}

function stopAutoRotate() {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
    console.log("Auto rotate stopped");
  }
}

// Better event delegation approach
function setupFlipButtons() {
  // Event delegation for flip buttons
  document.addEventListener("click", function (e) {
    if (e.target.closest(".flip-btn")) {
      e.preventDefault();
      console.log("Flip button clicked via delegation");
      flipProduct();
    }

    // Next/Prev buttons
    if (e.target.closest(".control-btn")) {
      e.preventDefault();
      const btn = e.target.closest(".control-btn");
      if (btn.querySelector(".fa-chevron-left")) {
        showNextProduct();
      } else if (btn.querySelector(".fa-chevron-right")) {
        showPrevProduct();
      }
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded");

  updateProductDisplay();
  startAutoRotate();
  setupFlipButtons();

  // Pause auto rotation on hover
  const showcaseContainer = document.querySelector(".showcase-container");
  if (showcaseContainer) {
    showcaseContainer.addEventListener("mouseenter", function () {
      console.log("Mouse entered showcase");
      stopAutoRotate();
    });

    showcaseContainer.addEventListener("mouseleave", function () {
      console.log("Mouse left showcase");
      startAutoRotate();
    });
  }

  // Add manual event listeners as backup
  setTimeout(function () {
    const flipButtons = document.querySelectorAll(".flip-btn");
    console.log(`Found ${flipButtons.length} flip buttons`);

    flipButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Flip button clicked directly");
        flipProduct();
      });
    });
  }, 1000);
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Animation for About Section
window.addEventListener("scroll", () => {
  const aboutContent = document.querySelector(".about-content");
  const scrollTopBtn = document.getElementById("scrollTop");

  if (
    aboutContent &&
    aboutContent.getBoundingClientRect().top < window.innerHeight - 100
  ) {
    aboutContent.classList.add("fade-in");
  }

  if (scrollTopBtn) {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Form Submission
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const spinner = document.querySelector(".spinner");
    const successMessage = document.getElementById("successMessage");

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      package: document.getElementById("package").value,
      quantity: document.getElementById("quantity").value,
      timestamp: new Date().toLocaleString("bn-BD"),
    };

    // Validate phone number
    const phonePattern = /^01[3-9]\d{8}$/;
    if (!phonePattern.test(formData.phone)) {
      alert("দয়া করে সঠিক মোবাইল নম্বর দিন (11 ডিজিট, 01 দিয়ে শুরু)");
      return;
    }

    // Show loading
    submitBtn.disabled = true;
    if (spinner) spinner.style.display = "inline-block";

    // Simulate API call
    setTimeout(() => {
      // Hide loading
      if (spinner) spinner.style.display = "none";
      submitBtn.disabled = false;

      // Show success message
      if (successMessage) {
        successMessage.style.display = "block";

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);
      }

      // Reset form
      orderForm.reset();

      // Log data to console (for testing)
      console.log("Order Data:", formData);

      // Optional: Show thank you alert
      alert(
        "ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
      );
    }, 2000);

    // For actual Google Sheets integration:

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxP4kVyg7cJHD-whSGawWw9uTSK8VBCyQtFOfPEy-pmJxxXmEirUgm8p8MzncstNL-IUw/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      spinner.style.display = "none";
      submitBtn.disabled = false;
      successMessage.style.display = "block";
      orderForm.reset();

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      spinner.style.display = "none";
      submitBtn.disabled = false;
      alert("অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  });
}

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background =
        "linear-gradient(135deg, #2d5016 0%, #48a14d 100%)";
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      navbar.style.background =
        "linear-gradient(135deg, #2d5016 0%, #48a14d 100%)";
      navbar.style.boxShadow = "none";
    }
  }
});

// Counter Animation for Stats (Optional - if you want to add later)
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / 200;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 10);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Initialize counters when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
});

// Observe stats section if exists
const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  observer.observe(statsSection);
}
