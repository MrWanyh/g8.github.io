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

    // DARK MODE FUNCTIONALITY
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
    });

    // BOOKMARK FUNCTIONALITY
    $('#bookmark-page').click(function() {
        const isBookmarked = localStorage.getItem('bookmarkedPage') === 'cultureinsight';
        
        if(isBookmarked) {
            localStorage.removeItem('bookmarkedPage');
            $(this).html('<i class="far fa-bookmark"></i> Bookmark This Page');
            showToast('Bookmark removed');
        } else {
            localStorage.setItem('bookmarkedPage', 'cultureinsight');
            $(this).html('<i class="fas fa-bookmark"></i> Bookmarked!');
            showToast('Page bookmarked!');
        }
    });

    // Initialize bookmark button state
    if(localStorage.getItem('bookmarkedPage') === 'cultureinsight') {
        $('#bookmark-page').html('<i class="fas fa-bookmark"></i> Bookmarked!');
    }

    // IMAGE GALLERY MODAL
    $('.gallery-img').click(function() {
        const imgSrc = $(this).attr('src');
        const imgAlt = $(this).attr('alt');
        $('#modalImage').attr('src', imgSrc).attr('alt', imgAlt);
        $('#imageModal').modal('show');
    });

    // SECTION TRACKING
    $('.culture-section').on('click', function() {
        sessionStorage.setItem('lastCultureSection', $(this).attr('id'));
    });

    // Scroll to last viewed section if exists
    const lastSection = sessionStorage.getItem('lastCultureSection');
    if(lastSection) {
        setTimeout(() => {
            $('html, body').animate({
                scrollTop: $(`#${lastSection}`).offset().top - 20
            }, 500);
        }, 300);
    }

    // Toast function to show notifications
    function showToast(message) {
        const toast = $('#liveToast');
        toast.find('.toast-body').text(message);  // Update toast message
        const toastElement = new bootstrap.Toast(toast[0]);
        toastElement.show();
    }
});