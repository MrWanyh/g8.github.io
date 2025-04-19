document.querySelector('.menu-search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('menu-search-input').value.trim().toLowerCase();

    // Map of possible keywords to pages
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

    const $bookmarkBtn = $('#bookmark-page'); // You were missing this line to select the button

        // Bookmark click logic
    $bookmarkBtn.click(function () {
        const isBookmarked = localStorage.getItem('bookmarkedPage') === 'Destination';

        if (isBookmarked) {
            localStorage.removeItem('bookmarkedPage');
            $(this).html('<i class="far fa-bookmark"></i> Bookmark This Page');
            showToast('Bookmark removed');
        } else {
            localStorage.setItem('bookmarkedPage', 'Destination');
            $(this).html('<i class="fas fa-bookmark"></i> Bookmarked!');
            showToast('Page bookmarked!');
        }
    });

    // Initialize bookmark button state
    if (localStorage.getItem('bookmarkedPage') === 'Destination') {
        $bookmarkBtn.html('<i class="fas fa-bookmark"></i> Bookmarked!');
    }

    // Toast function to show notifications
    function showToast(message) {
        const toast = $('#liveToast');
        toast.find('.toast-body').text(message);  // Update toast message
        const toastElement = new bootstrap.Toast(toast[0]);
        toastElement.show();
    }

    // Local Storage 
    const cachedData = localStorage.getItem('cachedDestinations');
    if (cachedData) {
        renderDestinations(JSON.parse(cachedData));
    } else {
        // API
        const mockData = [
            { 
                name: "George Town Street Art", 
                image: "../images/GeorgeTownStreetArt.jpg",
                link: "penang.html",
                description: "UNESCO World Heritage site with vibrant murals."
            },
            { 
                name: "Petronas Twin Towers", 
                image: "../images/PetronasTwinTower.jpg",
                link: "kualalumpur.html",
                description: "Iconic twin skyscrapers in Kuala Lumpur."
            },
            { 
                name: "Batu Caves", 
                image: "../images/BatuCaves.jpg",
                link: "selangor.html",
                description: "Limestone caves with Hindu temples."
            },
            { 
                name: "Mount Kinabalu", 
                image: "../images/MountKinabalu.jpg",
                link: "sabah.html",
                description: "Highest peak in Southeast Asia."
            }
        ];
        // Local Storage
        localStorage.setItem('cachedDestinations', JSON.stringify(mockData));
        renderDestinations(mockData);
    }

    //  Session Storage
    sessionStorage.setItem('lastVisit', new Date().toISOString());


    function renderDestinations(data) {
        let html = '';
        data.forEach(item => {
            html += `
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="card h-100">
                        <a href="${item.link}">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        });
        $('#destination-cards').html(html);
    }

    // API
    function fetchRealData() {
        $.get("https://api.example.com/destinations", function(data) {
            localStorage.setItem('cachedDestinations', JSON.stringify(data));
            renderDestinations(data);
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const bookmarkNotification = document.getElementById('bookmarkNotification');
    
        // Check if the bookmark exists in localStorage
        const isBookmarked = localStorage.getItem('isBookmarked') === 'true';
    
        // Add event listener to bookmark button
        bookmarkBtn.addEventListener('click', function () {
            // Save the bookmark status to localStorage
            localStorage.setItem('isBookmarked', 'true');
            bookmarkBtn.textContent = 'Bookmarked';
            bookmarkBtn.disabled = true; // Disable button after bookmarking
            
            // Show success notification
            bookmarkNotification.style.display = 'block';
            
            // Hide notification after 2 seconds
            setTimeout(() => {
                bookmarkNotification.style.display = 'none';
            }, 2000);
        });
        
    });
});