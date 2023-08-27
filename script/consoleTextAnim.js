// Function to animate text typing and deleting
function consoleText(words, id) {
    // Get the target element for displaying the animated text
    const target = document.getElementById(id);

    // Initialize animation state variables
    let letterCount = 0;
    let currentWordIndex = 0;
    let currentWord = '';
    let isDeleting = false;

    // Recursive function to simulate typing and deleting animation
    function type() {
        const text = words[currentWordIndex];

        // Determine the current word based on typing or deleting phase
        currentWord = isDeleting ? text.slice(0, --letterCount) : text.slice(0, ++letterCount);
        target.textContent = currentWord;

        // Set typing speeds for different animation phases
        const typingSpeed = isDeleting ? 40 : 120;
        const startDeletingSpeed = 1000;
        const endDeletingSpeed = 500;

        // Check animation phase and schedule the next step
        if (!isDeleting && currentWord === text) {
            isDeleting = true; // Start deleting phase
            setTimeout(type, startDeletingSpeed); // Schedule deletion
        } else if (isDeleting && currentWord === '') {
            isDeleting = false; // Switch to typing phase
            currentWordIndex = (currentWordIndex + 1) % words.length; // Move to next word
            setTimeout(type, endDeletingSpeed); // Schedule typing next word
        } else {
            setTimeout(type, typingSpeed); // Continue typing or deleting letters
        }
    }

    type(); // Start the initial animation
}

// Call the animation function with specified words and target element ID
consoleText(['3D Developer', 'Image Developer'], 'jobTextAnimate');
