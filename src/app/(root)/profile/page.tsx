"use client";
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

export default function UploadPage() {
  const [imageId, setImageId] = useState(null);
  const [error, setError] = useState('');

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rajkumar264');
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/de12ytbyw/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      setImageId(data.public_id);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageId && (
        <CldImage
          alt='reload'
          src={imageId}
          width="500"
          height="500"
          crop={{
            type: 'auto',
            source: true
          }}
        />
      )}
    </div>
  );
}
