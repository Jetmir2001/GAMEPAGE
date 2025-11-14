 // ===============================
// GAMEHUB STORE JS (Enhanced)
// Tailwind + DaisyUI compatible
// ===============================

// -------------------------------
// 1. MOBILE MENU TOGGLE
// -------------------------------
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
}

// -------------------------------
// 2. MODAL CONTROL (Cart Added)
// -------------------------------
const cartModal = document.getElementById("cartModal");

function openModal() {
  if (cartModal) cartModal.showModal();
}

function closeModal() {
  if (cartModal) cartModal.close();
}

// -------------------------------
// 3. ADD TO CART
// -------------------------------
function addToCart(name, price, image, category, stock) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    if (existing.quantity < stock) {
      existing.quantity++;
    } else {
      alert("❗ No more stock available for this game.");
      return;
    }
  } else {
    if (stock > 0) {
      cart.push({ name, price, image, category, quantity: 1, stock });
    } else {
      alert("⚠️ This game is currently out of stock.");
      return;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  openModal();
}

// -------------------------------
// 4. VIEW CART
// -------------------------------
function viewCart() {
  window.location.href = "cart.html";
}

// -------------------------------
// 5. VIEW GAME DETAILS
// -------------------------------
function viewDetails(name, category, image, price, description, trailer) {
  const game = { name, category, image, price, description, trailer };
  localStorage.setItem("selectedGame", JSON.stringify(game));
  window.location.href = "details.html";
}

// -------------------------------
// 6. FILTER GAMES
// -------------------------------
function filterGames() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categorySelect").value;
  const cards = document.querySelectorAll(".game-card");

  cards.forEach((card) => {
    const title = card.querySelector("h2, h4").innerText.toLowerCase();
    const cardCategory = card.dataset.category?.toLowerCase();
    const matchesSearch = title.includes(query);
    const matchesCategory = category === "all" || category === cardCategory;

    card.style.display = matchesSearch && matchesCategory ? "" : "none";
  });
}

// -------------------------------
// 7. LOGIN GREETING / LOGOUT
// -------------------------------
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (user) {
  const greeting = document.getElementById("userGreeting");
  if (greeting) greeting.textContent = `👋 Welcome, ${user.username}`;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "auth.html";
}

// -------------------------------
// 8. WISHLIST TOGGLE
// -------------------------------
function toggleWishlist(icon, name, image) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const index = wishlist.findIndex((item) => item.name === name);

  if (index === -1) {
    wishlist.push({ name, image });
    icon.textContent = "❤️";
    icon.classList.add("scale-110", "transition-transform");
  } else {
    wishlist.splice(index, 1);
    icon.textContent = "🤍";
    icon.classList.remove("scale-110");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// -------------------------------
// 9. FLASH SALE TIMER
// -------------------------------
const endTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours
const timerElement = document.getElementById("timer");

function updateFlashTimer() {
  if (!timerElement) return;

  const now = new Date().getTime();
  const distance = endTime - now;

  if (distance < 0) {
    timerElement.textContent = "Sale Ended";
    return;
  }

  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
  requestAnimationFrame(updateFlashTimer);
}
updateFlashTimer();

// -------------------------------
// 10. DAILY DEAL COUNTDOWN
// -------------------------------
function startDailyDealCountdown() {
  const dealTimer = document.getElementById("deal-timer");
  if (!dealTimer) return;

  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = midnight - now;

    if (distance <= 0) {
      dealTimer.textContent = "Deal Expired";
      return;
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    dealTimer.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
startDailyDealCountdown();

// -------------------------------
// 11. BUNDLE ADD FEATURE
// -------------------------------
document.querySelectorAll(".add-bundle").forEach((btn) => {
  btn.addEventListener("click", () => {
    let games = JSON.parse(btn.getAttribute("data-games"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    games.forEach((game) => {
      cart.push({ name: game, price: 30, image: "bundle.jpg", category: "bundle", quantity: 1 });
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`🎁 ${games.length} games from the bundle added to your cart!`);
  });
});
