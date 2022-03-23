import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../store/reducers/ActionCreators";
import Tooltip from '@mui/material/Tooltip';
import AlertDialog from "./AlertDialog";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";

const CurrencyItemComponent = ({charCode}) => {
  const {currency} = useSelector((state) => state.currenciesReducer);
  const [key_, setKey] = useState(null);

  const item = currency.items.find(g => g.charCode === charCode);

  if (!item) return null;

  return (
    <>
      <AlertDialog open={key_ !== null} key_={charCode} onClose={() => setKey(null)}/>

      <TableRow hover key={item.id} onClick={() => setKey(item.charCode)}>
        <TableCell align="left">{item.numCode}</TableCell>
        <Tooltip title={item.name} placement="bottom">
          <TableCell>{item.charCode}</TableCell>
        </Tooltip>
        <TableCell align="right">{item.nominal}</TableCell>
        <TableCell align="right">{item.value}</TableCell>
        {item.percentage < 0 ? (
          <TableCell align="right" sx={{color: "red"}}>
            {item.percentage}%
          </TableCell>
        ) : (
          <TableCell align="right" sx={{color: "green"}}>
            +{item.percentage}%
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

export default function TableCurrency() {

  const dispatch = useDispatch()
  const {currency, isLoading, error} = useSelector((state) => state.currenciesReducer)
  const [loading, setLoading] = useState(true);

  const fetchCurrency = () => dispatch(fetchCurrencies());

  useEffect(() => {
    fetchCurrency();
  }, []);

  if (error) {
    return (
      <>
        <h1>Something went wrong...</h1>
        <Typography variant="h6" component="h6">{error}</Typography>
        <Button variant={"outlined"} onClick={() => fetchCurrency()}>Повторная попытка</Button>
      </>
    );
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  console.log(currency);

  return (
    <>
      <TableContainer component={Paper} sx={{my: '15px'}}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Цифр. код</TableCell>
              <TableCell>Букв. код</TableCell>
              <TableCell align="right">Единиц</TableCell>
              {/*<TableCell align="right">Валюта</TableCell>*/}
              <TableCell align="right">Курс</TableCell>
              <TableCell align="right">Процентное изменение(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(currency.items || []).map((row, i) => (
              <CurrencyItemComponent key={i} charCode={row.charCode}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
