import React, { useState } from 'react';
import axios from 'axios';

const TeamSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [teamData, setTeamData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`/search-team?name=${searchTerm}`);
      setTeamData(response.data);
    } catch (error) {
      setError('An error occurred while fetching team data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search for a Team</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter team name"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {teamData && (
        <div>
          <h3>{teamData.name}</h3>
        </div>
      )}
    </div>
  );
};

export default TeamSearch;
