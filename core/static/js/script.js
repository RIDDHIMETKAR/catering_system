// --- Mock Data for Indian Caterers ---
const caterers = [
    {
        id: 1,
        name: "Royal Rajwada Catering",
        city: "delhi",
        price: "luxury",
        priceText: "₹2500 / plate",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
        tags: ["North Indian", "Mughlai", "Wedding Special"]
    },
    {
        id: 2,
        name: "Dakshin Delights",
        city: "chennai",
        price: "budget",
        priceText: "₹800 / plate",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80",
        tags: ["South Indian", "Kerala Feast", "Filter Coffee"]
    },
    {
        id: 3,
        name: "Mumbai Masala Events",
        city: "mumbai",
        price: "premium",
        priceText: "₹1500 / plate",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
        tags: ["Chaat Counters", "Fusion", "Desserts"]
    },
    {
        id: 4,
        name: "Ooru Kitchen",
        city: "bangalore",
        price: "premium",
        priceText: "₹1200 / plate",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80",
        tags: ["Continental", "Pan Indian", "Corporate"]
    },
    {
        id: 5,
        name: "Nawabi Dastarkhwan",
        city: "delhi",
        price: "premium",
        priceText: "₹1800 / plate",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80",
        tags: ["Awadhi", "Biryani", "Kebabs"]
    },
    {
        id: 6,
        name: "Street Food Symphony",
        city: "mumbai",
        price: "budget",
        priceText: "₹600 / plate",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80",
        tags: ["Street Food", "Snacks", "Casual"]
    }
];
// --- Navbar Scroll Effect & Hamburger ---
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
// --- Modal Logic ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}
function openBookingModal(vendorId) {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'flex';
    // Set the hidden input value
    document.querySelector('#bookingModal input[name="vendor_id"]').value = vendorId;
}
// Close modal if clicked outside of content
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
// Handle booking form submission
document.getElementById('bookingForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Your catering request has been received. We will contact you shortly to confirm the details.');
    closeModal('bookingModal');
    this.reset();
});
// --- Dynamic Vendor Cards & Filtering ---
const vendorsContainer = document.getElementById('vendors-list');
const filterLocation = document.getElementById('filter-location');
const filterPrice = document.getElementById('filter-price');
const filterRating = document.getElementById('filter-rating');
function renderVendors(vendorsToRender) {
    vendorsContainer.innerHTML = ''; // Clear container

    if (vendorsToRender.length === 0) {
        vendorsContainer.innerHTML = '<p style="text-align: center; width: 100%; color: #666;">No caterers found matching your criteria.</p>';
        return;
    }
    vendorsToRender.forEach(vendor => {
        const vendorCard = document.createElement('div');
        vendorCard.className = 'vendor-card glass';

        const tagsHtml = vendor.tags.map(tag => `<span>${tag}</span>`).join('');

        vendorCard.innerHTML = `
            <div class="vendor-img" style="background-image: url('${vendor.image}')">
                <span class="vendor-badge"><i class="fas fa-star"></i> ${vendor.rating}</span>
            </div>
            <div class="vendor-content">
                <h3>${vendor.name}</h3>
                <div class="vendor-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${vendor.city.charAt(0).toUpperCase() + vendor.city.slice(1)}</span>
                    <span style="font-weight: 600; color: var(--secondary);"><i class="fas fa-rupee-sign"></i> ${vendor.priceText}</span>
                </div>
                <div class="vendor-tags">
                    ${tagsHtml}
                </div>
                <button class="btn-outline" style="width: 100%; padding: 8px;" onclick="openModal('bookingModal')">Request Quote</button>
            </div>
        `;
        vendorsContainer.appendChild(vendorCard);
    });
}
function applyFilters() {
    const locationVal = filterLocation.value;
    const priceVal = filterPrice.value;
    const ratingVal = filterRating.value;
    const filtered = caterers.filter(vendor => {
        // Location Match
        if (locationVal !== 'all' && vendor.city !== locationVal) return false;

        // Price Match
        if (priceVal !== 'all' && vendor.price !== priceVal) return false;

        // Rating Match
        if (ratingVal === '4+' && vendor.rating < 4.0) return false;
        if (ratingVal === '4.5+' && vendor.rating < 4.5) return false;

        return true;
    });
    // Add brief opacity animation
    vendorsContainer.style.opacity = '0';
    setTimeout(() => {
        renderVendors(filtered);
        vendorsContainer.style.opacity = '1';
        vendorsContainer.style.transition = 'opacity 0.3s ease';
    }, 200);
}
// Event Listeners for Filters
filterLocation.addEventListener('change', applyFilters);
filterPrice.addEventListener('change', applyFilters);
filterRating.addEventListener('change', applyFilters);
// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderVendors(caterers);
});