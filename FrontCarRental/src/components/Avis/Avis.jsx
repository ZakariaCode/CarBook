import React, { useState, useEffect } from 'react';

function Avis() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [modalOpen, setModalOpen] = useState(true); // Modal ouvert par défaut

  const handleRating = (star) => {
    // Si l'utilisateur clique sur la même étoile, désélectionner
    setRating(prevRating => (prevRating === star ? 0 : star));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    setModalOpen(false); 
  };

  useEffect(() => {
    setModalOpen(true); 
  }, []);

  return (
    <div className="pt-28 mx-auto ml-40">
      {/* Main modal */}
      {modalOpen && (
        <div
          id="feedback-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black"
        >
          <div className="relative w-full max-w-md bg-white rounded-lg shadow p-8">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900 text-center">Rate Your Experience</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                onClick={() => setModalOpen(false)} 
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4">
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => handleRating(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={star <= rating ? "#ffc727" : "#e4e5e9"}
                    viewBox="0 0 24 24"
                    className="w-10 h-10 cursor-pointer"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                ))}
              </div>

              {/* Feedback textarea */}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Leave your feedback..."
                className="w-full p-2.5 border border-gray-300 rounded-lg mb-4"
              ></textarea>

              {/* Submit button with gradient */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-[#ffc727] via-[#ff9e00] to-[#ff6600] text-white hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avis;
