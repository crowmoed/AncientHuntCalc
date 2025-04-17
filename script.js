document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let selectedSlots = new Set();
    let investedPoints = 0;
    const MAX_POINTS = 9;
    
    // Get DOM elements
    const pointsLeft = document.querySelector('.currency-icon');
    const slots = document.querySelectorAll('.offering-slot');
    const addOfferingBtn = document.querySelector('.add-offering-btn');
    const errorMessage = document.querySelector('.error-message');
    const pointsDisplay = document.querySelector('.points-display span');
    const sliderBar = document.querySelector('.slider-bar');
    const leftArrow = document.querySelector('.arrow-btn:first-child');
    const rightArrow = document.querySelector('.arrow-btn:last-child');
    
    // Initialize points display
    pointsDisplay.textContent = `${investedPoints}/${MAX_POINTS}`;
    
    // Add click handlers to slots
    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            if (selectedSlots.has(slot)) {
                selectedSlots.delete(slot);
                slot.style.backgroundColor = 'var(--purple-light)';
            } else {
                selectedSlots.add(slot);
                slot.style.backgroundColor = 'var(--purple-accent)';
            }
            
            // Update error message visibility
            errorMessage.style.display = selectedSlots.size === 0 ? 'block' : 'none';
        });
    });
    
    // Add offering button handler
    addOfferingBtn.addEventListener('click', () => {
        if (selectedSlots.size === 0) {
            errorMessage.style.display = 'block';
            addOfferingBtn.classList.add('shake');
            setTimeout(() => addOfferingBtn.classList.remove('shake'), 500);
        } else if (investedPoints >= MAX_POINTS) {
            errorMessage.textContent = 'Maximum points reached';
            errorMessage.style.display = 'block';
            addOfferingBtn.classList.add('shake');
            setTimeout(() => addOfferingBtn.classList.remove('shake'), 500);
        } else {
            // Reset slots
            selectedSlots.forEach(slot => {
                slot.style.backgroundColor = 'var(--purple-light)';
            });
            selectedSlots.clear();
            
            // Update points
            investedPoints = Math.min(investedPoints + selectedSlots.size, MAX_POINTS);
            pointsDisplay.textContent = `${investedPoints}/${MAX_POINTS}`;
            
            // Reset error message
            errorMessage.textContent = 'Offering must contain at least one item';
            errorMessage.style.display = 'none';
            
            // Show success feedback
            addOfferingBtn.style.backgroundColor = '#059669';
            setTimeout(() => {
                addOfferingBtn.style.backgroundColor = '#dc2626';
            }, 500);
        }
    });

    // Slider functionality
    let sliderValue = 0;
    
    function updateSlider(newValue) {
        sliderValue = Math.max(0, Math.min(100, newValue));
        sliderBar.style.width = `${}%`;
    }

    leftArrow.addEventListener('click', () => updateSlider(sliderValue - 100/9));
    rightArrow.addEventListener('click', () => updateSlider(sliderValue + 100/9));
}); 
