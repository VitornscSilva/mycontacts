import PropTypes from 'prop-types';

import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

import { Container } from './styles';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="Sad" />
      <div className="details">
        <strong>An error occurred while retrieving your contacts!</strong>
        <Button type="button" onClick={onTryAgain}>
          Try Again
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
