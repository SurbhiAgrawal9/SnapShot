import { useEffect, useState } from 'react';
import './App.css';


const Image = (props) => {
  return <img src={props.url} alt={props.title}></img>
}

function App() {
  const [img, setImg] = useState([]);
  const [query,setQuery] = useState('birds');
  const [input,setInput] = useState('');


  const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
  


  useEffect(()=>{
    const fetchData = async() => {
      const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);

      const data = await response.json();
      return data.photos.photo;
    }

    fetchData().then(data => {
      console.log(data)
    
      const images = data.map((obj)=>{
        let farm = obj.farm;
        let server = obj.server;
        let id = obj.id;
        let secret = obj.secret;
        let title = obj.title;

        let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;

        return <Image url={url} key={id} title={title}/>

      })

      setImg(images)

    })
  },[query])

  return (
    <div className='main'>
      <h1>SnapShot</h1>
      <div className='search-containre'>
        <input type="text" placeholder='Search here' onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={()=>setQuery(input)}>Search</button>
      </div>
      <div className='tag-container'>
        <button onClick={()=> setQuery('flower')}>Flowers</button>
        <button onClick={()=> setQuery('ocean')}>Ocean</button>
        <button onClick={()=> setQuery('birds')}>Birds</button>
        <button onClick={()=> setQuery('food')}>Food</button>
      </div>
      <div className='image-container'>
        <h2>{query.charAt(0).toUpperCase()+ query.slice(1)} Images</h2>
        <div>
          {img}
        </div>
      </div>
    </div>
  );
}

export default App;