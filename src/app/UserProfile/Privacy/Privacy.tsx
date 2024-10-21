'use client';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import './Privacy.css';
import { useRouter } from 'next/navigation';

const Privacy: React.FC = () => {
  const Router =useRouter()
  return (
    <div className="privacy-container">
      <button className="back-button">
        <span className="icon-circle">
          <IoIosArrowBack  onClick={() => Router.back()}/>
        </span>
      </button>
      <h2>Privacy Policy</h2>
      <div className="privacy-content">
        <h3>Acceptance of the Privacy Policy</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet eleifend purus non mattis. Vestibulum fringilla mi vel risus congue ultricies. Pellentesque at purus vel dolor accumsan ullamcorper. Sed pellentesque, dui non maximus lacinia, velit eros condimentum eros, et lacinia enim justo dignissim sapien. Maecenas elementum a eros eu posuere. Vivamus sed nunc est. Donec ultricies placerat tempor. Praesent ut imperdiet risus, in venenatis mi. Etiam varius velit libero, ac porta metus vulputate at.
        </p>
        <p>
          Suspendisse ultrices pulvinar dui, non consequat nibh luctus facilisis. Maecenas vitae enim purus. In leo arcu, laoreet ac ligula eu, rutrum auctor massa. Vestibulum congue ante eu velit consectetur ultricies. Cras aliquam non mauris at tincidunt. Donec ac ligula, rhoncus sed egestas vitae, finibus nec lacus. Nulla condimentum lorem at nisi mattis varius. Integer congue arcu lectus, quis porta massa sodales sed. Ut eu lobortis mi. Proin vehicula orci a lorem a vestibulum. Morbi ut tempus libero, vitae maximus risus.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
