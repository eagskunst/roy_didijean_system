import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Container,
  Typography,
  CircularProgress,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
} from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
// mock
import { useProducts } from '../hooks/useProducts';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { products, loading, formValues, handleFormChange, addProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Helmet>
        <title> Producto | Roni Dididjean </title>
      </Helmet>
      <Dialog
        open={showForm}
        onClose={() => {
          setShowForm(false);
        }}
      >
        <DialogTitle>Productos</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingresa los datos del producto </DialogContentText>
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
            value={formValues.type}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="type"
            id="type"
            label="Tipo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.color}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="color"
            id="color"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.brand}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="brand"
            id="brand"
            label="Marca"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.style}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="style"
            id="style"
            label="Estilo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.material}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="material"
            id="material"
            label="Material"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.size}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="size"
            id="size"
            label="Talla"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.price}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="price"
            id="price"
            label="Precio"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.quantityInStock}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            id="quantityInStock"
            name="quantityInStock"
            label="Cantidad en disponible"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formValues.buyCost}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            name="buyCost"
            id="buyCost"
            label="Costo de compra"
            type="text"
            fullWidth
            variant="standard"
          />{' '}
          <TextField
            value={formValues.sellCost}
            onChange={handleFormChange}
            name="sellCost"
            autoFocus
            margin="dense"
            id="sellCost"
            label="Precio de venta"
            type="text"
            fullWidth
            variant="standard"
          />{' '}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              addProduct();
              setShowForm(false);
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Productos{' '}
          </Typography>
          <Button variant="contained" onClick={() => setShowForm(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
            Agregar
          </Button>
        </Stack>

        {loading ? <CircularProgress /> : <ProductList products={products} />}
      </Container>
    </>
  );
}
