const userName = document.querySelector("#user-name");
const password = document.querySelector("#password");
const signInBtn = document.querySelector("#sign-in-btn");
const logInCard = document.querySelector("#log-in-card");
const mainPage = document.querySelector("#main-page");

const loadMainPage = () => {
  const userInput = userName.value;
  const userPassword = password.value;

  if (userInput === "" || userPassword === "") {
    if (userInput === "" && userPassword === "") {
      alert("Please enter the username and password");
    } else if (userInput === "") alert("Please enter the username");
    else alert("Please enter the password");
  } else if (userInput === "admin" && userPassword === "admin123") {
    logInCard.classList.add("hidden");
    mainPage.classList.remove("hidden");
  } else {
    alert("Incorrect Password.Please try Again");
  }
};

const loadApi = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCards(data.data));
};

loadApi();

const displayCards = (arr) => {
  document.querySelector("#num-of-data").textContent = `${arr.length} Issues`;
  const cardBox = document.querySelector("#card-box");
  cardBox.innerHTML = "";
  arr.forEach((obj) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div
        class="card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full"
      >
        <!-- Top colored border -->
        ${
          obj.status.toLowerCase() === "open"
            ? '<div class="h-1 bg-green-400"></div>'
            : '<div class="h-1 bg-purple-400"></div>'
        }

        <!-- Card Body -->
        <div class="px-5 py-4">
          <!-- Top Row: Status Icon + Priority Badge -->
          <div class="flex items-center justify-between mb-3">
            <!-- Dashed circle icon -->
            <div>
              ${
                obj.status.toLowerCase() === "open"
                  ? '<img src="assets/Open-Status.png">'
                  : '<img src="assets/closed.png" >'
              }
            </div>
            <!-- HIGH badge -->
            <span
               class="${obj.priority === "high" ? "bg-red-50 text-red-500" : obj.priority === "medium" ? " bg-yellow-50  text-yellow-600" : "bg-gray-100 text-gray-500"} text-xs font-bold px-4 py-1.5 rounded-full"
               >${obj.priority.toUpperCase()}</span>
          </div>

          <!-- Title -->
          <h3 class="text-base font-bold text-gray-900 mb-2">
            ${obj.title}
          </h3>

          <!-- Description -->
          <p class="line-clamp-2 text-sm text-gray-400 mb-4">
            ${obj.description}
          </p>

          <!-- Labels -->
          <div class="flex items-center gap-2">
            ${
              obj.labels[0]
                ? `
            <span class="flex items-center gap-1.5 bg-yellow-50  text-yellow-600 text-xs font-bold px-2 py-1.5 rounded-full border border-red-200">${obj.labels[0].toUpperCase()}
            </span>`
                : ""
            }

            ${
              obj.labels[1]
                ? `
            <span class="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 text-xs font-bold px-2 py-1.5 rounded-full border border-yellow-200">${obj.labels[1].toUpperCase()}
            </span>`
                : ""
            }
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-100 mx-0"></div>

        <!-- Footer -->
        <div class="px-5 py-3">
          <p class="text-sm text-gray-400">#${obj.id} by ${obj.author}</p>
          <p class="text-sm text-gray-400">${obj.createdAt}</p>
        </div>
      </div>
       
      `;
    cardBox.appendChild(div);
  });
};

const displayIndividualCards = (content) => {
  const cards = document.querySelectorAll(".card");
  if (content === "Open") {
    cards.forEach((card) => {
      if (card.firstElementChild.classList.contains("bg-green-400")) {
        card.classList.remove("hidden");
      } else card.classList.add("hidden");
    });
  } else if (content === "Closed") {
    cards.forEach((card) => {
      if (card.firstElementChild.classList.contains("bg-green-400")) {
        card.classList.add("hidden");
      } else card.classList.remove("hidden");
    });
  } else {
    cards.forEach((card) => {
       card.classList.remove("hidden");
    });
  }
};

const btns = document.querySelectorAll(".buttons");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayIndividualCards(btn.textContent);
    btns.forEach((ele) => {
      ele.classList.remove("btn-primary");
    });
    btn.classList.add("btn-primary");
  });
});
