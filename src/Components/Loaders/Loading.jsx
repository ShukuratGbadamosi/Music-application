import React, { useEffect, useState, useRef } from 'react';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null); // Track the currently playing music
  const audioRef = useRef(null); // Reference to the currently playing audio element

  useEffect(() => {
    setIsLoading(true);
    fetch('https://musicapi-19wk.onrender.com/music/myAPI')
      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData); // Store the fetched data
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const handlePlay = (index) => {
    if (currentTrack === index && audioRef.current) {
      // If the clicked track is already playing, pause it
      audioRef.current.pause();
      setCurrentTrack(null);
    } else {
      // If a new track is selected, pause the previous one and play the new one
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = document.getElementById(`audio-${index}`);
      audioRef.current.play();
      setCurrentTrack(index);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <section className="sec">
          <div>
            <ul>
              {data.map((item, index) => (
                <li key={index} className="music-item">
                  <img src={item.songImage} alt={item.songTitle} style={{ width: '150px', height: '150px', borderRadius: '100px' }} className="song-image" />
                  <h2 className="song-title">{item.songTitle}</h2>
                  <p className="album-name">Album: {item.albumName}</p>
                  <p className="artist-name">Artist: {item.artistName}</p>
                  <p className="release-date">Release Date: {item.releaseDate}</p>
                  <audio id={`audio-${index}`} controls className="audio-player" onPlay={() => handlePlay(index)}>
                    <source src={item.songUrl} type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              ))}
            </ul>
          </div>
          {currentTrack !== null && (
            <p className="current-track">SHUKUROH: {data[currentTrack].songTitle}</p>
          )}
        </section>
      )}
    </>
  );
};

export default Loading;
