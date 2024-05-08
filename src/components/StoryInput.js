import React, { useState } from 'react';
import '../styles/StoryInput.css';

function StoryInput({ onNewSentence }) {
  const [sentence, setSentence] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sentence.length > 25) {
      alert('Sentence must be 25 characters or less.');
      return;
    } else if (sentence.length === 0) {
        alert('You cannot send an empty contribution.');
        return;
    }

    try {
      const response = await fetch('/api/submit-sentence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
      });
      if (response.ok) {
        const { lastSentence } = await response.json();
        onNewSentence(lastSentence);
        setSentence('');
      } else {
        throw new Error('Failed to submit sentence.');
      }
    } catch (error) {
      console.error('Error submitting sentence:', error);
      alert('Error submitting sentence. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={sentence}
        onChange={e => setSentence(e.target.value)}
        maxLength={25}
        placeholder="Contribute your sentence (25 char max)"
      />
      <button type="submit">Contribute</button>
    </form>
  );
}

export default StoryInput;
