import PropTypes from 'prop-types'
// @mui
import { TableRow, TableCell, TableHead } from '@mui/material'

// ----------------------------------------------------------------------

AdminsListHead.propTypes = {
  headLabel: PropTypes.array
}

export default function AdminsListHead ({ headLabel }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
