// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Administradores',
    path: '/dashboard/admins',
    icon: icon('ic_user'),
  },
  {
    title: 'Clientes',
    path: '/dashboard/clients',
    icon: icon('ic_user'),
  },
  {
    title: 'Proveedores',
    path: '/dashboard/providers',
    icon: icon('ic_cart'),
  },
  {
    title: 'Productos',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Transacciones',
    path: '/dashboard/transactions',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
