import { Helmet } from 'react-helmet-async'
import { filter } from 'lodash'
import { useState } from 'react'
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  Button,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton,
  Popover,
  MenuItem
} from '@mui/material'
// components
import Iconify from '../components/iconify'
import Scrollbar from '../components/scrollbar'
// sections
import { ListHead } from '../sections/ListHead'
// mock
import USERLIST from '../_mock/user'
import { useAdmins } from '../hooks/useAdmins'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Identificador' },
  { id: 'name', label: 'Nombre' },
  { id: 'username', label: 'Usuario' },
  { id: 'email', label: 'Email' },
  { id: '', label: '' }
]

// ----------------------------------------------------------------------

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter (array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el[0])
}

export default function AdminsPage () {
  const [page] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('name')

  const [filterName] = useState('')

  const [rowsPerPage] = useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0

  const {
    admins,
    loading,
    formValues,
    handleFormChange,
    addAdmin,
    updateAdmin,
    handleEditFormChange,
    editFormValues,
    deleteAdmin
  } = useAdmins()

  const filteredUsers = applySortFilter(admins, getComparator(order, orderBy), filterName)

  const isNotFound = !filteredUsers.length && !!filterName

  const [showForm, setShowForm] = useState(false)
  const [open, setOpen] = useState(null)

  const [showEditForm, setShowEditForm] = useState(false)

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }
  return (
    <>
      <Helmet>
        <title> Administrador | Roni Didijean </title>
      </Helmet>
      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <DialogTitle>Administradores</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingresa los datos del administrador </DialogContentText>
          <TextField
            value={formValues.name}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.password}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="password"
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
          />{' '}
          <TextField
            value={formValues.email}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Correo"
            type="email"
            fullWidth
            variant="standard"
          />{' '}
          <TextField
            value={formValues.username}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="username"
            id="username"
            label="Usuario"
            type="text"
            fullWidth
            variant="standard"
          />{' '}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              addAdmin()
              setShowForm(false)
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showEditForm} onClose={() => setShowEditForm(false)}>
        <DialogTitle>Administradores</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingresa los datos del administrador a actualizar </DialogContentText>
          <TextField
            value={editFormValues.name}
            onChange={handleEditFormChange}
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={editFormValues.username}
            onChange={handleEditFormChange}
            autoFocus
            margin="dense"
            name="username"
            id="username"
            label="Usuario"
            type="text"
            fullWidth
            variant="standard"
          />{' '}
          <TextField
            value={editFormValues.newUsername}
            onChange={handleEditFormChange}
            autoFocus
            margin="dense"
            name="newUsername"
            id="newUsername"
            label="Nuevo Usuario"
            type="text"
            fullWidth
            variant="standard"
          />{' '}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditForm(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              updateAdmin()
              setShowEditForm(false)
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Administradores{' '}
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowForm(true)}>
            Agregar
          </Button>
        </Stack>
        {loading
          ? (
          <CircularProgress />
            )
          : (
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
                      const { id, user, username } = row

                      const { name, email } = user
                      const selectedUser = selected.indexOf(name) !== -1

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell align="left">{id}</TableCell>

                          <TableCell align="left">{name}</TableCell>

                          <TableCell align="left">{username}</TableCell>

                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                          <Popover
                            open={Boolean(open)}
                            anchorEl={open}
                            onClose={handleCloseMenu}
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                              sx: {
                                p: 1,
                                width: 140,
                                '& .MuiMenuItem-root': {
                                  px: 1,
                                  typography: 'body2',
                                  borderRadius: 0.75
                                }
                              }
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                setShowEditForm(true)
                                handleCloseMenu()
                              }}
                            >
                              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                              Editar
                            </MenuItem>

                            <MenuItem
                              sx={{ color: 'error.main' }}
                              onClick={() => {
                                deleteAdmin(username)
                                handleCloseMenu()
                              }}
                            >
                              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                              Eliminar
                            </MenuItem>
                          </Popover>
                        </TableRow>
                      )
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
                              textAlign: 'center'
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
  )
}
