import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CancellationPrediction({ booking }) {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await axios.post('http://localhost:5001/predict', booking);
        setPrediction(response.data.cancellationPrediction);
      } catch (error) {
        console.error('Error predicting cancellation:', error);
        setPrediction('Error');
      }
    };

    fetchPrediction();
  }, [booking]);

  if (prediction === null) {
    return <span>Loading...</span>;
  }

  return <span>{prediction ? 'Yes' : 'No'}</span>;
}

export default CancellationPrediction;
