import React, { useEffect, useState } from "react"
import useOutsideClick from "./useOutsideClick.jsx"
import styles from "@/styles/todolist.module.css"

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  const modalRef = useOutsideClick(handleClose)

  return (
    <div
      className={`${styles.modalContainer}
      ${
        isOpen
          ? "bg-gray-700 backdrop-filter backdrop-blur-sm"
          : "bg-transparent backdrop-filter backdrop-blur-none"
      }`}
    >
      <div ref={modalRef} className={`${styles.modal} ${props.class}`}>
        {props.component}
      </div>
    </div>
  )
}

export default Modal
