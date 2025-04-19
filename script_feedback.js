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
        const isBookmarked = localStorage.getItem('bookmarkedPage') === 'feedback';

        if (isBookmarked) {
            localStorage.removeItem('bookmarkedPage');
            $(this).html('<i class="far fa-bookmark"></i> Bookmark This Page');
            showToast('Bookmark removed');
        } else {
            localStorage.setItem('bookmarkedPage', 'feedback');
            $(this).html('<i class="fas fa-bookmark"></i> Bookmarked!');
            showToast('Page bookmarked!');
        }
    });

    // Initialize bookmark button state
    if (localStorage.getItem('bookmarkedPage') === 'feedback') {
        $bookmarkBtn.html('<i class="fas fa-bookmark"></i> Bookmarked!');
    }

    // Toast function to show notifications
    function showToast(message) {
        const toast = $('#liveToast');
        toast.find('.toast-body').text(message);  // Update toast message
        const toastElement = new bootstrap.Toast(toast[0]);
        toastElement.show();
    }
});

function closePopup() {
    const popup = document.getElementById("popup");
    const form = document.getElementById("feedbackForm");
    if (popup) popup.classList.remove("open-popup");
    if (form) form.reset();
}

document.addEventListener("DOMContentLoaded", function () {
    // Feedbck Form
    const popup = document.getElementById("popup");
    const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm && popup) {
        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }

            popup.classList.add("open-popup");
        });
    }

const bookmarkBtn = document.getElementById('bookmarkBtn');
const bookmarkNotification = document.getElementById('bookmarkNotification');
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

window.addEventListener("load", executeCodes);
});


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
