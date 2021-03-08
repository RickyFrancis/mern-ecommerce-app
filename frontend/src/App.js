import React from 'react';

// Components Import
import Header from './components/Header';
import Footer from './components/Footer';

// Screens import
import HomeScreen from './screens/HomeScreen';

import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
