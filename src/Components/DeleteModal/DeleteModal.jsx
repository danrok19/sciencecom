import { useState } from 'react';
import ReactDom from 'react-dom';
import './deleteModal.css';
import Button from '../Button/Button';

const DeleteModal = ({ onClose, title, content, onSubmit }) => {


  return ReactDom.createPortal(
    <div>
      <div className="grey-background" onClick={onClose} />
      <div className="delete-modal">
        <div className="title-section">
            {title}
        </div>
        <div className="content-section">
            {content}
        </div>
        <div className="button-section">
            <Button secondary onClick={onClose}>Anuluj</Button>
            <Button primary onClick={onSubmit}>Zatwiedź usuwanie</Button>
        </div>
      </div>
    </div>, document.querySelector('.modal-container')
  )
}

export default DeleteModal
