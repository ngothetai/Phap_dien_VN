import React from 'react';
import Modal from 'react-modal';
import '../../assets/sass/components/_customModal.scss';

const CustomModal = ({ isOpen, onClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Modal"
        >
            <div>{children}</div>
            <div className='close'>
                <button
                    className='btn-close'

                    onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default CustomModal;
