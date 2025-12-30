
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

  
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
       
                if (entry.target.classList.contains('demo-container')) {
                    const formGroups = document.querySelectorAll('.form-group');
                    formGroups.forEach((group, index) => {
                        setTimeout(() => {
                            group.classList.add('animate');
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('tech-grid')) {
                    const techCards = entry.target.querySelectorAll('.tech-card');
                    techCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);


    document.querySelectorAll('.section-title, .demo-container, .tech-grid').forEach(el => {
        observer.observe(el);
    });

 function calculateRiskScore(inputs) {
    let risk = 0;

   
    if (inputs.amount > 50000) risk += 0.25;
    else if (inputs.amount > 20000) risk += 0.15;
    else if (inputs.amount > 5000) risk += 0.05;

   
    if (inputs.daily_tx > 50) risk += 0.25;
    else if (inputs.daily_tx > 20) risk += 0.15;
    else if (inputs.daily_tx > 10) risk += 0.05;

   
    if (inputs.prev_fraud === 1) risk += 0.3;

  
    if (inputs.hour >= 0 && inputs.hour <= 5) risk += 0.15;

   
    if (inputs.device === "Mobile") risk += 0.05;

  
    const riskyLocations = ["London", "New York", "Tokyo", "Sydney"];
    if (riskyLocations.includes(inputs.location)) {
        risk += 0.15;
    }

    return Math.min(risk, 1);
}

    function checkFraud() {
       const inputs = {
    amount: Number(document.getElementById('amount').value),
    daily_tx: Number(document.getElementById('daily_tx').value),
    device: document.getElementById("device").value,
    location: document.getElementById("location").value,
    prev_fraud: Number(document.getElementById("prev_fraud").value),
    hour: Number(document.getElementById("hour").value)
};

const risk = calculateRiskScore(inputs);
        const amount = inputs.amount;
        const daily_tx = inputs.daily_tx;   
        
        if (!amount || !risk || !daily_tx) {
            alert('Please fill in all required fields');
            return;
        }
        
     
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <div class="result-status loading">
                <div class="status-icon" style="background: var(--gray);">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <h3>Analyzing Transaction...</h3>
                <p>Processing your request</p>
            </div>
        `;
        
       
        setTimeout(() => {
      fetch("https://diyaghosh16.pythonanywhere.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Number(amount),
                    risk: Number(risk),
                    daily_tx: Number(daily_tx),
                    device: document.getElementById("device").value,
                    location: document.getElementById("location").value,
                    prev_fraud: Number(document.getElementById("prev_fraud").value),
                    hour: Number(document.getElementById("hour").value),
                    weekend: 0
                })
            })
            .then(res => res.json())
            .then(data => {
           
                const isFraud = data.fraud;
                const statusClass = isFraud ? "fraud" : "safe";
                const statusText = isFraud ? "🚨 FRAUD DETECTED" : "✅ TRANSACTION SAFE";
                const icon = isFraud ? "!" : "✓";
                
            
                let html = `
                    <div class="result-status">
                        <div class="status-icon ${statusClass}">
                            ${icon}
                        </div>
                        <h3>${statusText}</h3>
                        <p>Confidence: ${(data.confidence * 100).toFixed(1)}%</p>
                    </div>
                `;
                
            
                if (data.reasons && data.reasons.length > 0) {
                    html += `
                        <div class="result-details">
                            <h4><i class="fas fa-exclamation-circle"></i> Risk Factors</h4>
                            <ul class="risk-factors">
                                ${data.reasons.map(r => `<li>⚠️ ${r}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
            
                html += `
                    <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <p><strong>Recommendation:</strong> ${isFraud ? 'Block transaction and alert security team' : 'Proceed with transaction'}</p>
                    </div>
                `;
                
              
                resultDiv.style.opacity = '0';
                resultDiv.innerHTML = html;
                setTimeout(() => {
                    resultDiv.style.transition = 'opacity 0.5s ease';
                    resultDiv.style.opacity = '1';
                }, 50);
            })
            .catch(err => {
                resultDiv.innerHTML = `
                    <div class="result-status" style="border-color: var(--danger);">
                        <div class="status-icon" style="background: var(--danger);">
                            <i class="fas fa-exclamation"></i>
                        </div>
                        <h3>Analysis Error</h3>
                        <p>Unable to process request. Please try again.</p>
                    </div>
                `;
                console.error(err);
            });
        }, 1000); // Simulated delay
    }

    document.addEventListener('DOMContentLoaded', () => {
   
        setTimeout(() => {
            document.querySelector('.hero-content').style.opacity = '1';
            document.querySelector('.hero-content').style.transform = 'translateY(0)';
        }, 100);
    });

