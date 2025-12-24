// ========================================
// SEARCH BADGES - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const searchBadgesContainer = document.getElementById('searchBadges');

    if (!searchBadgesContainer) return;

    // Remove badge functionality
    function setupBadgeRemoval() {
        const badgeRemoveButtons = document.querySelectorAll('.badge-remove');
        badgeRemoveButtons.forEach(button => {
            button.addEventListener('click', function() {
                const badge = this.closest('.badge-item');
                badge.remove();

                // Hide container if no badges left
                const remainingBadges = searchBadgesContainer.querySelectorAll('.badge-item');
                if (remainingBadges.length === 0) {
                    searchBadgesContainer.style.display = 'none';
                }

                // Re-initialize icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }

    // Initialize badge removal
    setupBadgeRemoval();

    // Function to add new badge
    window.addSearchBadge = function(text) {
        const badge = document.createElement('div');
        badge.className = 'badge-item';
        badge.innerHTML = `
            ${text}
            <button class="badge-remove">
                <i data-lucide="x"></i>
            </button>
        `;

        searchBadgesContainer.appendChild(badge);
        searchBadgesContainer.style.display = 'flex';

        // Re-initialize icons and event listeners
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        setupBadgeRemoval();
    };
});
