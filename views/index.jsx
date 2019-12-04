const React = require('react');
const Navbar = require('react-bootstrap/Navbar');
const DefaultLayout = require('./layouts/default');
const PriceTable = require('./components/price_table');

const Index = (props) => (
  <DefaultLayout title={props.title}>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Maya&apos;s Car Price Scraper</Navbar.Brand>
    </Navbar>
    <br />
    <div className="container-fluid">
      <PriceTable {...props} />
    </div>
  </DefaultLayout>
);

module.exports = Index;
