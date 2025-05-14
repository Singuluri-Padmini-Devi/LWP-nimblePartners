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
    
    if (track && track.children.length > 0) {
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
    }
    
    // Call globe adjustment function
    adjustGlobeElements();
    
    // Add resize event listener
    window.addEventListener('resize', adjustGlobeElements);
});

// Function to adjust the globe elements
function adjustGlobeElements() {
    const topHalf = document.querySelector('.top-half');
    const video = document.querySelector('.video');
    const bottomHalf = document.querySelector('.bottom-half');
    const sphereWrapper = document.querySelector('.sphere-wrapper');
    
    if (!topHalf || !video || !bottomHalf) return;
    
    // First, get the natural dimensions of the top half image
    const topHalfNaturalWidth = topHalf.naturalWidth || 750; // Fallback if naturalWidth is not available
    const topHalfNaturalHeight = topHalf.naturalHeight || 624; // Fallback

    // Set width based on container
    const wrapperWidth = sphereWrapper.offsetWidth;
    const imageRatio = topHalfNaturalHeight / topHalfNaturalWidth;
    
    // Set video dimensions to match exactly with the top half image
    video.style.width = wrapperWidth + 'px';
    video.style.height = (wrapperWidth * imageRatio) + 'px';
    
    // Ensure the top half image has the same dimensions
    topHalf.style.width = wrapperWidth + 'px';
    topHalf.style.height = 'auto';
    
    // Get computed dimensions after setting
    const computedHeight = topHalf.offsetHeight;
    
    // Calculate the proper margin for the bottom half
    // This value needs to be adjusted based on the specific design
    // We use a percentage of the top half's height
    const overlapRatio = 0.34; // Adjust this based on your design
    bottomHalf.style.marginTop = (-computedHeight * overlapRatio) + 'px';
    bottomHalf.style.width = wrapperWidth + 'px';
    
    // If the gap between halves is still visible, fine-tune the margin
    // This might require adjustment based on testing
    const globeContent = document.querySelector('.globe-content');
    if (globeContent) {
        // Position the content relative to the sphere
        globeContent.style.marginTop = (-computedHeight * 0.22) + 'px'; // Adjust this percentage as needed
    }
    
    console.log('Globe adjusted:', {
        wrapperWidth,
        computedHeight,
        videoHeight: video.offsetHeight,
        bottomMargin: bottomHalf.style.marginTop
    });
}

// No need for additional carousel or event listener code as it's now included in the window.onload handler