"use client"
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi'; // Import the upload icon
import { FiArrowLeft } from 'react-icons/fi'; // Import the back arrow icon
import './Buildinglicence.css'; // Import the CSS for styling
import { useRouter } from 'next/navigation';

const Buildinglicence: React.FC = () => {
  const Router = useRouter();
  const [frontSide, setFrontSide] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFrontSide(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (frontSide) {
      console.log('Front Side:', frontSide);
      alert('File uploaded successfully!');
    } else {
      alert('Please upload the front side of the Building Permit & Licence');
    }
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" onClick={() => Router.back()} />
      </div>

      <h1 className="header">Building Permit & Licence</h1>

      <p className="instruction">
        Make sure that all the data on your document is fully visible, glare-free and not blurred
      </p>

      <div className="imagePreview">
        <img src="/images/files1.png" className="aadharImage" alt="placeholder" />
      </div>

      <div className="uploadContainer">
        <div className="uploadBox">
          {frontSide ? (
            <img src={frontSide} alt="Uploaded Front Side" className="uploadedImage" />
          ) : (
            <label htmlFor="upload-front" className="uploadLabel">
              <FiUpload className="uploadIcon" />
              <span>Upload front side</span>
            </label>
          )}
          <input
            id="upload-front"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="inputFile"
          />
        </div>
      </div>

      <button className="submitButton" onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
};

export default Buildinglicence;
