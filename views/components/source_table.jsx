const React = require('react');
const PropTypes = require('prop-types');
const moment = require('moment');
const Table = require('react-bootstrap/Table');

const SourceTable = ({ rows, fields }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        {fields.map((field) => (
          <th key={field.columnID}>
            {field.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          {Object.entries(row).map(([key, val]) => (
            <td key={key}>{key === 'createdAt' ? moment(val).format('DD-MMM-YY, HH:mm') : val }</td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

SourceTable.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.object,
    }),
  ).isRequired,
};

module.exports = SourceTable;
