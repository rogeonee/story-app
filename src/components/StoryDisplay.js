import React from 'react';
import '../styles/StoryDisplay.css';

function StoryDisplay({ currentSentence, fullStory, sentenceCount }) {
    const fullStoryText = fullStory.join(' ');

  return (
    <div className="story-display">
      {sentenceCount === 0 ? (
        <p>Start your story...</p>
      ) : sentenceCount % 5 === 0 ? (
        <div>
          <h2>Full Story</h2>
          <p>{fullStoryText}</p>
        </div>
      ) : (
        <p>{sentenceCount % 5}/5: {currentSentence}</p>
      )}
    </div>
  );
}

export default StoryDisplay;
