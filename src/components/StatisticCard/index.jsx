import PropTypes from 'prop-types';
import classes from './style.module.scss';

const StatisticCard = ({ icon, title, description }) => (
  <div className={classes.statisticItem}>
    <div className={classes.statisticItemIcon}>
      <img src={icon} alt={title} style={{ width: '2.5rem', height: '2.5rem' }} />
    </div>
    <h2>{title}</h2>
    <p className={classes.statisticItemDescription}>{description}</p>
  </div>
);

StatisticCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default StatisticCard;
