const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function uploadDirectory() {
    const formData = new FormData();
    
    // Add index.html
    formData.append('file', fs.createReadStream('index.html'), {
        filepath: 'index.html'
    });
    
    // Add pfp.jpg
    formData.append('file', fs.createReadStream('pfp.jpg'), {
        filepath: 'pfp.jpg'
    });
    
    formData.append('pinataMetadata', JSON.stringify({
        name: 'clawforge-website'
    }));
    
    formData.append('pinataOptions', JSON.stringify({
        cidVersion: 1,
        wrapWithDirectory: true
    }));
    
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PINATA_JWT}`
        },
        body: formData
    });
    
    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));
}

uploadDirectory().catch(console.error);
