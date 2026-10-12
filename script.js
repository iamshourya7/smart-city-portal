document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Initiative Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#initiativesGrid .card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Transit Data Simulation
  const transitSchedules = [
    { route: 'Blue Metro Line 1', destination: 'Financial Tech Park', eta: '3 min', status: 'On Schedule', cssClass: 'status-on-time' },
    { route: 'EV Rapid Bus 42', destination: 'West Green Terminal', eta: '7 min', status: 'On Schedule', cssClass: 'status-on-time' },
    { route: 'Red Tram Line 2', destination: 'Central Bio Hospital', eta: '11 min', status: '2 min Delay', cssClass: 'status-slight-delay' },
    { route: 'Airport Express Monorail', destination: 'International Hub T3', eta: '14 min', status: 'On Schedule', cssClass: 'status-on-time' }
  ];

  const transitTableBody = document.getElementById('transitTableBody');
  const refreshTransitBtn = document.getElementById('refreshTransitBtn');

  function renderTransitTable() {
    if (!transitTableBody) return;
    transitTableBody.innerHTML = '';
    transitSchedules.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.route}</strong></td>
        <td>${item.destination}</td>
        <td>${item.eta}</td>
        <td><span class="status-badge ${item.cssClass}">${item.status}</span></td>
      `;
      transitTableBody.appendChild(tr);
    });
  }

  renderTransitTable();

  if (refreshTransitBtn) {
    refreshTransitBtn.addEventListener('click', () => {
      refreshTransitBtn.textContent = 'Updating...';
      setTimeout(() => {
        // Shift ETA values for live effect
        transitSchedules[0].eta = Math.floor(Math.random() * 4 + 2) + ' min';
        transitSchedules[1].eta = Math.floor(Math.random() * 5 + 5) + ' min';
        renderTransitTable();
        refreshTransitBtn.textContent = 'Refresh Transit Schedule';
      }, 500);
    });
  }

  // Simulated AQI Real-Time Fluctuations
  const aqiScore = document.getElementById('aqiScore');
  const aqiFill = document.getElementById('aqiFill');
  const pmValue = document.getElementById('pmValue');

  setInterval(() => {
    if (!aqiScore || !aqiFill || !pmValue) return;
    const baseAQI = Math.floor(Math.random() * 15) + 48; // Values between 48 and 63
    const basePM = (baseAQI * 0.25).toFixed(1);

    aqiScore.textContent = baseAQI;
    pmValue.textContent = basePM;

    const fillPercent = Math.min((baseAQI / 200) * 100, 100);
    aqiFill.style.width = `${fillPercent}%`;
  }, 10000);

  // Animated Numbers Counter for Sustainability
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const handleStatsScroll = () => {
    const statsSection = document.getElementById('sustainability');
    if (!statsSection || counted) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8) {
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        let count = 0;
        const increment = Math.ceil(target / 40);

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target;
            clearInterval(timer);
          } else {
            stat.textContent = count;
          }
        }, 30);
      });
      counted = true;
    }
  };

  window.addEventListener('scroll', handleStatsScroll);
  handleStatsScroll();

  // Issue / Grievance Form Validation & Submission
  const form = document.getElementById('grievanceForm');
  const formSuccess = document.getElementById('formSuccessMessage');
  const resetFormBtn = document.getElementById('resetFormBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('fullName');
      const email = document.getElementById('citizenEmail');
      const category = document.getElementById('issueCategory');
      const location = document.getElementById('issueLocation');
      const desc = document.getElementById('issueDescription');

      // Clear errors
      document.querySelectorAll('.field-error').forEach(el => el.textContent = '');

      if (!name.value.trim()) {
        document.getElementById('nameError').textContent = 'Please enter your name.';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        document.getElementById('emailError').textContent = 'Please provide a valid email address.';
        isValid = false;
      }

      if (!category.value) {
        document.getElementById('categoryError').textContent = 'Please select a category.';
        isValid = false;
      }

      if (!location.value.trim()) {
        document.getElementById('locationError').textContent = 'Please specify the location.';
        isValid = false;
      }

      if (!desc.value.trim() || desc.value.trim().length < 10) {
        document.getElementById('descError').textContent = 'Description must be at least 10 characters long.';
        isValid = false;
      }

      if (isValid) {
        const randomTicket = '#MT-' + Math.floor(1000 + Math.random() * 9000);
        document.getElementById('ticketId').textContent = randomTicket;
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      }
    });
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      formSuccess.style.display = 'none';
    });
  }
});

// Utility Alert Helper for Mock Buttons
function triggerAlert(message) {
  alert(message);
}