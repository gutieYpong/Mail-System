import React from 'react'
// import styled from 'styled-components';

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

function createData(sender, subject, date) {
  return { sender, subject, date };
}

const rows = [
  createData('abc@pong.com', 'fuck you', '2022-03-23'),
  createData('xxx@pong.com', 'nice to fuck you', '2022-03-23'),
  createData('xyz@pong.com', 'goodbye sunshine', '2022-03-23'),
];

const CustomizedTables = () => {
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
          {rows.map((row) => (
            <StyledTableRow key={row.sender}>
              <StyledTableCell component="th" scope="row">
                {row.sender}
              </StyledTableCell>
              <StyledTableCell>{row.subject}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const Inbox = () => {
  return (
    <CustomizedTables />
    // <div>
    //   <MailItem>
    //     <Sender>xxx@pong.com</Sender>
    //     <div>subject</div>
    //     <div>time</div>
    //   </MailItem>
    // </div>
  )
}

export default Inbox;