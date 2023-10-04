import React from 'react';
import ReactDom from 'react-dom';
import './filterModal.css';

const FilterModal = () => {
  return ReactDom.createPortal(
    <div>
        FilterModal
    </div>,document.querySelector('.modal-container')
  )
}

export default FilterModal
