import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector} from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import moment from "moment";

export default function AlertDialog(props) {

  const {currencies} = useSelector((state) => state.currenciesReducer)

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'lg'}
    >
      <DialogTitle id="alert-dialog-title">
        {"Список по данной валюте за 10 дней."}
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{my: '15px'}}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Курс</TableCell>
                <TableCell>Процентное изменение(%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencies.map((row, i) => {
                const item = row.items.find(g => g.charCode === props.key_);
                return (
                  <TableRow hover key={i}>
                    <TableCell>
                      {moment(row.date).format('D-MM-YYYY')}
                    </TableCell>
                    <TableCell>{item.value}</TableCell>
                    {item.percentage >= 0 ? (
                      <TableCell sx={{color: "green"}}>+{item.percentage}%</TableCell>
                    ) : (
                      <TableCell sx={{color: 'red'}}>{item.percentage}%</TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} variant={"outlined"}>Назад</Button>
      </DialogActions>
    </Dialog>
  );
}
