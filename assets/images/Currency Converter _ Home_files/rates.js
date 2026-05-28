(function(){
  // Utility to format dates
  function formatDate(d){
    return d.toISOString().slice(0,10);
  }

  const ctx = document.getElementById('rateChart');
  let chart = null;

  function createChart(labels, data, base, target){
    if (chart) { chart.data.labels = labels; chart.data.datasets[0].data = data; chart.options.plugins.title.text = `${base} → ${target}`; chart.update(); return; }

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `${base} → ${target}`,
          data: data,
          borderColor: '#7a9fc2',
          backgroundColor: 'rgba(122,159,194,0.15)',
          tension: 0.25,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: `${base} → ${target}`, color: '#fff' },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { ticks: { color: '#fff' } },
          y: { ticks: { color: '#fff' } }
        }
      }
    });
  }

  // Downsample daily data to monthly averages for long ranges
  function downsampleMonthly(dates, values){
    const map = new Map();
    dates.forEach((d,i)=>{
      const key = d.slice(0,7); // YYYY-MM
      if (!map.has(key)) map.set(key, {sum:0,count:0});
      const v = parseFloat(values[i]) || 0;
      const cur = map.get(key);
      cur.sum += v; cur.count += 1;
    });
    const outDates = [], outVals = [];
    for (let [k,v] of map){ outDates.push(k+'-01'); outVals.push(v.sum / v.count); }
    return {dates: outDates, values: outVals};
  }

  async function fetchTimeseries(base, target, days){
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    const startStr = formatDate(start);
    const endStr = formatDate(end);

    const url = `https://api.exchangerate.host/timeseries?start_date=${startStr}&end_date=${endStr}&base=${encodeURIComponent(base)}&symbols=${encodeURIComponent(target)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response not ok');
    const json = await res.json();
    if (!json.rates) throw new Error('No rates in response');

    const dates = Object.keys(json.rates).sort();
    const values = dates.map(d => json.rates[d][target]);
    return {dates, values};
  }

  async function updateChart(){
    const base = (document.getElementById('rate-base').value || 'USD').toUpperCase();
    const target = (document.getElementById('rate-target').value || 'INR').toUpperCase();
    const activeBtn = document.querySelector('.range-btn.active');
    const days = activeBtn ? parseInt(activeBtn.getAttribute('data-range'),10) : 30;

    const note = document.getElementById('rate-note');
    note.textContent = 'Loading...';

    try{
      const series = await fetchTimeseries(base, target, days);
      let labels = series.dates;
      let data = series.values;

      // If 5 years (≈1825 days), downsample to monthly to keep chart readable
      if (days >= 1825){
        const down = downsampleMonthly(labels, data);
        labels = down.dates; data = down.values;
      }

      createChart(labels, data, base, target);
      note.textContent = `Showing last ${days} days (${labels.length} points). Rates from exchangerate.host`;
    }catch(err){
      note.textContent = 'Failed to load rates: '+err.message;
    }
  }

  // Wire controls
  document.addEventListener('DOMContentLoaded', function(){
    // Range buttons
    document.querySelectorAll('.range-btn').forEach(btn=>{
      btn.addEventListener('click', function(e){
        document.querySelectorAll('.range-btn').forEach(b=>b.classList.remove('active'));
        this.classList.add('active');
        updateChart();
      });
    });

    // Currency inputs
    ['rate-base','rate-target'].forEach(id=>{
      const el = document.getElementById(id);
      el.addEventListener('change', updateChart);
      el.addEventListener('blur', updateChart);
    });

    // initial load
    updateChart();
  });
})();
