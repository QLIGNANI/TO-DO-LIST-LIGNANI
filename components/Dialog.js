import React from 'react'
import styles from '@/styles/todolist.module.css'
import Button from './forms/Button';

const Dialog = (props) => {

    return (
        <div className="p-6">
            <header className="mb-4">
                <h3 className={props.dialogTitle}>
                    {props.title}
                </h3>
            </header>
            <div className={styles.dialogContent}>
                {props.description}
            </div>
            <div className={styles.dialogFooter}>
                <Button class={styles.warningBtn} text="Annuler" onClick={props.onClose}
                />
                <Button type="button" class={styles.cancelBtn} text="Supprimer" onClick={props.onConfirm} />
            </div>
        </div>
    );
}

export default Dialog