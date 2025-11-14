document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("historyContainer");
  const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

  if (history.length === 0) {
    container.innerHTML = "<p>No purchases yet.</p>";
    return;
  }

  history.reverse().forEach(purchase => {
    const div = document.createElement("div");
    div.className = "purchase";

    div.innerHTML = `
      <strong>Purchase Date:</strong> ${purchase.date}
      <strong>Total:</strong> $${purchase.total.toFixed(2)}
      <strong>Games:</strong>
      <ul>
        ${purchase.games.map(game => `
          <li>
            ${game.name} × ${game.quantity} — $${(game.price * game.quantity).toFixed(2)}
          </li>
        `).join("")}
      </ul>
    `;

    container.appendChild(div);
  });
});










