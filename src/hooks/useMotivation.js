import { useState, useEffect } from 'react';
import phrases from '../data/phrases.json';

export default function useMotivation() {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setPhrase(randomPhrase);
  }, []);

  return phrase;
}
