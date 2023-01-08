import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
import useOutsideClick from '@/hooks/useOutsideClick';
=======
import useOutsideClick from './useOutsideClick';
>>>>>>> parent of 0908b09 (Convert components .jsx)
import styles from '@/styles/todolist.module.css'

const Modal = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        if (isOpen) {
            setIsOpen(false);

            setTimeout(() => {
                if (props.isModalOpen) props.onClose();
            }, 50);
        }
    };

    const modalRef = useOutsideClick(handleClose);

    return (
        <div
            className={`${styles.modalContainer}
      ${isOpen ? 'bg-gray-900 backdrop-filter backdrop-blur-sm' : 'bg-transparent backdrop-filter backdrop-blur-none'}`}
        >
            <div
                ref={modalRef}
                className={`${styles.modal} ${props.class}`}
            >
                {props.component}
            </div>
        </div>
    )
}

export default Modal;