import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { ListHead } from '../sections/ListHead';
// mock
import USERLIST from '../_mock/user';
import { useTransactions } from '../hooks/useTransactions';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Identificador' },
  { id: 'data_payment', label: 'Número de referencia' },
  { id: 'payment_method', label: 'Método de pago' },
  { id: 'currency', label: 'Divisa' },
  { id: 'productsTotal', label: 'Total de Productos' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TransactionsPage() {
  const [page] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName] = useState('');

  const [rowsPerPage] = useState(5);

  const {
    transactions,
    loading,
    isClientTransaction,
    handleSwitchChange,
    formValues,
    handleFormChange,
    productToAdd,
    addProductToTransaction,
    handleProductFormChange,
    addTransaction,
  } = useTransactions();

  const [showForm, setShowForm] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(transactions, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> Transacción | Roni Didijean </title>
      </Helmet>
      <Dialog
        open={showForm}
        onClose={() => {
          setShowForm(false);
        }}
      >
        <>
          <DialogContent>
            <DialogContentText>Ingresa los datos de la transacción </DialogContentText>
            <FormGroup>
              <FormControlLabel
                label="Transacción de Cliente"
                control={
                  <Switch
                    checked={isClientTransaction}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
              />
            </FormGroup>
            <TextField
              value={isClientTransaction ? formValues.clientId : formValues.providerId}
              onChange={handleFormChange}
              autoFocus
              margin="dense"
              name={isClientTransaction ? 'clientId' : 'providerId'}
              id={isClientTransaction ? 'clientId' : 'providerId'}
              label={isClientTransaction ? 'Identificador Del Cliente' : 'Identificador Del Proovedor'}
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={formValues.currency}
              onChange={handleFormChange}
              autoFocus
              margin="dense"
              name="currency"
              id="currency"
              label="Divisa"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={formValues.paymentMethod}
              onChange={handleFormChange}
              autoFocus
              margin="dense"
              id="paymentMethod"
              name="paymentMethod"
              label="Método de pago"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={formValues.dataPayment}
              onChange={handleFormChange}
              autoFocus
              margin="dense"
              name="dataPayment"
              id="dataPayment"
              label="Número de Referencia"
              type="text"
              fullWidth
              variant="standard"
            />{' '}
            <TextField
              value={productToAdd.product_id}
              onChange={handleProductFormChange}
              autoFocus
              margin="dense"
              name="product_id"
              id="product_id"
              label="Identificador del producto"
              type="number"
              fullWidth
              variant="standard"
            />{' '}
            <TextField
              value={productToAdd.product_quantity}
              onChange={handleProductFormChange}
              autoFocus
              margin="dense"
              name="product_quantity"
              id="product_quantity"
              label="Cantidad de producto"
              type="number"
              fullWidth
              variant="standard"
            />{' '}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Button
                onClick={() => {
                  addProductToTransaction();
                }}
              >
                Añadir Producto a la transacción
              </Button>
              {formValues.products.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {formValues.products.map((product, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="p" gutterBottom>
                        Producto: {product.product_id}
                      </Typography>
                      <Typography variant="p" gutterBottom>
                        Cantidad: {product.product_quantity}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                addTransaction();
                setShowForm(false);
              }}
            >
              Guardar
            </Button>
          </DialogActions>
        </>
      </Dialog>
      <Container>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Transacciones{' '}
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowForm(true)}>
            Agregar
          </Button>
        </Stack>

        {loading ? (
          <CircularProgress />
        ) : (
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, data_payment: dataPayment, payment_method: paymentMethod, currency, product } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{dataPayment}</TableCell>
                          <TableCell align="left">{paymentMethod}</TableCell>
                          <TableCell align="left">{currency}</TableCell>
                          <TableCell align="left">{product.length}</TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        )}
      </Container>
    </>
  );
}
