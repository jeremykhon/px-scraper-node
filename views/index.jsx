const React = require('react');
const Button = require('react-bootstrap/Button');
const DefaultLayout = require('./layouts/default');
const PriceTable = require('./components/price_table');

const IndexPage = (props) => (
  <DefaultLayout title={props.title}>
    <div className="container-fluid">
      <PriceTable {...props} />
      <Button variant="outline-primary" href="/downloadCSV">Download to CSV</Button>
    </div>
  </DefaultLayout>
);

module.exports = IndexPage;
