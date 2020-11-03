import React from 'react';
import Container from 'react-bootstrap/Container';
import Search from './Search';
import CardList from '../components/Card/cardList';

const App = () => {
  return (
    <Container>
        <Search />
        <CardList/>
    </Container>
  );
}


export default App;