const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");
const API_KEY = "1be45318-dd83-441e-af72-469312d8392f";

// ✅ Load saved theme
let savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);

// Set correct icon on load
if (savedTheme === "dark") {
  icon.classList.replace("fa-moon", "fa-sun");
}

// ✅ Toggle theme
toggleBtn.addEventListener("click", () => {
  let currentTheme = document.body.getAttribute("data-theme");

  let newTheme = currentTheme === "dark" ? "light" : "dark";

  // change theme
  document.body.setAttribute("data-theme", newTheme);

  // save in localStorage
  localStorage.setItem("theme", newTheme);

  // change icon
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});

const ctx = document.getElementById("chart").getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Sunday", "Monday", "Tuesday",
          "Wednesday", "Thursday", "Friday", "Saturday"],
          datasets: [{
            label: 'Last week',
            backgroundColor: 'rgba(161, 198, 247, 1)',
            borderColor: 'rgb(47, 128, 237)',
            data: [3000, 4000, 2000, 5000, 8000, 9000, 2000],
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }]
          }
        },
      });



      // Toggle dropdown visibility
   
const icon1 = document.getElementById("weatherIcon");
const menu = document.getElementById("weatherMenu");

// Toggle dropdown
icon1.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!icon1.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

// 🎯 Change icon based on weather
function setWeatherIcon(condition) {
  let weatherEmoji = "🌤️";

  const c = condition.toLowerCase();

  if (c.includes("clear")) weatherEmoji = "☀️";
  else if (c.includes("cloud")) weatherEmoji = "☁️";
  else if (c.includes("rain")) weatherEmoji = "🌧️";
  else if (c.includes("drizzle")) weatherEmoji = "🌦️";
  else if (c.includes("thunder")) weatherEmoji = "⛈️";
  else if (c.includes("snow")) weatherEmoji = "❄️";
  else if (c.includes("mist") || c.includes("fog")) weatherEmoji = "🌫️";

  icon.textContent = weatherEmoji;
}

// 🌍 Fetch Weather
function getWeather(lat, lon) {
  const apiKey = "ce6e29637ac783f1a88424faf7922172"; // ← Put your OpenWeather API key here

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const condition = data.weather[0].description;
      const city = data.name;

      document.getElementById("location").innerText = city;
      document.getElementById("temperature").innerText = temp + "°C";
      document.getElementById("condition").innerText = condition;

      // ✅ Update icon dynamically
      setWeatherIcon(condition);
    })
    .catch(() => {
      document.getElementById("location").innerText = "Error loading weather";
    });
}

// 📍 Get User Location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
  }, () => {
    document.getElementById("location").innerText = "Location blocked";
  });
}



// ===================== ELEMENTS =====================
const amountEl = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const swapBtn = document.getElementById("swap");
const convertC = document.getElementById("convert-currency");


// ===================== CURRENCIES =====================
async function loadJSON() {
  try {
    const response = await fetch("assets/json/currency.json");
    const data = await response.json();
    console.log(data);

const currencies = data.map(item => item.iso_code);


currencies.forEach(currency => {
  fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

fromCurrency.value = "GBP";
toCurrency.value = "INR";
amountEl.value = 1;
 convertCurrency();
// ===================== LIVE CONVERSION =====================
async function convertCurrency() {
  const amount = amountEl.value;
  console.log("amount",amount)

  if (!amount || amount <= 0) {
    result.innerText = "Enter a valid amount";
    return;
  }

  try {
    const res = await fetch(
      `https://open.er-api.com/v6/latest/${fromCurrency.value}`
    );

    const data = await res.json();

    if (data.result !== "success") {
      result.innerText = "Conversion failed.";
      return;
    }

    const rate = data.rates[toCurrency.value];

    if (!rate) {
      result.innerText = "Currency not supported.";
      return;
    }

    const converted = amount * rate;

    result.innerHTML = `
      <strong>${amount} ${fromCurrency.value}</strong> = 
      <strong>${converted.toFixed(2)} ${toCurrency.value}</strong><br>
      Exchange Rate: 1 ${fromCurrency.value} = ${rate.toFixed(4)} ${toCurrency.value}<br>
      Last Updated: ${data.time_last_update_utc}
    `;

  } catch (error) {
    console.error(error);
    result.innerText = "Error fetching exchange rate.";
  }
}

// ✅ Auto update (LIVE)
convertC.addEventListener("button", convertCurrency);
amountEl.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);

// ===================== SWAP =====================
swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  convertCurrency();
});
  } catch (error) {
    console.error("Error:", error);
  }
}


loadJSON();

async function getHistorical(date, base, target) {
  const url = `https://api.exchangerateapi.net/v1/historical?date=${encodeURIComponent(date)}&base=${encodeURIComponent(base)}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log(data, "checkdata");
    return data.rates?.[target] ?? null;

  } catch (err) {
    console.error("Historical error:", err);
    return null;
  }
}
getHistorical("2026-05-27", "GBP", "USD");

// JavaScript code to ensure the Bootstrap mobile navbar collapses when navigating to in-page links 

document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
                link.addEventListener("click", function (e) {
                    let section = document.querySelector(e.target.getAttribute("href"));
                    if (section) {
                        e.preventDefault(); // Prevent default anchor click behavior
                        let navbarHeight = document.querySelector(".navbar-toggler").offsetHeight;
                        window.scroll({
                            top: section.offsetTop - navbarHeight, // Adjust for navbar height
                            behavior: "smooth",
                        });
                        document
                            .querySelector(".navbar-collapse")
                            .classList.remove("show"); // Collapse navbar
                    }
                });
            });