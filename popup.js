document.getElementById('processLinkBtn').addEventListener('click', () => {
    const link = document.getElementById('link').value;

    if (link) {
        fetch(link).then(response => {
            const contentType = response.headers.get('content-Type');

            if (contentType.includes('image')) {
                processImage(link);
            } else if (contentType.includes('audio')) {
                processAudio(link);
            } else if (contentType.includes('video')) {
                processVideo(link);
            } else if (contentType.includes('text')) {
                processTextFile(link);
            } else {
                alert('Unsupported file type or content.');
            }
        })
        .catch(error => {
            console.error('Error fetching the content:', error);
            alert('Failed to process the link.');
        })
    } else {
        alert('Please enter a valid link');
    }
});

function processImage(link) {
    chrome.runtime.sendMessage({ action: 'uploadImage', link });
}

function processAudio(link) {
    chrome.runtime.sendMessage({ action: 'uploadAudio', link });
}

function processVideo(link) {
    chrome.runtime.sendMessage({ action: 'uploadVideo', link });
}

function processTextFile(link) {
    chrome.runtime.sendMessage({ action: 'uploadTextFile', link });
}
