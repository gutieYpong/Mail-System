import React from 'react'
// import styled from 'styled-components';
import useSWR from 'swr';
import * as dayjs from 'dayjs';

import { fetcher } from "../../utils/axios";
// import { fontLayout } from '../../constants/common';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// const MailItem = styled.div`
//   width: 100%;
//   height: auto;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;

//   border: 1px solid lightpink;
// `;

// const Sender = styled.span`
//   ${ fontLayout('Roboto', 'normal', '500', '16px', '12px', '#000000') }
// `;


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomizedTables = props => {
  const { inbox } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sender</StyledTableCell>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            inbox ?
            inbox.map((item) => (
              <StyledTableRow key={`mail-${item.id}`}>
                <StyledTableCell component="th" scope="row">
                  {item.sender_email}
                </StyledTableCell>
                <StyledTableCell>{item.subject}</StyledTableCell>
                <StyledTableCell align="right">{dayjs(item.created).format('YYYY-MM-DD hh:mm:ss A')}</StyledTableCell>
              </StyledTableRow>
            )) : 'loading'
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Inbox = () => {
  const inbox = useSWR(
    `/mail/inbox/`,
    fetcher,
  );

  return (
    <CustomizedTables inbox={inbox.data} />
  )
}

export default Inbox;