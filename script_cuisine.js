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

    // Initialize bookmark button state
    if (localStorage.getItem('bookmarkedPage') === 'cuisine') {
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

// Add food to local storage
function addToFavorites(foodName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(foodName)) {
        favorites.push(foodName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Remove food from local storage
function removeFromFavorites(foodName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item !== foodName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); 
}

// Show favorites in list
function displayFavorites() {
    const list = document.getElementById("favorites-list");
    if (!list) return;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    list.innerHTML = '';

    if (favorites.length === 0) {
        list.innerHTML = '<li class="list-group-item">No favorites yet.</li>';
        return;
    }

    favorites.forEach(food => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";

        item.textContent = food;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "btn btn-sm btn-danger";
        removeBtn.onclick = function () {
            removeFromFavorites(food);
        };

        item.appendChild(removeBtn);
        list.appendChild(item);
    });
}

const foodItems = [
    { id: "kwayteow-box", name: "Fried Kway Teow" },
    { id: "laksa-box", name: "Laksa" },
    { id: "nasilemak-box", name: "Nasi Lemak" },
    { id: "nasibananaleaf-box", name: "Nasi Banana Leaf" },
    { id: "roticanai-box", name: "Roti Canai" },
    { id: "dosa-box", name: "Dosa" },
    { id: "hinava-box", name: "Hinava" },
    { id: "tuaranmee-box", name: "Tuaran Mee" }
];

document.addEventListener("DOMContentLoaded", function () {
    foodItems.forEach(food => {
        const box = document.getElementById(food.id);
        if (box) {
            box.addEventListener("click", function () {
                addToFavorites(food.name);
                alert(`✅ ${food.name} has been added to your favorites list!`);
                displayFavorites();
            });
        }
    });

    displayFavorites(); 

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




