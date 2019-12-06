const React = require('react');
const DefaultLayout = require('./layouts/default');
const PriceTable = require('./components/price_table');

const IndexPage = (props) => (
  <DefaultLayout title={props.title}>
    <div className="container-fluid">
      <PriceTable {...props} />
    </div>
  </DefaultLayout>
);

module.exports = IndexPage;