import React, { Component } from 'react';
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';




// Image
import NoImage from '../images/no_image.jpg';
// API
import API from '../API';
import { moveEmitHelpers } from 'typescript';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};

class Home extends Component {
  state = {
    movies: initialState,
    searchTerm: '',
    isLoadingMore: false,
    loading: false,
    error: false
  };

  fetchMovies = async (page, searchTerm = '') => {
    try {
      this.setState({ error: false, loading: true });

      const movies = await API.fetchMovies(searchTerm, page);

      this.setState(prev => ({
        ...prev,
        movies: {
          ...movies,
          results:
            page > 1
              ? [...prev.movies.results, ...movies.results]
              : [...movies.results]
        },
        loading: false
      }));
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  handleSearch = searchTerm =>
    this.setState({ movies: initialState, searchTerm }, () =>
      this.fetchMovies(1, this.state.searchTerm)
    );

  handleLoadMore = () =>
    this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);

  componentDidMount() {
    this.fetchMovies(1);
  }

  render() {
    const { searchTerm, movies, loading, error } = this.state;

    if (error) return <div>Something went wrong ...</div>;

    return (
      <>
        {!searchTerm && movies.results[0] ? (
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
            title={movies.results[0].original_title}
            text={movies.results[0].overview}
          />
        ) : null}
        <Grid header='Popular Movies'>{movies.results.map(movie => (
          <div key={movie.id}>{movie.title}</div>
        ))}</Grid>
        
        
      </>
    );
  }
}

export default Home;
