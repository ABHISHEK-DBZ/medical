document.addEventListener('DOMContentLoaded', () => {

    // Interactive mouse background
    const root = document.documentElement;

    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position as a percentage
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        // Set CSS variables for the background radial gradient
        root.style.setProperty('--mouse-x', `${x}%`);
        root.style.setProperty('--mouse-y', `${y}%`);
    });

    // Dark Mode Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            }
        });
    }

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all elements with the animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Parallax Scrolling Effect
    const parallaxElements = document.querySelectorAll('.parallax-el');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed;
            const yPos = -(scrolled * speed);
            
            // Maintain existing rotations for decorative shapes while updating translation
            let currentTransform = el.style.transform;
            let rotation = '';
            
            if (el.classList.contains('shape-2')) rotation = ' rotate(30deg)';
            if (el.classList.contains('shape-3')) rotation = ' rotate(15deg)';
            
            el.style.transform = `translate3d(0, ${yPos}px, 0)${rotation}`;
        });
    });

    // Mock Dispenser Functionality
    const dispenseBtn = document.querySelector('.dispense-btn');
    const screenText = document.querySelector('.screen');
    if (dispenseBtn && screenText) {
        dispenseBtn.addEventListener('click', () => {
            screenText.innerHTML = 'Dispensing...<br><span>Please wait</span>';
            dispenseBtn.style.pointerEvents = 'none';
            dispenseBtn.style.opacity = '0.7';
            setTimeout(() => {
                screenText.innerHTML = 'Medication<br><span>Taken ✓</span>';
                setTimeout(() => {
                    screenText.innerHTML = '10:00 AM<br><span>Time for Vitamin D</span>';
                    dispenseBtn.style.pointerEvents = 'auto';
                    dispenseBtn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // Modal Logic
    const modal = document.getElementById('preorderModal');
    const contactLinks = document.querySelectorAll('a[href="#contact"], .cta-section button');
    const discoverBtn = document.querySelector('.hero-actions .primary');
    const watchBtn = document.querySelector('.hero-actions .clay-btn-inset');
    const closeModal = document.getElementById('closeModal');
    const preorderForm = document.getElementById('preorderForm');
    const submitBtn = document.getElementById('submitBtn');
    const formFeedback = document.getElementById('formFeedback');

    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) {
                modal.style.display = 'flex';
                // Provide focus for accessibility
                const firstInput = modal.querySelector('input');
                if (firstInput) firstInput.focus();
            }
        });
    });

    if (discoverBtn) {
        discoverBtn.addEventListener('click', () => {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (watchBtn) {
        watchBtn.addEventListener('click', () => {
            alert("Video feature coming soon!");
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (preorderForm) {
        preorderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Simulate form submission to a backend API (e.g. Formspree/MailChimp/Custom Backend)
            submitBtn.textContent = 'Submitting...';
            submitBtn.style.pointerEvents = 'none';
            formFeedback.textContent = '';
            
            const formData = new FormData(preorderForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Here you would replace the URL with your actual endpoint
                // const response = await fetch('https://api.yourbackend.com/v1/waitlist', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(data)
                // });
                
                // Simulating network delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                submitBtn.textContent = 'Submit';
                submitBtn.style.pointerEvents = 'auto';
                
                formFeedback.style.color = '#10b981'; // Success Green
                formFeedback.textContent = "Thanks! We've added you to the waitlist.";
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    preorderForm.reset();
                    formFeedback.textContent = '';
                }, 2000);
                
            } catch (error) {
                submitBtn.textContent = 'Submit';
                submitBtn.style.pointerEvents = 'auto';
                formFeedback.style.color = '#ef4444'; // Error Red
                formFeedback.textContent = "Oops! Something went wrong. Please try again.";
            }
        });
    }

    // Modal accessibility: close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    // --- NEW: MEDICAL INTERACTION CHECKER --- 
    const analyzeBtn = document.getElementById('analyzeBtn');
    const drugA = document.getElementById('drugA');
    const drugB = document.getElementById('drugB');
    const checkerResult = document.getElementById('checkerResult');

    // Combinations map: { [DrugA_DrugB]: { status, message } }
    const interactions = {
        'Warfarin_Aspirin': {
            status: 'danger', icon: '🚨',
            message: 'Bleeding Risk. Combining Warfarin with Aspirin increases the risk of serious bleeding. CareCompanion alerts the pharmacist and automatically separates dosages by safe intervals or flags for doctor review.'
        },
        'Aspirin_Warfarin': 'Warfarin_Aspirin', // Alias to map reverse
        
        'Lisinopril_Ibuprofen': {
            status: 'warning', icon: '⚠️',
            message: 'Reduced Effectiveness. Ibuprofen can reduce the blood pressure-lowering effect of Lisinopril and affect kidneys. CareCompanion logs this conflict to advise taking them at strictly separated times.'
        },
        'Ibuprofen_Lisinopril': 'Lisinopril_Ibuprofen',
        
        'Calcium_Lisinopril': {
            status: 'safe', icon: '✅',
            message: 'No known severe interaction. However, the CareCompanion algorithm spaces meals and these pills by 2 hours naturally to optimize absorption.'
        },
        'Lisinopril_Calcium': 'Calcium_Lisinopril',
        
        'Warfarin_Ibuprofen': {
            status: 'danger', icon: '🚨',
            message: 'High Bleeding Risk. NSAIDs like Ibuprofen aggressively irritate the stomach lining when combined with a blood thinner. Our AI dispenser automatically locks out Ibuprofen if selected alongside Warfarin.'
        },
        'Ibuprofen_Warfarin': 'Warfarin_Ibuprofen'
    };

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            const val1 = drugA.value;
            const val2 = drugB.value;
            
            checkerResult.style.display = 'block';
            checkerResult.className = 'checker-result clay-inset'; // Reset classes

            if (!val1 || !val2) {
                checkerResult.classList.add('result-warning');
                checkerResult.innerHTML = '<i>Please select two different medications to check interactions.</i>';
                return;
            }

            if (val1 === val2) {
                checkerResult.classList.add('result-safe');
                checkerResult.innerHTML = '<i>You selected the same medication. Pick two different ones to analyze.</i>';
                return;
            }

            let key = `${val1}_${val2}`;
            // check alias
            let resultData = interactions[key] || interactions[`${val2}_${val1}`];
            
            if (typeof resultData === 'string') {
                resultData = interactions[resultData]; // Resolve alias mapping
            }

            if (resultData) {
                checkerResult.classList.add(`result-${resultData.status}`);
                checkerResult.innerHTML = `<span style="font-size:1.5rem">${resultData.icon}</span> <strong style="text-transform:uppercase; color:var(--text-main)">${resultData.status}:</strong> ${resultData.message}`;
            } else {
                // Generic safe
                checkerResult.classList.add('result-safe');
                checkerResult.innerHTML = `<span style="font-size:1.5rem">✅</span> <strong style="color:var(--text-main)">SAFE:</strong> No major interactions detected. Standard 10-minute dispensing gaps apply.`;
            }
        });
    }

    // --- NEW: INTERACTIVE CAREGIVER DASHBOARD MOCK DATA --- 
    
    // Core Mock Database
    const mockAppSyncData = {
        patientName: "Eleanor Vance",
        batteryLevel: "82%",
        adherenceRate: "93%",
        medications: [
            { id: 101, time: "08:00 AM", name: "Lisinopril (Blood Pressure)", status: "taken", dosage: "1 Tablet" },
            { id: 102, time: "12:00 PM", name: "Vitamin D3 Supplement", status: "missed", dosage: "2 Tablets" },
            { id: 103, time: "06:00 PM", name: "Atorvastatin (Cholesterol)", status: "pending", dosage: "1 Tablet" },
            { id: 104, time: "09:00 PM", name: "Melatonin", status: "upcoming", dosage: "1 Tablet" }
        ]
    };

    // Render Dashboard Function
    function renderDashboard() {
        const patientNameEl = document.getElementById('mockPatientName');
        const batteryEl = document.getElementById('mockBattery');
        const adherenceEl = document.getElementById('mockAdherence');
        const scheduleListEl = document.getElementById('mockScheduleList');

        if (!scheduleListEl) return; // Exit if elements don't exist

        // Populate header data
        patientNameEl.textContent = mockAppSyncData.patientName;
        batteryEl.textContent = mockAppSyncData.batteryLevel;
        adherenceEl.textContent = mockAppSyncData.adherenceRate;

        // Clear existing list
        scheduleListEl.innerHTML = '';

        // Generate schedule HTML dynamically
        mockAppSyncData.medications.forEach(med => {
            const itemEl = document.createElement('div');
            itemEl.className = `schedule-item clay-box ${med.status}`;
            
            // Build inner HTML based on medication status
            let actionHtml = '';
            if (med.status === 'taken') {
                actionHtml = `<span style="color: #10b981; font-weight: bold;">✔ Taken</span>`;
            } else if (med.status === 'missed') {
                actionHtml = `
                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px;">
                        <span style="color: #ef4444; font-weight: bold;">✖ Missed</span>
                        <button class="btn clay-btn small" style="padding: 6px 12px; font-size: 0.8rem;" onclick="triggerRemind(${med.id})">Send Alert</button>
                    </div>`;
            } else if (med.status === 'pending') {
                actionHtml = `<button class="btn clay-btn primary" style="padding: 10px 16px; font-size: 0.9rem;" onclick="markTaken(${med.id})">Dispense Now</button>`;
            } else {
                actionHtml = `<span style="color: var(--text-light);">⏳ Upcoming</span>`;
            }

            itemEl.innerHTML = `
                <div class="med-info">
                    <strong>${med.time}</strong>
                    <span style="color: var(--text-main); font-weight: bold;">${med.name}</span><br>
                    <span style="font-size: 0.9rem; color: var(--text-light);">${med.dosage}</span>
                </div>
                <div class="med-status">
                    ${actionHtml}
                </div>
            `;
            scheduleListEl.appendChild(itemEl);
        });
    }

    // Global Functions for inline onclick handlers
    window.markTaken = function(id) {
        const med = mockAppSyncData.medications.find(m => m.id === id);
        if (med) {
            med.status = 'taken';
            
            // Update adherence artificially to show reactivity
            mockAppSyncData.adherenceRate = "96%"; 
            renderDashboard();
        }
    };

    window.triggerRemind = function(id) {
        const med = mockAppSyncData.medications.find(m => m.id === id);
        if (med) {
            alert(`A gentle audio/visual reminder has been sent to CareCompanion for: ${med.name}.`);
            // Change it from missed to pending so caregiver knows reminder is active
            med.status = 'pending'; 
            renderDashboard();
        }
    };

    // Initialize Dashboard App
    renderDashboard();

});