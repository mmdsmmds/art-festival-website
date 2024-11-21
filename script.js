import { createClient } from '@supabase/supabase-js';

// Supabase client setup
const SUPABASE_URL = 'https://cqkwcvjxiqqnohjptltu.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxa3djdmp4aXFxbm9oanB0bHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjQzNzYsImV4cCI6MjA0NzcwMDM3Nn0.Y7ceexogbvVz4N0wNe0Z3l6qyVn_HgV1_6tfL-_ceVo'; // Replace with your Supabase Anon Key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Functions using the Supabase client go here...

const SUPABASE_URL = 'https://cqkwcvjxiqqnohjptltu.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxa3djdmp4aXFxbm9oanB0bHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjQzNzYsImV4cCI6MjA0NzcwMDM3Nn0.Y7ceexogbvVz4N0wNe0Z3l6qyVn_HgV1_6tfL-_ceVo'; // Replace with your Supabase Anon Key

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// Function to safely get the picture ID from the URL query
function getPictureIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const pictureId = urlParams.get('id');

    if (!pictureId) {
        alert('No picture ID provided!');
        window.location.href = '/'; // Redirect to home if no ID
    }

    return pictureId;
}

// Function to dynamically load the picture
function loadPicture(pictureId) {
    const pictureElement = document.getElementById('picture');
    pictureElement.src = `images/picture_${pictureId}.jpg`; // Adjust the path to match your image folder
    pictureElement.alt = `Picture ${pictureId}`;
}

// Function to handle form submission and rating
async function handleRatingSubmission(event, pictureId) {
    event.preventDefault();
    const ratingInput = document.getElementById('rating');
    const rating = parseInt(ratingInput.value);

    // Validate rating
    if (rating < 1 || rating > 5) {
        alert('Please enter a valid rating between 1 and 5.');
        return;
    }

    // Submit the rating to Supabase
    try {
        const { data, error } = await supabase
            .from('ratings')
            .insert([{ picture_id: parseInt(pictureId), rating }]);

        if (error) {
            throw error;
        }

        alert('Thank you for your rating!');
        ratingInput.value = ''; // Clear the input field
    } catch (error) {
        console.error('Error submitting rating:', error.message);
        alert('Failed to submit rating. Please try again.');
    }
}

// Main function to initialize the page
function initializePage() {
    const pictureId = getPictureIdFromURL();
    loadPicture(pictureId);

    const form = document.getElementById('rating-form');
    form.addEventListener('submit', (event) => handleRatingSubmission(event, pictureId));
}

// Initialize the page when the script loads
initializePage();
