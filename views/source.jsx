const React = require('react');
const DefaultLayout = require('./layouts/default');
const SourceTable = require('./components/source_table');

const SourcePage = (props) => (
  <DefaultLayout title={props.title}>
    <div className="container-fluid">
      <SourceTable {...props} />
    </div>
  </DefaultLayout>
);

module.exports = SourcePage;
