import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <h1>Bienvenido a FitnessApp</h1>
      <p>Gestiona tus comidas de manera eficiente.</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export default Home;
