// Maintenance.tsx

import React from 'react';
import Head from 'next/head';

const Maintenance: React.FC = () => {
  return (
    <div className="maintenance-container">
      <Head>
        <title>Under Maintenance</title>
      </Head>
      <div className="maintenance-content">
        {/* Add your icon here; you can use an external library like react-icons */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="90"
          height="90"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13h-2v-2h2v2zm0-4h-2V7h2v4z"
            fill="#ffffff"
          />
        </svg>
        <h1>Under Maintenance</h1>
        <p>Sorry for the inconvenience. We are currently undergoing maintenance.</p>
      </div>
      <style jsx>{`
        .maintenance-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f0f0f0; /* Add your preferred background color */
        }

        .maintenance-content {
          text-align: center;
          color: #333; /* Add your preferred text color */
        }

        svg {
          fill: #333; /* Add your preferred icon color */
        }

        h1 {
          margin-top: 10px;
          font-size: 36px; /* Adjust the font size for larger screens */
        }

        p {
          font-size: 20px; /* Adjust the font size for larger screens */
          margin-top: 10px;
        }

        /* You can add more styles or adjust existing ones for larger screens */
        @media (max-width: 1440px) {
          h1 {
            font-size: 60px;!important /* Adjust the font size for smaller screens */
          }

          p {
            font-size: 50px;!important /* Adjust the font size for smaller screens */
          }
        }

        @media (max-width: 1024px) {
          h1 {
            font-size: 60px;!important /* Adjust the font size for smaller screens */
          }

          p {
            font-size: 30px;!important /* Adjust the font size for smaller screens */
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 30px; /* Adjust the font size for smaller screens */
          }

          p {
            font-size: 24px; /* Adjust the font size for smaller screens */
          }
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 28px; /* Adjust the font size for smaller screens */
          }

          p {
            font-size: 16px; /* Adjust the font size for smaller screens */
          }
        }

        @media (max-width: 400px) {
          h1 {
            font-size: 24px; /* Adjust the font size for even smaller screens */
          }

          p {
            font-size: 14px; /* Adjust the font size for even smaller screens */
          }
        }
      `}</style>
    </div>
  );
};

export default Maintenance;
