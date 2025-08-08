// Main JavaScript functionality for Tufoti7 AI website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Hero buttons functionality
    const getStartedBtn = document.getElementById('getStartedBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    
    getStartedBtn.addEventListener('click', function() {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    learnMoreBtn.addEventListener('click', function() {
        document.querySelector('#services').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Animate service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe feature cards
    document.querySelectorAll('.feature').forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(feature);
    });
    
    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (target >= 1000 ? '+' : target === 99.9 ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 500) {
                    element.textContent = '500+';
                } else if (target === 99.9) {
                    element.textContent = '99.9%';
                } else {
                    element.textContent = '24/7';
                }
            }
        }
        
        updateCounter();
    }
    
    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h3');
                const text = statNumber.textContent;
                
                if (text.includes('500')) {
                    animateCounter(statNumber, 500);
                } else if (text.includes('99.9')) {
                    animateCounter(statNumber, 99.9);
                } else if (text.includes('24/7')) {
                    statNumber.textContent = '24/7';
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
    
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const chatIcon = chatbotToggle.querySelector('.chat-icon');
    const closeIcon = chatbotToggle.querySelector('.close-icon');
    
    // Toggle chatbot
    chatbotToggle.addEventListener('click', function() {
        const isActive = chatbotWidget.classList.contains('active');
        
        if (isActive) {
            closeChatbot();
        } else {
            openChatbot();
        }
    });
    
    // Close chatbot
    chatClose.addEventListener('click', closeChatbot);
    
    function openChatbot() {
        chatbotWidget.classList.add('active');
        chatbotToggle.classList.add('active');
        chatIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        chatInput.focus();
    }
    
    function closeChatbot() {
        chatbotWidget.classList.remove('active');
        chatbotToggle.classList.remove('active');
        chatIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        if (sender === 'bot') {
            avatar.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                </svg>
            `;
        } else {
            avatar.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `;
        }
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Simple bot responses
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('whatsapp') || lowerMessage.includes('whats app')) {
            return "Our WhatsApp bots provide 24/7 customer support, lead qualification, and order processing. They can handle multiple conversations simultaneously and integrate with your existing systems. Would you like to know more about pricing or implementation?";
        }
        
        if (lowerMessage.includes('chatbot') || lowerMessage.includes('chat bot')) {
            return "Our website chatbots use advanced NLP to engage visitors, answer questions, and convert leads. They support multiple languages and integrate with popular CRM systems. Perfect for improving customer experience!";
        }
        
        if (lowerMessage.includes('automation') || lowerMessage.includes('automate')) {
            return "We specialize in process automation that streamlines repetitive tasks, optimizes workflows, and handles data processing. Our solutions can save your business hours of manual work daily. What processes would you like to automate?";
        }
        
        if (lowerMessage.includes('ai agent') || lowerMessage.includes('agents')) {
            return "Our custom AI agents are tailored to your specific industry and business needs. They can handle complex tasks, learn from interactions, and scale with your business. Each agent is trained on your data and processes.";
        }
        
        if (lowerMessage.includes('upgrade') || lowerMessage.includes('transform') || lowerMessage.includes('ai software')) {
            return "We specialize in upgrading existing software products and websites with AI capabilities! We can transform your legacy systems, add intelligent features to mobile apps, enhance websites with AI, and integrate machine learning into any platform. What software would you like to make AI-powered?";
        }
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            return "Our pricing varies based on your specific needs and scale. We offer flexible packages starting from basic automation to enterprise solutions. Would you like to schedule a free consultation to discuss your requirements?";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
            return "I'd be happy to connect you with our team! You can reach us at hello@tufoti7ai.com or call +1 (555) 123-4567. We also offer free consultations to discuss your automation needs. Would you like me to help you schedule one?";
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! Welcome to Tufoti7 AI. We're experts in business automation using AI. I can help you learn about our WhatsApp bots, website chatbots, process automation, and custom AI agents. What interests you most?";
        }
        
        if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
            return "I'm here to help! I can provide information about our automation services, pricing, implementation process, or connect you with our team. What would you like to know about Tufoti7 AI?";
        }
        
        // Default response
        return "That's a great question! Our AI automation solutions can help businesses streamline operations and improve efficiency. We specialize in WhatsApp bots, website chatbots, process automation, and custom AI agents. Would you like to know more about any of these services, or shall I connect you with our team for a detailed discussion?";
    }
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Send message on button click
    chatSend.addEventListener('click', sendMessage);
    
    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const chatIcon = chatbotToggle.querySelector('.chat-icon');
    const closeIcon = chatbotToggle.querySelector('.close-icon');
    
    // Toggle chatbot
    chatbotToggle.addEventListener('click', function() {
        const isActive = chatbotWidget.classList.contains('active');
        
        if (isActive) {
            closeChatbot();
        } else {
            openChatbot();
        }
    });
    
    // Close chatbot
    chatClose.addEventListener('click', closeChatbot);
    
    function openChatbot() {
        chatbotWidget.classList.add('active');
        chatbotToggle.classList.add('active');
        chatIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        chatInput.focus();
    }
    
    function closeChatbot() {
        chatbotWidget.classList.remove('active');
        chatbotToggle.classList.remove('active');
        chatIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        if (sender === 'bot') {
            avatar.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                </svg>
            `;
        } else {
            avatar.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `;
        }
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Simple bot responses
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('whatsapp') || lowerMessage.includes('whats app')) {
            return "Our WhatsApp bots provide 24/7 customer support, lead qualification, and order processing. They can handle multiple conversations simultaneously and integrate with your existing systems. Would you like to know more about pricing or implementation?";
        }
        
        if (lowerMessage.includes('chatbot') || lowerMessage.includes('chat bot')) {
            return "Our website chatbots use advanced NLP to engage visitors, answer questions, and convert leads. They support multiple languages and integrate with popular CRM systems. Perfect for improving customer experience!";
        }
        
        if (lowerMessage.includes('automation') || lowerMessage.includes('automate')) {
            return "We specialize in process automation that streamlines repetitive tasks, optimizes workflows, and handles data processing. Our solutions can save your business hours of manual work daily. What processes would you like to automate?";
        }
        
        if (lowerMessage.includes('ai agent') || lowerMessage.includes('agents')) {
            return "Our custom AI agents are tailored to your specific industry and business needs. They can handle complex tasks, learn from interactions, and scale with your business. Each agent is trained on your data and processes.";
        }
        
        if (lowerMessage.includes('upgrade') || lowerMessage.includes('transform') || lowerMessage.includes('ai software')) {
            return "We specialize in upgrading existing software products and websites with AI capabilities! We can transform your legacy systems, add intelligent features to mobile apps, enhance websites with AI, and integrate machine learning into any platform. What software would you like to make AI-powered?";
        }
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            return "Our pricing varies based on your specific needs and scale. We offer flexible packages starting from basic automation to enterprise solutions. Would you like to schedule a free consultation to discuss your requirements?";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
            return "I'd be happy to connect you with our team! You can reach us at hello@tufoti7ai.com or call +1 (555) 123-4567. We also offer free consultations to discuss your automation needs. Would you like me to help you schedule one?";
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! Welcome to Tufoti7 AI. We're experts in business automation using AI. I can help you learn about our WhatsApp bots, website chatbots, process automation, and custom AI agents. What interests you most?";
        }
        
        if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
            return "I'm here to help! I can provide information about our automation services, pricing, implementation process, or connect you with our team. What would you like to know about Tufoti7 AI?";
        }
        
        // Default response
        return "That's a great question! Our AI automation solutions can help businesses streamline operations and improve efficiency. We specialize in WhatsApp bots, website chatbots, process automation, and custom AI agents. Would you like to know more about any of these services, or shall I connect you with our team for a detailed discussion?";
    }
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Send message on button click
    chatSend.addEventListener('click', sendMessage);
});