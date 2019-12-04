const React = require('react');
const PropTypes = require('prop-types');
const moment = require('moment');
const Table = require('react-bootstrap/Table');

const PriceTable = ({ rows, fields }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        {fields.map((field, fieldId) => (
          <th key={fieldId}>
            {field.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, rowId) => (
        <tr key={rowId}>
          {fields.map((field) => (
            <td key={field.name}>{field.name === 'date' ? moment(row.date).format('DD-MMM-YY') : row[field.name] }</td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

PriceTable.propTypes = {
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

module.exports = PriceTable;
