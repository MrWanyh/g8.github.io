// Handle menu search form submission
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

const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('rating-text');
let selectedRating = 0;

const pageKey = 'foodRating_' + window.location.pathname.split('/').pop();

// Text descriptions for each rating
const ratings = {
    1: "Terrible",
    2: "Could’ve been better",
    3: "OK",
    4: "Good",
    5: "Excellent"
};

// Load stored rating from localStorage if exists
const storedRating = localStorage.getItem(pageKey);
if (storedRating) {
    selectedRating = storedRating;
    highlightStars(selectedRating, true);
    ratingText.textContent = ratings[selectedRating];
}

stars.forEach(star => {
    star.addEventListener('mouseover', function () {
        resetStars();
        highlightStars(this.getAttribute('data-value'));
    });

    star.addEventListener('mouseout', function () {
        resetStars();
        if (selectedRating) highlightStars(selectedRating, true);
    });

    star.addEventListener('click', function () {
        selectedRating = this.getAttribute('data-value');
        ratingText.textContent = ratings[selectedRating];
        highlightStars(selectedRating, true);
        localStorage.setItem(pageKey, selectedRating); 
    });
});

function highlightStars(count, permanent = false) {
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= count) {
            star.classList.add(permanent ? 'selected' : 'hovered');
        }
    });
}

function resetStars() {
    stars.forEach(star => star.classList.remove('hovered', 'selected'));
}

const clearBtn = document.getElementById('clearRatingBtn');

clearBtn.addEventListener('click', function () {
    // Reset everything when Clear Rating is clicked
    selectedRating = 0;
    ratingText.textContent = "Select your rating";  
    localStorage.removeItem(pageKey);  
    resetStars();  
});


$(document).ready(function () {
    const $bookmarkBtn = $('#bookmark-page'); 

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

    // Toggle bookmark state when clicked
    $bookmarkBtn.click(function () {
        const isBookmarked = localStorage.getItem('bookmarkedPage') === 'cuisine';

        if (isBookmarked) {
            localStorage.removeItem('bookmarkedPage');
            $(this).html('<i class="far fa-bookmark"></i> Bookmark This Page');
            showToast('Bookmark removed');
        } else {
            localStorage.setItem('bookmarkedPage', 'cuisine');
            $(this).html('<i class="fas fa-bookmark"></i> Bookmarked!');
            showToast('Page bookmarked!');
        }
    });

    if (localStorage.getItem('bookmarkedPage') === 'cuisine') {
        $bookmarkBtn.html('<i class="fas fa-bookmark"></i> Bookmarked!');
    }

    // Toast function to show notifications
    function showToast(message) {
        const toast = $('#liveToast');
        toast.find('.toast-body').text(message);  
        const toastElement = new bootstrap.Toast(toast[0]);
        toastElement.show();
    }

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
    

});

document.addEventListener("DOMContentLoaded", function () {
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    const bookmarkNotification = document.getElementById('bookmarkNotification');

    // Check if the bookmark exists in localStorage
    const isBookmarked = localStorage.getItem('isBookmarked') === 'true';

    bookmarkBtn.addEventListener('click', function () {
        // Save the bookmark status to localStorage
        localStorage.setItem('isBookmarked', 'true');
        bookmarkBtn.textContent = 'Bookmarked';
        bookmarkBtn.disabled = true; // Disable button after bookmarking
        bookmarkNotification.style.display = 'block';
        
        setTimeout(() => {
            bookmarkNotification.style.display = 'none';
        }, 2000);
    });
});



