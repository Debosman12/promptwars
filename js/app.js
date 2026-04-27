document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressBar = document.getElementById('overall-progress');
    const assistantMsg = document.getElementById('assistant-msg');

    // Fun facts and tips for each stage
    const assistantTips = {
        '1': "Registration is the first and most vital step! Fun fact: some states allow same-day registration at the polls.",
        '2': "Primaries help narrow down the field. Turnout here is usually lower, so your vote packs a massive punch!",
        '3': "Election day is always the Tuesday following the first Monday in November. Plan your voting trip early!",
        '4': "Results can take days to finalize, especially with mail-in ballots. The Electoral College formally casts votes in December."
    };

    // Calculate progress based on the furthest active item
    const updateProgress = () => {
        const total = timelineItems.length;
        let activeCount = 0;
        
        timelineItems.forEach((item, index) => {
            if (item.classList.contains('active')) {
                activeCount = Math.max(activeCount, index + 1);
            }
        });

        // Add 10% progress just for landing on the page
        const percentage = total === 0 ? 0 : Math.max(10, (activeCount / total) * 100);
        progressBar.style.width = `${percentage}%`;
    };

    // Initialize progress bar
    setTimeout(() => updateProgress(), 100);

    // Add click listeners to timeline items
    timelineItems.forEach((item) => {
        item.addEventListener('click', () => {
            const isCurrentlyActive = item.classList.contains('active');
            
            // Close other items for a cleaner accordion effect
            timelineItems.forEach(other => {
                if(other !== item) {
                    other.classList.remove('active');
                }
            });

            // Toggle clicked item
            if (!isCurrentlyActive) {
                item.classList.add('active');
                
                // Update assistant message with animation
                const stage = item.getAttribute('data-stage');
                assistantMsg.style.opacity = 0;
                
                setTimeout(() => {
                    assistantMsg.textContent = assistantTips[stage];
                    assistantMsg.style.opacity = 1;
                }, 300);

                // Smooth scroll item into view
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 350);
            } else {
                item.classList.remove('active');
                
                // Reset assistant message
                assistantMsg.style.opacity = 0;
                setTimeout(() => {
                    assistantMsg.textContent = "Tap any stage above to learn more about it!";
                    assistantMsg.style.opacity = 1;
                }, 300);
            }

            updateProgress();
        });
    });
});
