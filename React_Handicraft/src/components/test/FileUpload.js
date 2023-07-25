import React, { useState } from 'react';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [thumb,setThumb] = useState(null);

    const handleFileChange = (event) => {
        setFile(Array.from(event.target.files));
    };
    const handleFileChange1 = (event) =>{
        setThumb(event.target.files[0])
    }

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            file.map((f)=>{
                formData.append('files', f);
            })
            formData.append('file',thumb);

            const response = await fetch('http://localhost:3000/product/save', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // File uploaded successfully
                console.log('File uploaded');
            } else {
                // Error uploading file
                console.error('Error uploading file');
            }
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };

    return (
        <div>
            <input type="file" name='thum' onChange={handleFileChange1} />
            <input type="file" name='image' onChange={handleFileChange} multiple />
            <button onClick={handleUpload}>Upload File</button>
        </div>
    );
}

export default FileUpload;
