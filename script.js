// Replace with your actual Supabase Project URL and Anon Key
// Get the picture ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const pictureId = urlParams.get('id');

if (!pictureId) {
    alert('No picture ID provided!');
    window.location.href = '/'; // Redirect to home if no ID
}
// Dynamically set the picture source
const pictureElement = document.getElementById('picture');
pictureElement.src = `/images/picture_${pictureId}.jpg`; // Adjust the path to match your file structure

const supabase = supabase.createClient(
    'https://cqkwcvjxiqqnohjptltu.supabase.co', // Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxa3djdmp4aXFxbm9oanB0bHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjQzNzYsImV4cCI6MjA0NzcwMDM3Nn0.Y7ceexogbvVz4N0wNe0Z3l6qyVn_HgV1_6tfL-_ceVo' // Supabase Public API Key
);
document.getElementById('rating-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const rating = document.getElementById('rating').value;

    // Submit the rating to Supabase
    const { data, error } = await supabase
        .from('ratings')
        .insert([{ picture_id: parseInt(pictureId), rating: parseInt(rating) }]);

    if (error) {
        console.error('Error submitting rating:', error.message);
        alert('Failed to submit rating. Please try again.');
    } else {
        alert('Thank you for your rating!');
    }
});

document.querySelectorAll('.rate-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const pictureId = form.querySelector('.picture-id').value;
        const rating = form.querySelector('.rating').value;

        // Send rating to Cloudflare Worker (replace URL with your worker's URL)
        const response = await fetch('https://your-worker.subdomain.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pictureId: pictureId,
                rating: rating,
            }),
        });

        const result = await response.json();
        alert('Rating submitted successfully');
    });
});
async function submitRating(pictureId, rating) {
    const { data, error } = await supabase
        .from('ratings')
        .insert([{ picture_id: pictureId, rating }]);

    if (error) {
        console.error('Error submitting rating:', error.message);
        alert('Failed to submit rating. Please try again.');
    } else {
        console.log('Rating submitted:', data);
        alert('Thank you for your rating!');
    }
}
<form onsubmit="handleRating(event, 1)">
    <label for="rating">Rate this picture (1-5):</label>
    <input type="number" id="rating" name="rating" min="1" max="5" required>
    <button type="submit">Submit</button>
</form>
function handleRating(event, pictureId) {
    event.preventDefault(); // Prevent the page from refreshing
    const rating = event.target.rating.value; // Get the rating value from the form
    submitRating(pictureId, parseInt(rating)); // Send the rating to Supabase
}

