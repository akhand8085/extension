chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'uploadFile') {
        const { fileData, contentType } = message;

       
        console.log('Received file to upload:', contentType);

        
        const serverUrl = 'http://localhost:3000/upload'; 

        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': contentType, 
            },
            body: JSON.stringify({ fileData }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('File uploaded successfully:', data);
            sendResponse({ status: 'success' });
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            sendResponse({ status: 'failure', error: error.message });
        });

        
        return true;
    }
});
