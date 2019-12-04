const React = require('react');
const DefaultLayout = require('./layouts/default');

const SourcePage = (props) => (
  <DefaultLayout title={props.title}>
    <div className="container-fluid">
      nothing here yet
    </div>
  </DefaultLayout>
);

module.exports = SourcePage;
