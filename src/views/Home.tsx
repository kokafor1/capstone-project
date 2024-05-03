import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { UserType } from '../types';

type HomeProps = {
    isLoggedIn: boolean,
    currentUser: UserType|null,
}

export default function Home({isLoggedIn, currentUser}: HomeProps) {
  const [fact, setFact] = useState('');

  const fetchRandomDogFact = async () => {
    try {
      const response = await fetch('https://dog-api.kinduff.com/api/facts');
      const data = await response.json();
      const randomFact = data.facts[Math.floor(Math.random() * data.facts.length)];
      setFact(randomFact);
    } catch (error) {
      console.error('Error fetching dog fact:', error);
      setFact('Failed to fetch dog fact. Please try again later.');
    }
  };

  return (
    <>
    <h1 className="text-center">{isLoggedIn && currentUser ? `Hello Dog Lover! Learn some Facts with me!` : 'Do you know?' }</h1>
    <Container 
      className="d-flex align-items-center justify-content-center" 
      style={{ 
        height: '80vh', 
        border: '2px solid black', 
        borderRadius: '10px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div>
        <h2 className="mb-4">Random Dog Fact</h2>
        <p>*Up at the top, Click "Add Facts!", Copy and Paste the fact and show all your friends the fact you learned today!</p>
        <p>{fact}</p>
        <Button variant="primary" onClick={fetchRandomDogFact}>Fact Me!</Button>
      </div>
    </Container>
    </>
  );
};
