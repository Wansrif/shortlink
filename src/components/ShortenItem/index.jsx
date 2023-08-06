import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useClipboard } from 'use-clipboard-copy';

import { CgClose } from 'react-icons/cg';
import classes from './style.module.scss';

// ShortenItem component
const ShortenItem = ({ setIsopen, setShortUrlCode, codeLink, originalLink, fullShortLink }) => {
  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard({
    onSuccess: () => {
      setCopied(true);
      const timer = setInterval(() => {
        setCopied(false);
        clearInterval(timer);
      }, 600);
    },
  });

  const openDeleteModal = () => {
    setIsopen(true);
    setShortUrlCode(codeLink);
  };

  return (
    <div className={classes.shortenResultItem}>
      <button type="button" className={classes.shortenResultItemClose} onClick={openDeleteModal}>
        <CgClose style={{ width: '1rem', height: '1rem' }} />
      </button>
      <div className={classes.shortenResultItemLink}>{originalLink}</div>
      <div className={classes.shortenResultItemWrapper}>
        <a href={fullShortLink} target="_blank" className={classes.shortenResultItemShortLink} rel="noreferrer">
          {fullShortLink}
        </a>
        <button type="button" className={classes.shortenResultItemButton} onClick={() => clipboard.copy(fullShortLink)}>
          {copied ? <FormattedMessage id="shorten_copied" /> : <FormattedMessage id="shorten_copy" />}
        </button>
      </div>
    </div>
  );
};

ShortenItem.propTypes = {
  setIsopen: PropTypes.func.isRequired,
  setShortUrlCode: PropTypes.func.isRequired,
  codeLink: PropTypes.string.isRequired,
  originalLink: PropTypes.string.isRequired,
  fullShortLink: PropTypes.string.isRequired,
};

export default ShortenItem;
