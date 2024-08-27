import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect back to the main voting page after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <div className="thank-you-page">
      <h1>Thank you for voting!</h1>
      <p>Your vote has been recorded successfully.</p>
    </div>
  );
};

export default ThankYouPage;
