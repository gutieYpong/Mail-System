import styled from "styled-components";


const Container = styled.footer`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  background-color: lightgrey;
`;

const CreatedBy = styled.p`
  width: 100%;

  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.7rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <Container>
      <CreatedBy>Copyright © 2022. All rights reserved - <b><u>gutieYpong</u></b></CreatedBy>
    </Container>
  );
}

export default Footer;
