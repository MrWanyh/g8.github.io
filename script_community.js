// Search functionality (unchanged)
document.querySelector('.menu-search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('menu-search-input').value.trim().toLowerCase();

    const pages = {
        'home': 'Index.html',
        'top destinations': 'Destination.html',
        'culture insights': 'cultureinsight.html',
        'cuisines': 'cuisine.html',
        'faq': 'Faq.html',
        'feedback': 'Feedback.html',
        'community': 'community.html',
        'about us': 'about_contact.html',
        'contact us': 'about_contact.html'
    };

    if (pages[query]) {
        window.location.href = pages[query];
    } else {
        alert("Page not found. Try searching 'FAQ', 'Home', 'Cuisines', etc.");
    }
});

$(document).ready(function() {

    // Show/hide scroll-to-top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#scrollToTopBtn').fadeIn();
        } else {
            $('#scrollToTopBtn').fadeOut();
        }
    });

    $('#scrollToTopBtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // INITIALIZATION
    const STORAGE_KEY = "culturalPosts";
    const TOAST_DELAY = 3000;
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    // Initialize Toast
    const toast = new bootstrap.Toast(document.getElementById('liveToast'));
    
    // LOAD INITIAL DATA
    function initializeData() {
        // Load saved posts or sample data
        if (posts.length === 0) {
            posts = [
                {
                    name: "Visitor",
                    location: "Batu Caves",
                    locationValue: "batu-caves",
                    story: "Climbed the 272 colorful steps and witnessed the morning Hindu rituals. The monkey population was very active but remember not to feed them!",
                    culturalTip: "Remove your shoes before entering temple areas.",
                    date: "15/6/2023"
                },
                {
                    name: "Explorer",
                    location: "George Town",
                    locationValue: "georgetown",
                    story: "The street art trail was amazing. Tried the famous Penang Char Kway Teow at a local hawker stall - absolutely delicious!",
                    culturalTip: "Try the Peranakan (Nyonya) cuisine while you're here.",
                    date: "10/6/2023"
                }
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        }
        
        // Display all posts
        posts.forEach(post => displayPost(post));
        
        // Restore last selected location
        const lastLocation = sessionStorage.getItem('lastLocation');
        if (lastLocation) {
            $('#location').val(lastLocation);
        }
        
        // Initialize bookmark state
        updateBookmarkState();
    }
    
    // DARK MODE FUNCTIONALITY
    function setupDarkMode() {
        const darkModeSwitch = $('#darkModeSwitch');
        
        // Check for saved preference
        if(localStorage.getItem('darkMode') === 'true') {
            $('body').addClass('dark-mode');
            darkModeSwitch.prop('checked', true);
        }
        
        // Toggle dark mode
        darkModeSwitch.change(function() {
            $('body').toggleClass('dark-mode');
            localStorage.setItem('darkMode', $(this).is(':checked'));
            showToast('Dark mode ' + ($(this).is(':checked') ? 'enabled' : 'disabled'));
        });
    }
    
    // BOOKMARK FUNCTIONALITY
    function setupBookmark() {
        $('#bookmark-page').click(function() {
            const isBookmarked = localStorage.getItem('bookmarkedPage') === 'community';
            
            if(isBookmarked) {
                localStorage.removeItem('bookmarkedPage');
                showToast('Bookmark removed');
            } else {
                localStorage.setItem('bookmarkedPage', 'community');
                showToast('Page bookmarked!');
            }
            updateBookmarkState();
        });
    }
    
    function updateBookmarkState() {
        const isBookmarked = localStorage.getItem('bookmarkedPage') === 'community';
        $('#bookmark-page').html(
            `<i class="far ${isBookmarked ? 'fa-bookmark' : 'fa-bookmark'}"></i> ${isBookmarked ? 'Bookmarked!' : 'Bookmark This Page'}`
        );
    }
    
    // FORM HANDLING
    function setupForm() {
        $('#experience-form').submit(function(e) {
            e.preventDefault();
            
            // Get form values
            const name = $('#name').val().trim();
            const location = $('#location').val();
            const story = $('#story').val().trim();
            
            // Validate form
            if (!name || !location || !story) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            // Create post object
            const post = {
                name,
                location: $('#location option:selected').text(),
                locationValue: location,
                story,
                culturalTip: getCulturalTip(location),
                date: new Date().toLocaleDateString()
            };
            
            // Save and display post
            savePost(post);
            displayPost(post);
            
            // Reset form
            $(this).trigger('reset');
            showToast('Story shared successfully!');
            
            // Save last selected location
            sessionStorage.setItem('lastLocation', location);
        });
    }
    
    // POST MANAGEMENT
    function savePost(post) {
        posts.unshift(post); // Add new post to beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
    
    function displayPost(post) {
        const postHTML = `
            <div class="post-card">
                <h3>${post.name} visited ${post.location}</h3>
                <p>${post.story}</p>
                ${post.culturalTip ? `
                <div class="cultural-tip">
                    <strong>Cultural Tip:</strong> ${post.culturalTip}
                </div>` : ''}
                <small>Posted on ${post.date}</small>
            </div>
        `;
        $('#posts-container').prepend(postHTML);
    }
    
    function getCulturalTip(location) {
        const tips = {
            "batu-caves": "Remember to remove shoes before entering temple areas and don't feed the monkeys!",
            "georgetown": "Try the local Peranakan (Nyonya) cuisine and respect the street art!",
            "petronas": "Dress smart-casual if visiting the skybridge and respect prayer times at the mosque.",
            "kinabalu": "Follow the mountain guide's instructions and don't remove any plants or rocks."
        };
        return tips[location] || "";
    }

    // UTILITY FUNCTIONS
    function showToast(message, type = 'success') {
        const toast = $('#liveToast');
        toast.find('.toast-body').text(message);
        toast.removeClass('bg-success bg-danger').addClass(`bg-${type === 'error' ? 'danger' : 'success'}`);
        toast.toast('show');
        
        // Auto-hide after delay
        setTimeout(() => {
            toast.toast('hide');
        }, TOAST_DELAY);
    }
    
    // INITIALIZE ALL COMPONENTS
    setupDarkMode();
    setupBookmark();
    setupForm();
    initializeData();
    
});