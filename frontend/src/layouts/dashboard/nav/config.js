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
    title: 'Proveedores (Independientes)',
    path: '/dashboard/providers-independent',
    icon: icon('ic_cart'),
  },
  {
    title: 'Proveedores (Compañias)',
    path: '/dashboard/providers-company',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
