import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const {
    name,
    price,
    quantity_in_stock: quaintityInStock,
    buy_cost: buyCost,
    sell_cost: sellCost,
    img_url: imgUrl,
  } = product;
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={name} src={imgUrl || faker.image.cats()} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>

        <Stack direction="column" alignItems="center" justifyContent="start">
          <Typography variant="subtitle1">
            <Typography component="span" variant="body1">
              Precio ${price}
            </Typography>
          </Typography>
          <Typography variant="subtitle1">
            <Typography component="span" variant="body1">
              Cantidad Disponible {quaintityInStock}
            </Typography>
          </Typography>
          <Typography variant="subtitle1">
            <Typography component="span" variant="body1">
              Costo de Compra ${buyCost}
            </Typography>
          </Typography>
          <Typography variant="subtitle1">
            <Typography component="span" variant="body1">
              Costo de Venta ${sellCost}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
