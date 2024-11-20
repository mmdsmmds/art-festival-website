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

