import { Modal, Button } from 'react-bootstrap';

interface ConfirmDeleteModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ show, onHide, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} autoFocus>
          No
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
