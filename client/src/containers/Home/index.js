import React from 'react'
import styled from 'styled-components';
import useSWR from 'swr';
import { useSelector } from 'react-redux';

import authSlice from '../../features/authSlice';
import { fetcher } from "../../utils/axios";

import Header from './Header';
import Main from './Main';


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 10vh auto;
  padding: 1rem 1rem 0 1rem;

  background-color: lightpink;
`;

const Home = () => {
  const account = useSelector( state => state.persistedReducer.auth.account );
  const userId = account?.id;

  const user = useSWR(
    `/user/${userId}/`,
    fetcher,
  );

  return (
    <Container>
      <Header account={ user.data && account } />
      <Main />
    </Container>
  )
}

export default Home;