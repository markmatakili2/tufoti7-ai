// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
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
    }
    
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
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for subscribing! You\'ll receive our latest AI automation insights.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Load more articles functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading more articles
            setTimeout(() => {
                alert('More articles would be loaded here in a real implementation!');
                this.textContent = 'Load More Articles';
                this.disabled = false;
            }, 1500);
        });
    }
    
    // Animate article cards on scroll
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
    
    // Observe article cards
    document.querySelectorAll('.article-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Chatbot functionality (reused from main site)
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const chatIcon = chatbotToggle?.querySelector('.chat-icon');
    const closeIcon = chatbotToggle?.querySelector('.close-icon');
    
    if (chatbotToggle && chatbotWidget) {
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
        if (chatClose) {
            chatClose.addEventListener('click', closeChatbot);
        }
        
        function openChatbot() {
            chatbotWidget.classList.add('active');
            chatbotToggle.classList.add('active');
            if (chatIcon) chatIcon.style.display = 'none';
            if (closeIcon) closeIcon.style.display = 'block';
            if (chatInput) chatInput.focus();
        }
        
        function closeChatbot() {
            chatbotWidget.classList.remove('active');
            chatbotToggle.classList.remove('active');
            if (chatIcon) chatIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
        }
        
        // Send message
        function sendMessage() {
            if (!chatInput) return;
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
            if (!chatMessages) return;
            
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
            
            if (lowerMessage.includes('upgrade') || lowerMessage.includes('transform') || lowerMessage.includes('ai software')) {
                return "Our AI software upgrade service transforms existing applications into intelligent platforms! We can add AI features to websites, mobile apps, CRMs, and any software. Check out our featured article about legacy system transformation!";
            }
            
            if (lowerMessage.includes('blog') || lowerMessage.includes('article')) {
                return "Great! You're reading our blog. We regularly publish insights about AI automation, chatbots, and business optimization. Is there a specific topic you'd like to learn more about?";
            }
            
            if (lowerMessage.includes('whatsapp') || lowerMessage.includes('whats app')) {
                return "Our WhatsApp bots provide 24/7 customer support, lead qualification, and order processing. Check out our featured article about WhatsApp automation for detailed insights!";
            }
            
            if (lowerMessage.includes('chatbot') || lowerMessage.includes('chat bot')) {
                return "Our website chatbots use advanced NLP to engage visitors and convert leads. We have several articles about chatbot best practices and ROI analysis. Would you like specific recommendations?";
            }
            
            if (lowerMessage.includes('automation') || lowerMessage.includes('automate')) {
                return "Process automation is one of our specialties! Check out our article '10 Business Processes You Should Automate Today' for actionable insights. What processes are you looking to automate?";
            }
            
            if (lowerMessage.includes('roi') || lowerMessage.includes('return')) {
                return "ROI is crucial for automation projects. Our case study shows how AI chatbots deliver 400% ROI in the first year. Would you like to discuss how we can calculate potential ROI for your business?";
            }
            
            // Default response
            return "Thanks for visiting our blog! I can help you learn more about our AI automation services or guide you to relevant articles. What would you like to know about?";
        }
        
        // Send message on Enter key
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        // Send message on button click
        if (chatSend) {
            chatSend.addEventListener('click', sendMessage);
        }
    }
});

// Function to handle article clicks
function openArticle(articleId) {
    // In a real implementation, this would navigate to individual article pages
    // For now, we'll show an alert with article information
    
    const articles = {
        'ai-upgrade-legacy-systems': {
            title: 'How to Transform Your Legacy Software with AI: A Complete Upgrade Guide',
            description: 'This comprehensive guide shows you how to breathe new life into existing software by integrating AI capabilities. Learn about API integration, machine learning models, and step-by-step transformation strategies that have helped businesses increase efficiency by 40% and user engagement by 250%.'
        },
        'whatsapp-automation-2024': {
            title: 'The Complete Guide to WhatsApp Business Automation in 2024',
            description: 'This comprehensive guide covers everything you need to know about implementing WhatsApp automation for your business, including setup, best practices, and real case studies showing 300% engagement increases.'
        },
        'website-ai-integration': {
            title: '5 Ways to Make Your Website AI-Powered in 2024',
            description: 'Transform your static website into an intelligent platform with personalized content, smart recommendations, chatbots, and automated user interactions that increase conversions by 150%.'
        },
        'mobile-app-ai-features': {
            title: 'Adding Smart AI Features to Your Mobile App',
            description: 'Step-by-step guide to integrating voice recognition, image analysis, predictive features, and smart notifications into existing mobile applications without rebuilding from scratch.'
        },
        'ecommerce-ai-personalization': {
            title: 'Upgrading Your E-commerce Store with AI Personalization',
            description: 'Boost sales by 180% with AI-powered product recommendations, dynamic pricing, personalized shopping experiences, and intelligent inventory management.'
        },
        'crm-ai-enhancement': {
            title: 'Transforming Your CRM with Intelligent AI Features',
            description: 'Add predictive lead scoring, automated follow-ups, smart customer insights, and intelligent data analysis to your existing CRM system for 200% better conversion rates.'
        },
        'database-ai-optimization': {
            title: 'Making Your Database Smarter with AI Analytics',
            description: 'Unlock hidden insights and automate data analysis in your existing database systems with AI-powered tools, predictive analytics, and intelligent reporting.'
        },
        'api-ai-enhancement': {
            title: 'Supercharging Your APIs with AI Capabilities',
            description: 'Add intelligent processing, natural language understanding, predictive analytics, and smart caching to your existing API endpoints for enhanced performance.'
        },
        'saas-ai-transformation': {
            title: 'Converting Your SaaS Product into an AI-Powered Platform',
            description: 'Complete transformation guide for adding machine learning, automation, intelligent features, and AI-driven insights to existing SaaS applications.'
        }
    };
    
    const article = articles[articleId];
    if (article) {
        alert(`Opening: ${article.title}\n\n${article.description}\n\nIn a full implementation, this would navigate to the complete article page.`);
    } else {
        alert('Article not found. In a real implementation, this would show a 404 page.');
    }
}