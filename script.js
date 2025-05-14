// script.js

window.addEventListener('load', () => {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navbar.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Partners carousel
    const track = document.getElementById('carousel-track');
    const carousel = document.getElementById('partners-carousel');
    const cards = Array.from(track.children);
    const cardCount = cards.length;
    const cardStyle = getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
  
    // Clone all cards once to enable seamless scroll
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  
    let position = 0;
    let animationId;
  
    function animate() {
      position -= 3; // Speed: 1px per frame
  
      // When we've scrolled the width of one card, move the first card to the end
      if (Math.abs(position) >= cardWidth) {
        position += cardWidth;
        const firstCard = track.firstElementChild;
        track.appendChild(firstCard);
      }
  
      track.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    }
  
    animate();
  
});