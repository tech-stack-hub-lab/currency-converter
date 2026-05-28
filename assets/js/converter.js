(function(){
  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83,
    JPY: 158,
    AUD: 1.5,
    CAD: 1.35
  };

  const form = document.getElementById('currency-converter');
  const resultBox = document.getElementById('result');

  function fmt(num){
    return Number(num).toLocaleString(undefined, {maximumFractionDigits: 4});
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const from = (document.getElementById('from-currency').value || '').toUpperCase().trim();
    const to = (document.getElementById('to-currency').value || '').toUpperCase().trim();

    if (!amount || amount < 0) {
      resultBox.textContent = 'Please enter a valid amount.';
      return;
    }
    if (!rates[from]) {
      resultBox.textContent = 'Unsupported "from" currency: ' + from;
      return;
    }
    if (!rates[to]) {
      resultBox.textContent = 'Unsupported "to" currency: ' + to;
      return;
    }

    // Convert using USD as base
    const usd = amount / rates[from];
    const converted = usd * rates[to];

    const rate = (rates[to] / rates[from]);

    resultBox.innerHTML = `
      <div style="text-align:center; width:100%;">
        <strong>${fmt(converted)}</strong> ${to} — <small>1 ${from} = ${rate.toFixed(6)} ${to}</small>
      </div>
    `;
  });

  // Theme toggles
  const sun = document.getElementById('theme-sun');
  const moon = document.getElementById('theme-moon');

  function applyTheme(t){
    document.body.setAttribute('data-theme', t);
    try{ localStorage.setItem('site-theme', t); }catch(e){}
  }

  sun && sun.addEventListener('click', function(e){ e.preventDefault(); applyTheme('light'); });
  moon && moon.addEventListener('click', function(e){ e.preventDefault(); applyTheme('dark'); });

  // initialize theme from localStorage or prefer dark
  const saved = (function(){ try{ return localStorage.getItem('site-theme'); }catch(e){return null;} })();
  applyTheme(saved || 'dark');
})();
