import React, { useState, useEffect } from 'react';
import StoryInput from './components/StoryInput';
import StoryDisplay from './components/StoryDisplay';
import './styles/App.css';

function App() {
  const [currentSentence, setCurrentSentence] = useState('');
  const [fullStory, setFullStory] = useState([]);
  const [sentenceCount, setSentenceCount] = useState(0);

  const fetchLastSentence = async () => {
    try {
      const response = await fetch('/api/last-sentence');
      const data = await response.json();
      if (data.fullStory.length > 0) {
        setCurrentSentence(data.lastSentence);
        setFullStory(data.fullStory);
        setSentenceCount(data.fullStory.length);
      } else {
        // If no story is available, start blank
        setCurrentSentence('');
        setFullStory([]);
        setSentenceCount(0);
      }
    } catch (error) {
      console.error('Failed to fetch the last sentence:', error);
    }
  };

  // fetch on page mount
  useEffect(() => {
    fetchLastSentence();
  }, []);

  // fetch over an interval for updates
  useEffect(() => {
    const intervalId = setInterval(fetchLastSentence, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const sendNewSentence = (newSentence) => {
    setCurrentSentence(newSentence);
    setFullStory(prevStory => [...prevStory, newSentence]);
    setSentenceCount(prevCount => prevCount + 1);
  };

  const resetStory = async () => {
    try {
      const response = await fetch('/api/reset-story', { method: 'POST' });
      if (response.ok) {
        setCurrentSentence('');
        setFullStory([]);
        setSentenceCount(0);
      } else {
        throw new Error('Failed to reset the story on the server.');
      }
    } catch (error) {
      console.error('Error resetting the story:', error);
      alert('Error resetting the story. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Story app for VirtuLynx</h1>

      <StoryDisplay 
        currentSentence={currentSentence} 
        fullStory={fullStory}
        sentenceCount={sentenceCount}
      />

      <StoryInput onNewSentence={sendNewSentence} />

      <button onClick={resetStory}>Start Over</button>
    </div>
  );
}

export default App;
