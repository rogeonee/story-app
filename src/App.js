import React, { useState, useEffect } from 'react';
import StoryInput from './components/StoryInput';
import StoryDisplay from './components/StoryDisplay';
import './App.css';

function App() {
  const [currentSentence, setCurrentSentence] = useState('');
  const [fullStory, setFullStory] = useState([]);
  const [sentenceCount, setSentenceCount] = useState(0);

  // fetch am existing story
  useEffect(() => {
    const fetchLastSentence = async () => {
      try {
        const response = await fetch('/api/last-sentence');
        const data = await response.json();
        // console.log('data:', data)
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

    fetchLastSentence();
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
