import styled from 'styled-components';

import { fontLayout } from '../constants/common';

const Container = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MailSender = styled.span`
  ${ fontLayout('Roboto', 'normal', '700', '1.6rem', '2.2rem', '#000000') }
`;

const MailSubject = styled.span`
  ${ fontLayout('Roboto', 'normal', '500', '1.6rem', '2.2rem', '#000000') }
`;

const MailDate = styled.span`
  ${ fontLayout('Roboto', 'normal', '500', '1.6rem', '2.2rem', '#737373') }
`;

const Mail = () => {
  return (
    <Container>
      <MailSender
        children="xxx@pong.com"
      />
      <MailSubject
        children="Re: Long time no see"
      />
      <MailDate
        children="Mar 1 2022, 3:22 PM"
      />
    </Container>
  )
}

export default Mail;