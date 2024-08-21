import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [audioData, setAudioData] = useState(null);

  

  useEffect(() => {
    setIsLoading(true);
    fetch('https://musicapi-19wk.onrender.com/music/myAPI')

      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData); // Store the fetched data
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false); // Stop loading even if there's an er
      });
  }, []);

  
  return (
    <>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <section className='sec'>
          <div>

          <ul>
            {data.map((item, index) => (
              <li key={index}  className="music-item">
                <img src={item.songImage} alt={item.songTitle} style={{ width: '150px', height: '150px', borderRadius: "100px" }}  className="song-image"  />
                <h2 className="song-title">{item.songTitle}</h2>
                <p className="album-name">Album: {item.albumName}</p>
                <p className="artist-name">Artist: {item.artistName}</p>
                <p className="release-date">Release Date: {item.releaseDate}</p>
                <audio controls className="audio-player">
                  <source src={item.songUrl} type="audio/ogg" />
                 
                </audio>
              </li>
            ))}
          </ul>
          </div>
          {/* <p>shukkie loves you all thank you💕💕</p> */}

        </section>
      )}
    </>
  );
};

export default Loading;
