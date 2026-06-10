const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");

// ✅ Load saved theme
let savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);

// Set correct icon on load
icon.classList.remove("fa-sun", "fa-moon");
icon.classList.add(savedTheme === "dark" ? "fa-sun" : "fa-moon");

// ✅ Toggle theme
document.getElementById("theme-toggle").addEventListener("click", () => {
	let currentTheme = document.body.getAttribute("data-theme");
	let newTheme = currentTheme === "dark" ? "light" : "dark";

	// change theme
	document.body.setAttribute("data-theme", newTheme);

	// save in localStorage
	localStorage.setItem("theme", newTheme);

	// change icon
	icon.classList.remove("fa-sun", "fa-moon");
	icon.classList.add(newTheme === "dark" ? "fa-sun" : "fa-moon");
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
	let weatherType = document.getElementById('weatherType');
	let weatherEmoji = "🌤️";

	const c = condition.toLowerCase();

	if (c.includes("clear")) weatherEmoji = "Sunny ☀️";
	else if (c.includes("cloud")) weatherEmoji = "Cloudy ☁️";
	else if (c.includes("rain")) weatherEmoji = "Rainy 🌧️";
	else if (c.includes("drizzle")) weatherEmoji = "Drizzle 🌦️";
	else if (c.includes("thunder")) weatherEmoji = "Thunder ⛈️";
	else if (c.includes("snow")) weatherEmoji = "Snow ❄️";
	else if (c.includes("mist") || c.includes("fog")) weatherEmoji = "Fog 🌫️";

	weatherType.textContent = weatherEmoji;
}

// 🌍 Fetch Weather
function getWeather(lat, lon) {
	const apiKey = "ce6e29637ac783f1a88424faf7922172"; // ← Put your OpenWeather API key here

	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

			let regionNames = new Intl.DisplayNames(['en'], {
				type: 'region'
			});
			let regionCount = regionNames.of(data.sys.country);
			const temp = data.main.temp;
			const feelsLike = data.main.feels_like;
			const condition = data.weather[0].description;
			const city = data.name + ', ' + regionCount;

			document.getElementById("location").innerText = city;
			document.getElementById("temperature").innerText = 'Temp' + ' ' + temp + "°C";
			document.getElementById("feelsLike").innerText = 'Feels Like' + ' ' + feelsLike + "°C";
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
const chartCanvas = document.getElementById("chart");
const chartRangeSelect = document.getElementById("chartRange");

let myChart;
const defaultRange = "week";
let chartRange = defaultRange;

function initChart() {
	if (!chartCanvas) return;
	const ctx = chartCanvas.getContext("2d");
	myChart = new Chart(ctx, {
		type: "line",
		data: {
			labels: [],
			datasets: [{
				label: "Exchange Rate",
				data: [],
				backgroundColor: "rgba(47, 128, 237, 0.2)",
				borderColor: "rgb(47, 128, 237)",
				fill: true,
				tension: 0.25
			}]
		},
		options: {
			responsive: true,
			scales: {
				x: {
					title: {
						display: true,
						text: "Date"
					}
				},
				y: {
					title: {
						display: true,
						text: "Rate"
					},
					beginAtZero: false
				}
			}
		}
	});
}

function updateChart(labels, data, label) {
	if (!myChart) return;
	myChart.data.labels = labels;
	myChart.data.datasets[0].data = data;
	myChart.data.datasets[0].label = label;
	myChart.update();
}

function getRangeDays(rangeKey) {
	return {
		hours: 1,
		week: 7,
		month: 30,
		year: 365,
		max: 1095,
		all: 1095
	} [rangeKey] || 7;
}

function getHistoryKey(base, target) {
	return `fx-history-${base}-${target}`;
}

function loadRateHistory(base, target) {
	const raw = localStorage.getItem(getHistoryKey(base, target));
	return raw ? JSON.parse(raw) : [];
}

function saveRateHistory(base, target, point) {
	const history = loadRateHistory(base, target);
	history.push(point);

	const keepMs = 365 * 24 * 60 * 60 * 1000;
	const cutoff = Date.now() - keepMs;
	const cleaned = history.filter(item => Date.parse(item.timestamp) >= cutoff);

	localStorage.setItem(getHistoryKey(base, target), JSON.stringify(cleaned));
	return cleaned;
}

function formatTimestamp(timestamp, rangeKey) {
	const date = new Date(timestamp);
	if (rangeKey === "hours") {
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		});
	}
	if (rangeKey === "week" || rangeKey === "month") {
		return date.toLocaleDateString([], {
			month: "short",
			day: "numeric"
		});
	}
	return date.toLocaleDateString([], {
		year: "numeric",
		month: "short"
	});
}

function filterHistory(history, rangeKey) {
	const now = Date.now();
	const ranges = {
		hours: 6 * 60 * 60 * 1000,
		week: 7 * 24 * 60 * 60 * 1000,
		month: 30 * 24 * 60 * 60 * 1000,
		year: 365 * 24 * 60 * 60 * 1000,
		max: 365 * 24 * 60 * 60 * 1000,
		all: 365 * 24 * 60 * 60 * 1000
	};
	const windowMs = ranges[rangeKey] || ranges.week;
	return history.filter(item => Date.parse(item.timestamp) >= now - windowMs);
}

async function loadChartRates(base, target, rangeKey = defaultRange) {
	if (!chartCanvas) return;

	try {
		const res = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`);
		const data = await res.json();

		if (data.result !== "success" || !data.rates) {
			console.warn("Chart rate fetch failed", data);
			return;
		}

		const rate = data.rates[target];
		if (!rate) {
			console.warn("No rate for", target, "with base", base);
			return;
		}

		const history = saveRateHistory(base, target, {
			timestamp: new Date().toISOString(),
			rate
		});

		const filtered = filterHistory(history, rangeKey);
		const labels = filtered.map(item => formatTimestamp(item.timestamp, rangeKey));
		const values = filtered.map(item => item.rate);

		updateChart(labels, values, `${target}/${base} (${rangeKey})`);
	} catch (err) {
		console.error("Chart load failed", err);
	}
}



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
		
		initChart();
		convertCurrency();
		// ===================== LIVE CONVERSION =====================
		async function convertCurrency() {
			const amount = amountEl.value;
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
				console.log(data)
				const converted = amount * rate;
				const date = new Date(data.time_last_update_unix * 1000); // seconds → milliseconds

				const formattedDateTime = date.toLocaleString("en-GB", {
					day: "2-digit",
					month: "2-digit",
					year: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					hour12: true
				});
				result.innerHTML = `
      <strong>${amount} ${fromCurrency.value}</strong> = 
      <strong>${rate.toFixed(4)} ${toCurrency.value}</strong><br>
      Exchange Rate: 1 ${fromCurrency.value} = ${rate.toFixed(4)} ${toCurrency.value}<br>
      Last Updated: ${formattedDateTime}
    `;

				loadChartRates(fromCurrency.value, toCurrency.value, chartRangeSelect?.value || defaultRange);
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
		chartRangeSelect?.addEventListener("change", (event) => {
			chartRange = event.target.value || defaultRange;
			loadChartRates(fromCurrency.value, toCurrency.value, chartRange);
		});



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

// ===================== CURRENCY CARDS WITH LOAD MORE =====================
let allCurrencies = [];
let currentIndex = 0;
const cardsPerLoad = 8; // Number of cards to display per load

// Fetch and display currency cards
async function loadCurrencyCards() {
	try {
		const response = await fetch("assets/json/currency.json");
		allCurrencies = await response.json();
		console.log("Currencies loaded:", allCurrencies);

		// Initial load
		displayCards();

		// Add event listener to load more button
		const loadMoreBtn = document.getElementById("loadMoreBtn");
		loadMoreBtn.addEventListener("click", displayCards);
	} catch (error) {
		console.error("Error loading currency cards:", error);
	}
}

// Display cards in batches
function displayCards() {
	const container = document.getElementById("currencyContainer");
	const loadMoreBtn = document.getElementById("loadMoreBtn");

	// Calculate the end index for this batch
	const endIndex = Math.min(currentIndex + cardsPerLoad, allCurrencies.length);

	// Add new cards
	for (let i = currentIndex; i < endIndex; i++) {
		const currency = allCurrencies[i];
		const card = createCurrencyCard(currency);
		container.appendChild(card);
	}

	// Update current index
	currentIndex = endIndex;

	// Hide load more button if all cards are displayed
	if (currentIndex >= allCurrencies.length) {
		loadMoreBtn.style.display = "none";
	}
}

// Create a currency card element
function createCurrencyCard(currency) {
	const colDiv = document.createElement("div");
	colDiv.className = "col-6 col-md-4 col-lg-3 mb-3";

	const cardDiv = document.createElement("div");
	cardDiv.className = "currency-card p-3 text-center rounded shadow-sm";

	cardDiv.innerHTML = `
    <div class="currency-symbol" style="font-size: 2rem; margin-bottom: 10px;">
      ${currency.symbol}
    </div>
    <h5 class="mb-1" style="font-weight: 600;">${currency.country}</h5>
    <p class="mb-1" style="font-size: 0.95rem; color: #555;">
      <strong>${currency.currency}</strong>
    </p>
    <small class="text-secondary">
      ${currency.iso_code}
    </small>
    <p style="font-size: 0.85rem; color: #888; margin-top: 8px;">
      ${currency.notes}
    </p>
  `;

	colDiv.appendChild(cardDiv);
	return colDiv;
}

// Load currency cards on page load
loadCurrencyCards();


// JavaScript code to ensure the Bootstrap mobile navbar collapses when navigating to in-page links 

document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
	link.addEventListener("click", function(e) {
		const href = link.getAttribute("href");

		if (!href || href === "#") {
			return;
		}

		let section = document.querySelector(href);
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

// About section read more text
document.querySelector('[data-toggle="read-more"]').addEventListener('click', function () {
  const moreText = document.querySelector('.more-text');

  if (moreText.hasAttribute('hidden')) {
    moreText.removeAttribute('hidden');
    this.textContent = 'Read less';
  } else {
    moreText.setAttribute('hidden', '');
    this.textContent = 'Read more';
  }
});
