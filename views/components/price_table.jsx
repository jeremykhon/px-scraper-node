const React = require('react');
const PropTypes = require('prop-types');
const moment = require('moment');
const Table = require('react-bootstrap/Table');
const carData = require('../../lib/car_data');

const PriceTable = ({ rows, fields }) => (
  <div className="table-container">
    <Table striped bordered hover>
      <thead>
        <tr>
          {fields.map((field, fieldId) => (
            <th key={fieldId}>
              {field.name === 'date'
                ? 'Date'
                : (
                  <a
                    href={carData[field.name].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {field.name}
                  </a>
                )}
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
  </div>
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
