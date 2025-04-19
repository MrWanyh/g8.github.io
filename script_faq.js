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
    
    $(document).ready(function () {
    const $bookmarkBtn = $('#bookmark-page'); // You were missing this line to select the button

        // Bookmark click logic
    $bookmarkBtn.click(function () {
        const isBookmarked = localStorage.getItem('bookmarkedPage') === 'Faq';

        if (isBookmarked) {
            localStorage.removeItem('bookmarkedPage');
            $(this).html('<i class="far fa-bookmark"></i> Bookmark This Page');
            showToast('Bookmark removed');
        } else {
            localStorage.setItem('bookmarkedPage', 'Faq');
            $(this).html('<i class="fas fa-bookmark"></i> Bookmarked!');
            showToast('Page bookmarked!');
        }
    });

    // Initialize bookmark button state
    if (localStorage.getItem('bookmarkedPage') === 'Faq') {
        $bookmarkBtn.html('<i class="fas fa-bookmark"></i> Bookmarked!');
    }

    // Toast function to show notifications
    function showToast(message) {
        const toast = $('#liveToast');
        toast.find('.toast-body').text(message);  // Update toast message
        const toastElement = new bootstrap.Toast(toast[0]);
        toastElement.show();
    }

        // Show/hide button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('#scrollToTopBtn').fadeIn();
            } else {
                $('#scrollToTopBtn').fadeOut();
            }
        });
    
        // Scroll to top when clicked
        $('#scrollToTopBtn').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });

        $('.accordion-button').click(function() {
            const questionId = $(this).attr('data-bs-target');
            document.cookie = '${questionId}=read; max-age=86400'; // 24hours
        });
    
    });    

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