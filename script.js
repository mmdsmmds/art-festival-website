// Replace with your actual Supabase Project URL and Anon Key
const supabase = supabase.createClient(
    'https://cqkwcvjxiqqnohjptltu.supabase.co', // Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxa3djdmp4aXFxbm9oanB0bHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjQzNzYsImV4cCI6MjA0NzcwMDM3Nn0.Y7ceexogbvVz4N0wNe0Z3l6qyVn_HgV1_6tfL-_ceVo' // Supabase Public API Key
);

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

