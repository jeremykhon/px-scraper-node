const React = require('react');

const Error = ({ message, error }) => (
  <div>
    <h1>{message}</h1>
    <hr />
    <h2>{error.status}</h2>
    <hr />
    <div>{error.stack}</div>
    <hr />
  </div>
);

module.exports = Error;
