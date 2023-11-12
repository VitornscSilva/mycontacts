/* eslint-disable react/jsx-one-expression-per-line */
import emptyBox from '../../../../assets/images/empty-box.svg';

import { Container } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="Emtpy Box" />

      <p>
        You dont have any contacts registered yet!
        Click the <strong>”New contact”</strong> button above to add your
        first one
      </p>
    </Container>
  );
}
