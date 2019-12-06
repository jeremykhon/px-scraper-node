const React = require('react');
const Navbar = require('react-bootstrap/Navbar');
const Nav = require('react-bootstrap/Nav');

function DefaultLayout(props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <link rel="stylesheet" href="css/bootstrap.min.css" />
      </head>
      <body>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Car Price Scraper</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Table</Nav.Link>
          </Nav>
        </Navbar>
        <br />
        {props.children}
      </body>
    </html>
  );
}

module.exports = DefaultLayout;
