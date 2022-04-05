import styled from 'styled-components';

const Container = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: lightblue;
`;

const Title = styled.h2`
`;

const Header = props => {
  return (
    <Container>
      <Title>
        Welcome to Pmail ... { props.account?.email }
      </Title>
    </Container>
  );
};

export default Header;
