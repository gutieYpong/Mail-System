import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

import authSlice from '../../features/authSlice';

import useSWR from 'swr';
import { fetcher } from "../../utils/axios";
// import { RootState } from "../../app/store";


const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;

  background-color: lightpink;
`;

const Profile = () => {
  const account = useSelector( state => state.persistedReducer.auth.account );
  // const account = useSelector((state: RootState) => state.auth.account);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { state } = useLocation();
  // console.log( `location.state: ${ state.userId }` );

  const userId = account?.id;

  const user = useSWR(
    `/user/${userId}/`,
    fetcher,
    // {
    //   refreshInterval: 5000  // 5s
    // }
  );

  const handleLogout = () => {
    dispatch( authSlice.actions.setLogout() );
    navigate("/login");
  };

  return (
    <RootContainer>
      <div>
        <button
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
      <div>
        {
          user.data ?
          <p>Welcome, { account.username }</p>
          :
          <p>Loading ...</p>
        }
      </div>
    </RootContainer>
  );
};

export default Profile;