import PropTypes from 'prop-types';

import classes from './style.module.scss';

const AppLayout = ({ children }) => <div className={classes.layoutWrapper}>{children}</div>;

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
