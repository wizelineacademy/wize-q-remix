import { Form } from '@remix-run/react';
import PropTypes from 'prop-types';
import Button from '~/components/Atoms/Button';
import { CLOSE_BUTTON, DANGER_BUTTON, SECONDARY_BUTTON } from '~/utils/constants';
import { useUser } from '~/utils/hooks/useUser';
import * as Styled from './LogoutConfirmationModal.styled';

function LogoutConfirmationModal({ show, onClose, onSubmitSuccess }) {
  const profile = useUser();

  if (!show) { return null; }
  return (
    <div onClick={onClose}>
      <Styled.LogoutModal show>
        <Form action="/logout" method="POST" >
        <Styled.LogoutModalDialog onClick={e => e.stopPropagation()}>
          <Styled.ModalHeader variant="logout" closeButton>
            <Styled.ModalTitle>Warning</Styled.ModalTitle>
            <Button category={CLOSE_BUTTON} onClick={onClose} />
          </Styled.ModalHeader>
          <Styled.ModalBody>
              <p> You&apos;re about to log out as {profile.full_name},
                do you still want to continue? </p>
          </Styled.ModalBody>
          <Styled.ModalFooter variant="logout">
            <Button type="button" category={SECONDARY_BUTTON} onClick={onClose}>Cancel</Button>
            <Button category={DANGER_BUTTON} type="submit" >Logout</Button>
          </Styled.ModalFooter>
        </Styled.LogoutModalDialog>
        </Form>
      </Styled.LogoutModal>
    </div>
  );
}

LogoutConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default LogoutConfirmationModal;
