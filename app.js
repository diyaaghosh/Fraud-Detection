

document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

   
        document.querySelector('.nav-links').classList.remove('active');
    });
});


const fadeElements = document.querySelectorAll('.fade-in');
        
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, {threshold: 0.1});

fadeElements.forEach(fadeElement => {
    appearOnScroll.observe(fadeElement);
});


document.getElementById('fraudForm').addEventListener('submit', function(e) {
    e.preventDefault();

const data = {
  proposed_credit_limit: parseFloat(document.getElementById('proposed_credit_limit').value),
  device_os: document.getElementById('device_os').value,
  source: document.getElementById('source').value,
  email: document.getElementById('email').value,
  phone_number: document.getElementById('phone_number').value,
  device_id: document.getElementById('device_id').value,
  ip_address: document.getElementById('ip_address').value,
  session_length_in_minutes: parseFloat(document.getElementById('session_length_in_minutes').value),
  customer_age: parseInt(document.getElementById('customer_age').value),
  current_address_months_count: parseInt(document.getElementById('current_address_months_count').value),
  income: parseFloat(document.getElementById('income').value),
  name_email_similarity: parseFloat(document.getElementById('name_email_similarity').value),
  prev_address_months_count: parseInt(document.getElementById('prev_address_months_count').value),
  velocity_24h: parseInt(document.getElementById('velocity_24h').value),
  velocity_4w: parseInt(document.getElementById('velocity_4w').value),
  fraud_neighbors: parseInt(document.getElementById('fraud_neighbors').value),
  fraud_ratio_neighbors: parseFloat(document.getElementById('fraud_ratio_neighbors').value),
  component_size: parseInt(document.getElementById('component_size').value),
  days_since_request: parseInt(document.getElementById('days_since_request').value),
  intended_balcon_amount: parseFloat(document.getElementById('intended_balcon_amount').value),
  zip_count_4w: parseInt(document.getElementById('zip_count_4w').value),
  velocity_6h: parseInt(document.getElementById('velocity_6h').value),
  bank_branch_count_8w: parseInt(document.getElementById('bank_branch_count_8w').value),
  date_of_birth_distinct_emails_4w: parseInt(document.getElementById('date_of_birth_distinct_emails_4w').value),
  credit_risk_score: parseInt(document.getElementById('credit_risk_score').value),
  email_is_free: parseInt(document.getElementById('email_is_free').value),
  phone_home_valid: parseInt(document.getElementById('phone_home_valid').value),
  phone_mobile_valid: parseInt(document.getElementById('phone_mobile_valid').value),
  bank_months_count: parseInt(document.getElementById('bank_months_count').value),
  has_other_cards: parseInt(document.getElementById('has_other_cards').value),
  foreign_request: parseInt(document.getElementById('foreign_request').value),
  keep_alive_session: parseInt(document.getElementById('keep_alive_session').value),
  device_distinct_emails_8w: parseInt(document.getElementById('device_distinct_emails_8w').value),
  device_fraud_count: parseInt(document.getElementById('device_fraud_count').value),
  month: parseInt(document.getElementById('month').value),
  num_connections: parseInt(document.getElementById('num_connections').value),
  num_shared_identifiers: parseInt(document.getElementById('num_shared_identifiers').value)
};


    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        const statusIcon = document.getElementById('statusIcon');
        const statusText = document.getElementById('statusText');
        const statusDescription = document.getElementById('statusDescription');
        const riskFactorsList = document.getElementById('riskFactors');

        riskFactorsList.innerHTML = '';

        if (result.error) {
            statusText.textContent = 'Error';
            statusDescription.textContent = result.error;
            statusIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            statusIcon.className = 'status-icon fraud';
            return;
        }

        if (result.is_fraud) {
            statusText.textContent = 'Fraud Detected';
            statusDescription.textContent = 'Score: ' + result.ensemble_score;
            statusIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            statusIcon.className = 'status-icon fraud';
        } else {
            statusText.textContent = 'Transaction Safe';
            statusDescription.textContent = 'Score: ' + result.ensemble_score;
            statusIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            statusIcon.className = 'status-icon safe';
        }

        result.reasons.forEach(reason => {
            const li = document.createElement('li');
            li.innerHTML = '<i class="fas fa-info-circle"></i> ' + reason;
            riskFactorsList.appendChild(li);
        });
    })
    .catch(err => {
        alert('Error contacting backend: ' + err);
    });
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    console.log('Contact form submitted:', { name, email, message });
    
    
    alert('Thank you for your message, ' + name + '! We will get back to you soon.');
    
    
    this.reset();
});


const cyberCanvas = document.getElementById('cyberCanvas');
if (cyberCanvas) {
    cyberCanvas.innerHTML = '<canvas id="cyberCanvasElement"></canvas>';
    const canvas = document.getElementById('cyberCanvasElement');
    canvas.width = cyberCanvas.offsetWidth;
    canvas.height = cyberCanvas.offsetHeight;
    const ctx = canvas.getContext('2d');
  
    const gridSize = 20;
    const dots = [];
    
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            dots.push({
                x: x + Math.random() * 10 - 5,
                y: y + Math.random() * 10 - 5,
                originX: x,
                originY: y,
                vx: 0,
                vy: 0,
                color: `rgba(15, 98, 254, ${Math.random() * 0.5 + 0.5})`
            });
        }
    }
    
  
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    
        dots.forEach(dot => {
         
            dot.vx += (dot.originX - dot.x) * 0.01;
            dot.vy += (dot.originY - dot.y) * 0.01;
            
           
            dot.vx *= 0.9;
            dot.vy *= 0.9;
            
          
            dot.x += dot.vx;
            dot.y += dot.vy;
            
           
            ctx.fillStyle = dot.color;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
            ctx.fill();
        });
        
     
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < gridSize * 2) {
                    ctx.strokeStyle = `rgba(15, 98, 254, ${1 - distance / (gridSize * 2)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }

  
    animate();


    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        dots.forEach(dot => {
            const dx = mouseX - dot.x;
            const dy = mouseY - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 50;
                const angle = Math.atan2(dy, dx);
                
                dot.vx -= Math.cos(angle) * force;
                dot.vy -= Math.sin(angle) * force;
            }
        });
    });
}
