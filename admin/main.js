const sampleImages = [
    {
        id: 1,
        title: 'Mountain Landscape',
        description: 'Beautiful mountain range at sunset',
        category: 'landscape',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
        width: 1200,
        height: 800,
        type: 'image/jpeg',
        size: '1.2 MB',
        date: '2023-05-15'
    },
    {
        id: 2,
        title: 'City Skyline',
        description: 'Urban skyline at night with lights',
        category: 'architecture',
        url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600',
        width: 1200,
        height: 800,
        type: 'image/jpeg',
        size: '950 KB',
        date: '2023-06-22'
    },
    {
        id: 3,
        title: 'Ocean Waves',
        description: 'Powerful ocean waves crashing on rocks',
        category: 'nature',
        url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600',
        width: 1200,
        height: 800,
        type: 'image/jpeg',
        size: '1.5 MB',
        date: '2023-07-03'
    },
    {
        id: 4,
        title: 'Forest Path',
        description: 'Misty morning in a dense forest',
        category: 'nature',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600',
        width: 1200,
        height: 800,
        type: 'image/jpeg',
        size: '1.1 MB',
        date: '2023-08-12'
    },
    {
        id: 5,
        title: 'Desert Sunset',
        description: 'Beautiful sunset over desert dunes',
        category: 'landscape',
        url: 'https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?w=600',
        width: 1200,
        height: 800,
        type: 'image/jpeg',
        size: '1.4 MB',
        date: '2023-09-05'
    },
    {
        id: 6,
        title: 'Portrait Study',
        description: 'Artistic portrait with dramatic lighting',
        category: 'portrait',
        url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600',
        width: 1200,
        height: 1600,
        type: 'image/jpeg',
        size: '1.7 MB',
        date: '2023-10-18'
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (authToken) {
        // If the token exists, show the dashboard and load the gallery
        loginScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
        loadGallery(); // Load the gallery images
        getUserData(); // Fetch user data
    } else {
        // If no token, show the login screen
        loginScreen.classList.remove('hidden');
        dashboard.classList.add('hidden');
    }
});
$(document).ready(function () {
    getUserData();
    ApiCall();
});
///Api call for image upload
//Api endpiont for geting images
function ApiCall(params) {

    $.ajax({
        url: 'https://bestwale.pythonanywhere.com/gallery/images/',
        type: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}` // Include the token in the header
        },
        success: function (response) {
            console.log('Image data:', response);
            currentImages = [...response];
            loadGallery(filterGallery.value, searchGallery.value);
        },
        error: function (xhr) {
            console.error('Error fetching images:', xhr.responseText);
        }
    });


}
const Allme = Photo([]);
function Photo(Photoparams) {
    return Photoparams;
}

let currentImages = [];
let selectedFiles = [];
let currentImageId = null;

// DOM elements
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const sidebarMenu = document.getElementById('sidebar-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const contentViews = document.querySelectorAll('.content-view');
const galleryGrid = document.getElementById('gallery-grid');
const emptyGallery = document.getElementById('empty-gallery');
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const uploadPreview = document.getElementById('upload-preview');
const previewList = document.getElementById('preview-list');
const uploadFilesBtn = document.getElementById('upload-files-btn');
const cancelUploadBtn = document.getElementById('cancel-upload-btn');
const uploadProgress = document.getElementById('upload-progress');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const imageModal = document.getElementById('image-modal');
const closeModal = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');
const imageTitle = document.getElementById('image-title');
const imageDescription = document.getElementById('image-description');
const imageCategory = document.getElementById('image-category');
const imageDimensions = document.getElementById('image-dimensions');
const imageSize = document.getElementById('image-size');
const imageType = document.getElementById('image-type');
const imageDate = document.getElementById('image-date');
const saveImageBtn = document.getElementById('save-image-btn');
const deleteImageBtn = document.getElementById('delete-image-btn');
const filterGallery = document.getElementById('filter-gallery');
const searchGallery = document.getElementById('search-gallery');
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toast-icon');
const toastMessage = document.getElementById('toast-message');
const saveProfileBtn = document.getElementById('save-profile-btn');
const savePortfolioBtn = document.getElementById('save-portfolio-btn');
const signupScreen = document.getElementById('signup-screen');
const signupGoto = document.getElementById('signup-goto');
const loginGoto = document.getElementById('login-goto');
const loginLoader = document.getElementById('login-loader');

//Signup screen navigation
signupGoto.addEventListener('click', () => {
    loginScreen.classList.add('hidden');
    signupScreen.classList.remove('hidden');
});
//login screen navigation
loginGoto.addEventListener('click', () => {
    loginScreen.classList.remove('hidden');
    signupScreen.classList.add('hidden');
});

//sigin up functionality
document.getElementById('signup-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirm').value;

    // Simple validation
    if (!username || !email || !password) {
        showToast('Please enter username, email and password', 'error');
        return;
    }
    // Check password strength
    /* const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     if (!passwordRegex.test(password)) {
         showToast(
             'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
             'error'
         );
         return;
     }*/

    //password validation
    if (!password || !confirmPassword) {
        showToast('Both password fields are required', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match. Please try again.', 'error');
        return;
    }
    if (password !== confirmPassword) {
        showToast('please check password', 'error');
        return;
    }
    // Simple validation
    if (!username || !email || !password) {
        showToast('Please enter username, email and password', 'error');
        return;
    }


    loginLoader.classList.remove('hidden');
    $.ajax({
        url: 'https://bestwale.pythonanywhere.com/gallery/signup/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        }),
        success: function (response) {
            loginLoader.classList.add('hidden');
            if (response.token) {

                localStorage.setItem('authToken', response.token); // Save token for future requests
                // Show success message
                showToast('Sign up successful!', 'success');
                // Hide signup screen and show dashboard
                signupScreen.classList.add('hidden');

                dashboard.classList.remove('hidden');
                loadGallery();
            } else {
                showToast('Sign up falied!', 'error');
            }


        },
        error: function (xhr) {
            console.error('Signup error:', xhr.responseText);
        }
    });


});

// Login functionality
document.getElementById('login-btn').addEventListener('click', () => {

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Simple validation
    if (!username || !password) {
        showToast('Please enter username and password', 'error');
        return;
    }

    const data = {
        'username': username,
        'password': password,
    };
    loginLoader.classList.remove('hidden');

    $.ajax({
        url: 'https://bestwale.pythonanywhere.com/gallery/login/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            loginLoader.classList.add('hidden');

            if (response.token) {
                showToast('Login successful!', 'success');
                localStorage.setItem('authToken', response.token); // Save token for future requests
                loginScreen.classList.add('hidden');
                dashboard.classList.remove('hidden');
                loadGallery();
            } else {
                showToast('Login failed. Invalid credentials.', 'error');
            }
        },
        error: function (xhr) {
            // Hide loader
            loginLoader.classList.add('hidden');

            console.error('Login error:', xhr.responseText);
            showToast('Login failed. Invalid credentials.', 'error');
        }

    })



    // For this demo, we'll just check for demo credentials
    /*if (email === 'admin@photos.com' && password === 'password') {
        loginScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
        loadGallery();
    } else {
        showToast('Invalid credentials. Try the demo account.', 'error');
    }*/
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    // Confirm logout
    const confirmed = confirm('Are you sure you want to log out?');
    if (!confirmed) return;

    $.ajax({
        url: 'https://bestwale.pythonanywhere.com/gallery/logout/',
        type: 'POST',
        headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}` // Include the token in the header
        },
        success: function (response) {
            console.log('Logout response:', response);
            dashboard.classList.add('hidden');
            loginScreen.classList.remove('hidden');
            document.getElementById('password').value = '';
            localStorage.removeItem('authToken'); // Clear the token on logout
            showToast('Logout successful!', 'success');
        },
        error: function (xhr) {
            console.error('Logout error:', xhr.responseText);
            showToast('Logout failed. Please try again.', 'error');
        }

    });
});
function getUserData() {
    const token = localStorage.getItem('authToken'); // Retrieve the token stored after login

    $.ajax({
        url: 'https://bestwale.pythonanywhere.com/gallery/userdetail/', // Adjust the URL based on your backend setup
        type: 'GET',
        headers: {
            'Authorization': `Token ${token}` // Include the token in the Authorization header
        },
        success: function (response) {
            console.log('User data:', response);
            // Example: Populate the dashboard with user data
            $("#usernameDetail").text(response.username);
            $("#emailDetail").text(response.email);
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                alert('Unauthorized. Please log in again.');
                dashboard.classList.add('hidden');
                loginScreen.classList.remove('hidden');// Redirect to login page
            } else {
                console.error('Error:', xhr.responseText);
            }
        }
    });
}

// Call the function to load user data after the page is ready





// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    sidebarMenu.classList.toggle('hidden');
});

// Navigation between views
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');

        // Update active state on buttons
        navBtns.forEach(b => {
            b.classList.remove('active', 'bg-primary', 'bg-opacity-10', 'text-primary');
            b.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
        });

        btn.classList.add('active', 'bg-primary', 'bg-opacity-10', 'text-primary');
        btn.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');

        // Show corresponding view
        contentViews.forEach(view => {
            view.classList.add('hidden');
        });

        document.getElementById(`${target}-view`).classList.remove('hidden');

        // On mobile, hide the sidebar after selection
        if (window.innerWidth < 768) {
            sidebarMenu.classList.add('hidden');
        }
    });
});

// Load gallery images
function loadGallery(filter = 'all', search = '') {
    galleryGrid.innerHTML = '';

    // Filter images based on category and search term
    let filteredImages = currentImages;

    if (filter !== 'all' && filter !== 'recent') {
        filteredImages = filteredImages.filter(img => img.category === filter);
    } else if (filter === 'recent') {
        // Sort by date for "recent" filter
        filteredImages = [...filteredImages].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (search) {
        const searchLower = search.toLowerCase();
        filteredImages = filteredImages.filter(img =>
            img.title.toLowerCase().includes(searchLower) ||
            img.description.toLowerCase().includes(searchLower)
        );
    }

    // Show empty state if no images
    if (filteredImages.length === 0) {
        if (currentImages.length === 0) {
            emptyGallery.classList.remove('hidden');
        } else {
            galleryGrid.innerHTML = `
            <div class="col-span-full py-8 text-center">
                <p class="text-gray-500 dark:text-gray-400">No images match your filters</p>
                <button id="clear-filters" class="mt-2 text-primary hover:underline">Clear filters</button>
            </div>
        `;

            document.getElementById('clear-filters').addEventListener('click', () => {
                filterGallery.value = 'all';
                searchGallery.value = '';
                loadGallery();
            });
        }
        return;
    }

    emptyGallery.classList.add('hidden');

    // Create gallery items
    filteredImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'relative group cursor-pointer overflow-hidden rounded-lg shadow-md';
        galleryItem.setAttribute('data-id', image.id);
        //console.log('this is the image', 'https://bestwale.pythonanywhere.com' + image.url.url)

        galleryItem.innerHTML = `
        <img src="https://bestwale.pythonanywhere.com/${image.url}" alt="${image.title}" class="w-full h-64 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
        <div class="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <h3 class="text-white font-medium truncate">${image.title}</h3>
            <p class="text-gray-200 text-sm truncate">${image.description}</p>
            <span class="inline-block mt-2 px-2 py-1 bg-primary bg-opacity-80 text-white text-xs rounded">${image.category}</span>
        </div>
    `;


        galleryItem.addEventListener('click', () => {
            openImageModal(image);
        });

        galleryGrid.appendChild(galleryItem);
    });
}

// Filter gallery
filterGallery.addEventListener('change', () => {
    loadGallery(filterGallery.value, searchGallery.value);
});

// Search gallery
searchGallery.addEventListener('input', () => {
    loadGallery(filterGallery.value, searchGallery.value);
});

// Upload functionality
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

// Drag and drop handling
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-primary', 'dark:border-primary');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-primary', 'dark:border-primary');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-primary', 'dark:border-primary');

    if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
    }
});

/*fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        handleFiles(fileInput.files);
    }
});*/

function handleFiles(files) {
    selectedFiles = Array.from(files);

    if (selectedFiles.length === 0) return;

    // Show the preview section
    uploadPreview.classList.remove('hidden');
    previewList.innerHTML = '';

    // Create previews
    selectedFiles.forEach((file, index) => {
        if (!file.type.startsWith('image/')) {
            showToast(`${file.name} is not an image file`, 'error');
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-2 rounded-md';

            previewItem.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}" class="w-12 h-12 object-cover rounded">
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-800 dark:text-white truncate">${file.name}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">${formatSize(file.size)}</p>
            </div>
            <button class="remove-file text-gray-500 hover:text-red-500" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;

            previewList.appendChild(previewItem);
        };

        reader.readAsDataURL(file);
    });

    // Add event listeners for remove buttons (after they're created)
    setTimeout(() => {
        document.querySelectorAll('.remove-file').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                selectedFiles.splice(index, 1);

                if (selectedFiles.length === 0) {
                    uploadPreview.classList.add('hidden');
                } else {
                    handleFiles(selectedFiles);
                }
            });
        });
    }, 100);
}

// Cancel upload
cancelUploadBtn.addEventListener('click', () => {
    selectedFiles = [];
    uploadPreview.classList.add('hidden');
    fileInput.value = '';
});

// Upload files
uploadFilesBtn.addEventListener('click', () => {
    if (selectedFiles.length === 0) return;

    uploadPreview.classList.add('hidden');
    uploadProgress.classList.remove('hidden');

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Process uploaded files
            processUploadedFiles();

            setTimeout(() => {
                uploadProgress.classList.add('hidden');
                showToast(`${selectedFiles.length} images uploaded successfully`, 'success');

                // Switch to gallery view
                document.querySelector('[data-target="gallery"]').click();
            }, 500);
        }

        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }, 200);
});
function uploadImage(file) {
    const formData = new FormData();
    formData.append("url", file); // Attach the image file
    formData.append("title", file.name.split('.').slice(0, -1).join('.')); // Add additional metadata
    formData.append("description", "");
    formData.append("category", "nature"); // Example category

    fetch("https://bestwale.pythonanywhere.com/gallery/images/", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.id) {

                showToast("Image uploaded successfully!", "success");
                ApiCall();
            } else {
                console.error("Error uploading image:", data);
                showToast("Failed to upload image.", "error");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showToast("An error occurred while uploading the image.", "error");
        });
}
// Process uploaded files
function processUploadedFiles() {
    selectedFiles.forEach(file => {
        if (!file.type.startsWith('image/')) {
            showToast(`${file.name} is not an image file`, 'error');
            return;
        }

        // Call the uploadImage function for each file
        uploadImage(file);
    });
    /*selectedFiles.forEach(file => {
        const reader = new FileReader();


        reader.onload = (e) => {
            const id = currentImages.length > 0 ? Math.max(...currentImages.map(img => img.id)) + 1 : 1;

            const newImage = {
                id,
                title: file.name.split('.').slice(0, -1).join('.'),
                description: '',
                category: 'other',
                url: e.target.result, // Use data URL for demo
                width: 1200, // Placeholder
                height: 800, // Placeholder
                type: file.type,
                size: formatSize(file.size),
                date: new Date().toISOString().split('T')[0]
            };

            currentImages.push(newImage);
        };

        reader.readAsDataURL(file);
    });*/

    selectedFiles = [];
    fileInput.value = '';
}
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        selectedFiles = Array.from(fileInput.files);
        processUploadedFiles();
    }
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-primary', 'dark:border-primary');

    if (e.dataTransfer.files.length > 0) {
        selectedFiles = Array.from(e.dataTransfer.files);
        processUploadedFiles();
    }
});
// Image modal
function openImageModal(image) {
    currentImageId = image.id;

    modalImage.src = 'https://bestwale.pythonanywhere.com/' + image.url;
    imageTitle.value = image.title;
    imageDescription.value = image.description;
    imageCategory.value = image.category;
    imageDimensions.textContent = `${image.width} x ${image.height}`;
    imageSize.textContent = image.size;
    imageType.textContent = image.type;
    imageDate.textContent = image.date;

    imageModal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
    imageModal.classList.add('hidden');
    currentImageId = null;
});

// Close modal when clicking outside
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.classList.add('hidden');
        currentImageId = null;
    }
});

// Save image changes
saveImageBtn.addEventListener('click', () => {
    if (currentImageId === null) return;

    const imageIndex = currentImages.findIndex(img => img.id === currentImageId);
    if (imageIndex === -1) return;

    currentImages[imageIndex].title = imageTitle.value;
    currentImages[imageIndex].description = imageDescription.value;
    currentImages[imageIndex].category = imageCategory.value;

    imageModal.classList.add('hidden');
    showToast('Image details saved', 'success');

    // Reload gallery to reflect changes
    loadGallery(filterGallery.value, searchGallery.value);
});

// Delete image
deleteImageBtn.addEventListener('click', () => {
    if (currentImageId === null) return;

    const confirmed = confirm('Are you sure you want to delete this image?');
    if (!confirmed) return;

    currentImages = currentImages.filter(img => img.id !== currentImageId);

    imageModal.classList.add('hidden');
    showToast('Image deleted', 'success');

    // Reload gallery to reflect changes
    loadGallery(filterGallery.value, searchGallery.value);

    if (currentImages.length === 0) {
        emptyGallery.classList.remove('hidden');
    }
});

// Settings save handlers
saveProfileBtn.addEventListener('click', () => {
    showToast('Profile information saved', 'success');
});

savePortfolioBtn.addEventListener('click', () => {
    showToast('Portfolio settings saved', 'success');
});

// Format file size
function formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Show toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;

    toast.classList.remove('translate-y-full', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    if (type === 'success') {
        toast.classList.remove('bg-red-500');
        toast.classList.add('bg-gray-900');
        toastIcon.className = 'fas fa-check-circle mr-2';
    } else if (type === 'error') {
        toast.classList.remove('bg-gray-900');
        toast.classList.add('bg-red-500');
        toastIcon.className = 'fas fa-exclamation-circle mr-2';
    }

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-full', 'opacity-0');
    }, 5000);
}
