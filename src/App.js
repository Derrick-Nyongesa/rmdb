import React from 'react';
//routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//components
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

//styles
import { GlobalStyle } from './GlobalStyle';

function App() {
  return (
    <Router>
      <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>;
          <Route path='/:movieId' element={<Movie></Movie>}></Route>;
          <Route path='/*' element={<NotFound></NotFound>}></Route>;
        </Routes>
      <GlobalStyle></GlobalStyle>
    </Router>
  );
}

export default App;
