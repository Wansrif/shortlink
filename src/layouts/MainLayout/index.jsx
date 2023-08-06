import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';
import { useUpdateSize } from '@utils/hookHelper';

import Navbar from '@components/Navbar';
import classes from './style.module.scss';

const MainLayout = ({ children, locale, theme, intl: { formatMessage } }) => {
  const navRef = useRef();
  const [navbarHeight, setNavbarHeight] = useState('0px');

  useUpdateSize(() => {
    setNavbarHeight(`${navRef?.current?.clientHeight}px`);
  });

  return (
    <div className={classes.layoutWrapper} style={{ '--height': navbarHeight }}>
      <Navbar title={formatMessage({ id: 'app_title_header' })} locale={locale} theme={theme} contentRef={navRef} />
      {children}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
