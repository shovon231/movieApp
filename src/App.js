import React, {useEffect, useState} from 'react';
import Movie from './component/Movie';


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41680bbd1721a632ab2a7674a32e3c8a";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=41680bbd1721a632ab2a7674a32e3c8a&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm]= useState('')
  useEffect(() => {
    getMovie(FEATURED_API)
  }, []);
  const getMovie = (API) => {
    fetch(API)
    .then(res => res.json())
    .then((data) => {
      setMovies(data.results);
    });
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovie(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
}
  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
}
  return (
    <>
      <header>
        <form onSubmit={onSubmitHandler}>
          <input
            className="search"
            type="search"
            placeholder="Search... "
            value={searchTerm}
            onChange = {onChangeHandler}
          />
        </form>
      </header>
    <div className="movie-container">
      {movies.length>0 && movies.map((movie) => 
        <Movie key={movie.id} {...movie}/>
      )}
      </div>
      </>
  );
}

export default App;
