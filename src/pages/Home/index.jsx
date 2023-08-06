import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectShortUrl, selectShortUrlError, selectShortUrlLoading } from '@containers/App/selectors';
import { deleteShortUrl, getShortUrl } from '@containers/App/actions';

import ShortenItem from '@components/ShortenItem';
import DeleteModal from '@components/DeleteModal';
import StatisticCard from '@components/StatisticCard';

import working from '@static/images/illustration-working.svg';
import brand from '@static/images/icon-brand-recognition.svg';
import detailed from '@static/images/icon-detailed-records.svg';
import customizable from '@static/images/icon-fully-customizable.svg';
import logo from '@static/images/logo.svg';
import facebook from '@static/images/icon-facebook.svg';
import twitter from '@static/images/icon-twitter.svg';
import pinterest from '@static/images/icon-pinterest.svg';
import instagram from '@static/images/icon-instagram.svg';
import Loader from '@components/Loader';
import classes from './style.module.scss';

const Home = ({ shortUrl, shortUrlLoading, shortUrlError, intl: { formatMessage } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shortUrlCode, setShortUrlCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const errorMessages = useMemo(
    () => ({
      1: formatMessage({ id: 'shorten_error_1' }),
      2: formatMessage({ id: 'shorten_error_2' }),
      3: formatMessage({ id: 'shorten_error_3' }),
      4: formatMessage({ id: 'shorten_error_4' }),
      5: formatMessage({ id: 'shorten_error_5' }),
      6: formatMessage({ id: 'shorten_error_6' }),
      7: formatMessage({ id: 'shorten_error_7' }),
      8: formatMessage({ id: 'shorten_error_8' }),
      9: formatMessage({ id: 'shorten_error_9' }),
      10: formatMessage({ id: 'shorten_error_10' }),
    }),
    [formatMessage]
  );

  useEffect(() => {
    if (shortUrlError && shortUrlError.errorCode) {
      setErrorMessage(errorMessages[shortUrlError.errorCode]);
    } else {
      setErrorMessage('');
    }
  }, [shortUrlError, errorMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const arr = shortUrl.map((item) => item.original_link);
    if (arr.find((item) => item.includes(data.get('url')) && item.length === data.get('url').length)) {
      setErrorMessage(formatMessage({ id: 'shorten_error_11' }));
      return;
    }

    dispatch(getShortUrl(data.get('url')));
  };

  const handleDeleteErrorMessage = () => {
    setErrorMessage('');
  };

  const handleCancelModal = () => {
    setIsOpen(false);
    setShortUrlCode('');
  };

  const handleDeleteConfirmModal = () => {
    setIsOpen(false);
    dispatch(deleteShortUrl(shortUrlCode));
  };

  const statisticData = [
    {
      id: 1,
      icon: brand,
      title: formatMessage({ id: 'brand_recognition' }),
      description: formatMessage({ id: 'brand_recognition_description' }),
    },
    {
      id: 2,
      icon: detailed,
      title: formatMessage({ id: 'detailed_records' }),
      description: formatMessage({ id: 'detailed_records_description' }),
    },
    {
      id: 3,
      icon: customizable,
      title: formatMessage({ id: 'fully_customizable' }),
      description: formatMessage({ id: 'fully_customizable_description' }),
    },
  ];

  return (
    <div className={classes.container}>
      <section className={classes.heroWrapper}>
        <div className={classes.heroContent}>
          <h1 className={classes.heroTitle}>
            <FormattedMessage id="hero_title" />
          </h1>
          <p className={classes.heroDescription}>
            <FormattedMessage id="hero_description" />
          </p>
          <button type="button" className={classes.heroButton}>
            <FormattedMessage id="hero_button" />
          </button>
        </div>
        <img className={classes.heroImage} src={working} alt="illustration-working" />
      </section>
      <div className={classes.shortenHalfWraperr}>
        <div className={classes.shortenHalfBg} />
      </div>
      <section className={classes.shortenWrapper}>
        <form method="post" className={classes.shortenForm} onSubmit={handleSubmit}>
          <div className={classes.inputWrapper}>
            <input
              type="text"
              placeholder={formatMessage({ id: 'shorten_placeholder' })}
              name="url"
              onChange={handleDeleteErrorMessage}
              style={{ border: errorMessage ? '4px solid red' : '' }}
            />
            <span>{errorMessage}</span>
          </div>
          <button type="submit">
            <FormattedMessage id="shorten_button" />
          </button>
        </form>
        <div className={classes.shortenResult}>
          <Loader isLoading={shortUrlLoading} />
          {shortUrl.map((item) => (
            <ShortenItem
              key={item.code}
              setIsopen={setIsOpen}
              setShortUrlCode={setShortUrlCode}
              codeLink={item.code}
              originalLink={item.original_link}
              fullShortLink={item.full_short_link}
            />
          ))}
        </div>
      </section>

      <DeleteModal isOpen={isOpen} onCancel={handleCancelModal} onDeleteConfirm={handleDeleteConfirmModal} />

      <section className={classes.statisticWrapper}>
        <div className={classes.statisticHeader}>
          <h2 className={classes.statisticTitle}>
            <FormattedMessage id="advanced_statistics_title" />
          </h2>
          <p className={classes.statisticDescription}>
            <FormattedMessage id="advanced_statistics_description" />
          </p>
        </div>
        <div className={classes.statisticContent}>
          <div className={classes.horizontalLine} />
          {statisticData.map((item) => (
            <StatisticCard key={item.id} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>
      <section className={classes.boostWrapper}>
        <div className={classes.boostContent}>
          <h2 className={classes.boostTitle}>
            <FormattedMessage id="boost_links_title" />
          </h2>
          <button type="button" className={classes.boostButton}>
            <FormattedMessage id="boost_links_button" />
          </button>
        </div>
      </section>
      <footer>
        <div className={classes.footerContent}>
          <div className={classes.footerLogo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={classes.footerMenu}>
            <div className={classes.itemWrapper}>
              <a href="/" className={classes.footerMenuItem}>
                <FormattedMessage id="footer_features" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_link_shortening" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_branded_links" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_analytics" />
              </a>
            </div>
            <div className={classes.itemWrapper}>
              <a href="/" className={classes.footerMenuItem}>
                <FormattedMessage id="footer_pricing" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_blog" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_developers" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_support" />
              </a>
            </div>
            <div className={classes.itemWrapper}>
              <a href="/" className={classes.footerMenuItem}>
                <FormattedMessage id="footer_resources" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_about" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_our_team" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_careers" />
              </a>
              <a href="/" className={classes.footerMenuItem__child}>
                <FormattedMessage id="footer_contact" />
              </a>
            </div>
          </div>
          <div className={classes.footerSocial}>
            <a href="/">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="/">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="/">
              <img src={pinterest} alt="pinterest" />
            </a>
            <a href="/">
              <img src={instagram} alt="instagram" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

Home.propTypes = {
  shortUrl: PropTypes.array,
  shortUrlLoading: PropTypes.bool.isRequired,
  shortUrlError: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  shortUrl: selectShortUrl,
  shortUrlLoading: selectShortUrlLoading,
  shortUrlError: selectShortUrlError,
});

export default injectIntl(connect(mapStateToProps)(Home));
