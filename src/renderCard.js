import { cardData } from "./cardData.js";

export function initCards() {
  function renderCards(category, clear) {
    const cardContainer = document.getElementById("cardContainer");

    //check is this cardContainer accessed or not
    if (!cardContainer) return;

    //at the starting clear cards only
    if (clear) {
      cardContainer.innerHTML = "";
    }

    //to avoid one by one adding process in DOM add card in frag and add frag once
    const frag = document.createDocumentFragment();

    cardData[category].forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      //create HTML tags and attributes
      cardDiv.innerHTML = `
      <div class="heading">${card.title}</div>
      <div class="algo-visual"><img src="${card.img}" alt="${card.title}"/></div>
      <div class="card-desc">${card.desc}</div>
      <div class="try-button" id="${card.id}">${card.buttonText}</div>
      `;
      frag.appendChild(cardDiv);
    });

    //add whole fragment into DOM
    cardContainer.appendChild(frag);
  }
  // initial render: clear first, then append other categories so both are visible
  renderCards("sorting", false);
  renderCards("searching");
  renderCards("Buffering");
}
