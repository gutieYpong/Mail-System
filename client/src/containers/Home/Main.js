import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';


const Container = styled.main`
  width: 100%;
  height: 100%;

  background-color: lightcoral;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .8rem;

  border: 1px solid lightblue;
`;

const MailBox = styled.div`
  width: 100%;
  height: 100%;

  border: 1px solid lightgreen;
`;


const Main = () => {
  return (
    <Container>
      <NavBar>
        <Link to="inbox"><Button variant="outlined" size="large">Inbox</Button></Link>
        <Link to="compose"><Button variant="outlined" size="large">Compose</Button></Link>
        <Link to="sent"><Button variant="outlined" size="large">Sent</Button></Link>
        <Link to="archive"><Button variant="outlined" size="large">Archive</Button></Link>
        <Link to="profile"><Button variant="outlined" size="large">Profile</Button></Link>
        {/* <Button variant="outlined">Log Out</Button> */}
      </NavBar>
      <MailBox>
        <Outlet />
      </MailBox>

    </Container>
  );
};

export default Main;
