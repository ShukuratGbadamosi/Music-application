import React,{useEffect, useState} from 'react'

const Loading = () => {
        const [isLoading, setIsLoading] = useState(false);
        const [data, setData] = useState([]);

        
        useEffect(()=>{
            setIsLoading(true)
        fetch('https://musicapi-19wk.onrender.com/music/myAPI') 
        .then(response => response.json())
        .then(data => {  setData(data); // Store the fetched data
            setIsLoading(false);
          })

    
            setTimeout(()=>{
                setIsLoading(false)}, 4000)
        },[])
    
        return(
            <>
            {isLoading ?(
        

        <div class="loader"></div>
            ) :(
                <section>
                <ul>
                  {data.map((item, index) => (
                    <li key={index}>
                    <img src={item.songImage} alt={item.songTitle} style={{ width: '150px', height: '150px' }} />
                    <h2>{item.songTitle}</h2>
                    <p>Album: {item.albumName}</p>
                    <p>Artist: {item.artistName}</p>
                    <p>Release Date: {item.releaseDate}</p>
                    <audio controls>
                      <source src={item.audioUrl} type="audio/mpeg" />
                    
                      Your browser does not support the audio element.
                    </audio>
                  </li>
                  ))}
                </ul>
              </section>
            )}
            </>
        );
    
    };



export default Loading

