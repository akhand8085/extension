const express = require('express');
const fs = require('fs');
const app = express();

const path_dir = "C:\\Users\\Akhand Pratap Singh\\Desktop\\extension"

app.use(express.json({ limit: '50mb' })); 
app.use(express.static(path_dir + "//public"))

app.get('/', (req, res)=>{
    res.sendFile(path_dir + "\\popup.html");
});

app.post('/upload', (req, res) => {
    const { fileData, contentType } = req.body;
if (!fileData) {
        return res.status(400).json({ message: 'Missing file data' });
    }
else if(!contentType){
    return res.status(400).json({message: 'missing content Type'})
}

    
    const base64String = fileData.split(',')[1];

    


    let fileExtension = '';
    if (contentType.includes('image')) {
        fileExtension = '.png';
    } else if (contentType.includes('audio')) {
        fileExtension = '.mp3';
    } else if (contentType.includes('video')) {
        fileExtension = '.mp4';
    } else if (contentType.includes('text')) {
        fileExtension = '.txt';
    }

    const fileName = `uploadedFile${fileExtension}`;


    fs.writeFile(fileName, base64String, 'base64', (err) => {
        if (err) {
            console.error('Error saving file:', err);
            res.status(500).json({ message: 'Failed to save file' });
        } else {
            console.log('File saved successfully:', fileName);
            res.json({ message: 'File uploaded and saved successfully' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
