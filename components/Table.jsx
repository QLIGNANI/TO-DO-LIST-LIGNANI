import React from 'react'
import Button from '@/components/forms/Button.jsx';
import styles from '@/styles/todolist.module.css'

const Table = (props) => {
    return (
        <table className={styles.table} cellSpacing="0">
            <tbody className={styles.tbody}>
                <tr>
                    {props.columns.map((column, index) => (
                        <th key={column.title} scope="col" className={styles.th}>
                            {column.title}
                        </th>
                    ))}
                </tr>
                {props.todos.map((todo, index) => (
                    <tr key={todo.task} className={styles.tr}>
                        <td className={styles.td}>{todo.task}</td>
                        <td className={`${styles.td} space-x-3`}>
                            <div className="flex">
                                {props.columns[props.columns.length - 1].actions.map((action, index) => (
                                    <Button
                                        key={index}
                                        type="button"
                                        class={action.class}
                                        onClick={() => action.onClick(index)}
                                        icon={action.icon}
                                    />
                                ))}
                            </div>
                        </td>
                    </tr>
                ))}

                {props.todos.length === 0 && (
                    <tr>
                        <td colSpan={props.columns.length} className={styles.td}>
                            <div className="flex justify-center items-center h-20">
                                <p className="text-gray-500">Aucune tâche à afficher</p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table;