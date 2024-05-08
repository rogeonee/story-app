import React from 'react';

function StoryDisplay({ currentSentence, fullStory, sentenceCount }) {
  return (
    <div className="story-display">
      {sentenceCount === 0 ? (
        <p>Start your story...</p>
      ) : sentenceCount % 5 === 0 ? (
        <div>
          <h2>Full Story</h2>
          {fullStory.map((sentence, index) => (
            <p key={index}>{sentence}</p>
          ))}
        </div>
      ) : (
        <p>{currentSentence}</p>
      )}
    </div>
  );
}

export default StoryDisplay;
