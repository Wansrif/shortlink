import PropTypes from 'prop-types';
import classNames from 'classnames';
// import logo from '@static/images/react.svg';
import deris from '@static/images/deris.jpeg';

import classes from './style.module.scss';

const Loader = ({ isLoading }) => (
  <div
    className={classNames({
      [classes.loaderComponent]: true,
      [classes.showLoader]: isLoading || false,
    })}
  >
    <img src={deris} alt="Loading" />
  </div>
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
export default Loader;
