import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import styles from '../Modal/Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', keydownEsc)
    return () => {
      window.removeEventListener('keydown', keydownEsc)
    }
  })

  const keydownEsc = (e) => {
    if (e.code === 'Escape') {
      onClose()
    }
  }

  const clickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  const onClickImgOpenModal = (e) => {
    if (e.target === e.currentTarget) {
      console.log('бекдроп')
      clickBackdrop()
    }
  }

  return createPortal(
    <div className={styles.Overlay} onClick={clickBackdrop}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot,
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
export default Modal
