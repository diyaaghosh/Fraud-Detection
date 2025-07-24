
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
    
  
    const amount = parseFloat(document.getElementById('amount').value);
    const location = document.getElementById('location').value;
    const device = document.getElementById('device').value;
    const behavior = document.getElementById('behavior').value;
    const history = document.getElementById('history').value;
    
 
    let riskScore = 0;
    const riskFactors = [];
    

    if (amount > 10000) {
        riskScore += 30;
        riskFactors.push('High transaction amount ($' + amount.toLocaleString() + ')');
    } else if (amount > 5000) {
        riskScore += 15;
        riskFactors.push('Medium transaction amount ($' + amount.toLocaleString() + ')');
    }
    

    if (location === 'foreign') {
        riskScore += 20;
        riskFactors.push('Foreign transaction location');
    } else if (location === 'high-risk') {
        riskScore += 40;
        riskFactors.push('High-risk country location');
    }
    

    if (device === 'new') {
        riskScore += 15;
        riskFactors.push('New device detected');
    } else if (device === 'emulator') {
        riskScore += 35;
        riskFactors.push('Emulator/VPN detected');
    }
    

    if (behavior === 'rushed') {
        riskScore += 20;
        riskFactors.push('Rushed transaction behavior');
    } else if (behavior === 'atypical') {
        riskScore += 30;
        riskFactors.push('Atypical user behavior');
    }
    

    if (history === 'new') {
        riskScore += 10;
        riskFactors.push('New customer profile');
    } else if (history === 'suspicious') {
        riskScore += 30;
        riskFactors.push('Previous suspicious activity');
    }
    
  
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const statusDescription = document.getElementById('statusDescription');
    const riskFactorsList = document.getElementById('riskFactors');
    
    riskFactorsList.innerHTML = '';
    
    if (riskScore > 70) {
    
        statusIcon.className = 'status-icon fraud';
        statusIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        statusText.textContent = 'Fraud Detected';
        statusDescription.textContent = 'This transaction has been flagged as potentially fraudulent.';
        
        riskFactors.forEach(factor => {
            const li = document.createElement('li');
            li.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + factor;
            riskFactorsList.appendChild(li);
        });
        
  
        const li = document.createElement('li');
        li.innerHTML = '<i class="fas fa-shield-alt"></i> <strong>Recommended action:</strong> Block transaction and flag account for review';
        riskFactorsList.appendChild(li);
    } else if (riskScore > 30) {
      
        statusIcon.className = 'status-icon suspicious';
        statusIcon.innerHTML = '<i class="fas fa-question-circle"></i>';
        statusText.textContent = 'Suspicious Activity';
        statusDescription.textContent = 'This transaction shows signs of potential fraud. Additional verification recommended.';
        
        riskFactors.forEach(factor => {
            const li = document.createElement('li');
            li.innerHTML = '<i class="fas fa-question-circle"></i> ' + factor;
            riskFactorsList.appendChild(li);
        });
        
   
        const li = document.createElement('li');
        li.innerHTML = '<i class="fas fa-user-check"></i> <strong>Recommended action:</strong> Request additional authentication';
        riskFactorsList.appendChild(li);
    } else {

        statusIcon.className = 'status-icon safe';
        statusIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        statusText.textContent = 'Transaction Safe';
        statusDescription.textContent = 'No significant fraud indicators detected.';
        
        if (riskFactors.length > 0) {
            riskFactors.forEach(factor => {
                const li = document.createElement('li');
                li.innerHTML = '<i class="fas fa-info-circle"></i> ' + factor;
                riskFactorsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.innerHTML = '<i class="fas fa-thumbs-up"></i> No significant risk factors detected';
            riskFactorsList.appendChild(li);
        }
    }
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
