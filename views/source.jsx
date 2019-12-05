const React = require('react');
const DefaultLayout = require('./layouts/default');

const SourcePage = (props) => (
  <DefaultLayout title={props.title}>
    <div className="container-fluid">
      nothing here yets
    </div>
  </DefaultLayout>
);

module.exports = SourcePage;
