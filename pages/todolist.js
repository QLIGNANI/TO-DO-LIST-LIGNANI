import { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/todolist.module.css'
import Modal from '@/components/Modal';
import Footer from '@/components/Footer';
import AddIcon from '@/components/icons/AddIcon';
import Button from '@/components/forms/Button';
import Badge from '@/components/Badge';
import EditIcon from '@/components/icons/EditIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import dynamic from 'next/dynamic';
import { Checkbox } from '@/components/checkbox';

const Table = dynamic(() => import('components/Table'), { ssr: false });
const Dialog = dynamic(() => import('components/Dialog'), { ssr: false });

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogModalOpen, setIsDialogModalOpen] = useState(false);
    const formik = useRef();
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
            setTodos([...todos, values]);
            resetForm();
            setSubmitting(false);
        }, 400);
    };

    const handleDelete = (index) => {
        setTodos(todos.filter((todo, i) => i !== index));
    };

    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    const handleUpdate = (index) => {
        setIsUpdating(true);
        setCurrentTodo(todos[index]);
        setIsModalOpen(true);
    };

    const handleCancelUpdate = () => {
        setIsUpdating(false);
        formik.current.resetForm();
        setCurrentTodo({});
    };

    const handleSaveUpdate = (index, updatedTask) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = updatedTask;
        setTodos(updatedTodos);
        formik.current.resetForm();
        setIsUpdating(false);
        setCurrentTodo({});
    };

    const onCloseModal = (props) => {
        if (!props?.dialog) setIsModalOpen(!isModalOpen);
        if (props?.clearForm) handleCancelUpdate();
        if (props?.dialog) setIsDialogModalOpen(false);
        setCurrentTodo({});
    };

    const handleOpenModal = (index) => {
        setCurrentTodo(todos[index - 1]);
        setIsDialogModalOpen(true);
    };

    useEffect(() => {
        if (isModalOpen && formik.current) {
            formik.current.setValues(currentTodo);
        }
    }, [isModalOpen]);

    const columns = [
        {
            title: 'Tâche',
            accessor: 'task',
        },
        {
            title: 'Nom',
            accessor: 'name',
        },
        {
            title: 'Téléphone',
            accessor: 'phone',
        },
        {
            title: 'Email',
            accessor: 'email',
        },
        {
            title: 'Actions',
            accessor: 'actions',
            actions: [
                {
                    icon: <EditIcon />,
                    text: 'Modifier',
                    class: 'text-gray-500 hover:text-gray-700',
                    onClick: handleUpdate,
                },
                {
                    icon: <DeleteIcon />,
                    text: 'Supprimer',
                    class: 'text-red-500 hover:text-red-700',
                    onClick: handleOpenModal,
                },
            ],
        },
    ];

    const form = (
        <Formik
            initialValues={currentTodo}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Veuillez entrer le nom'),
                phone: Yup.string().required('Veuillez entrer le numéro de téléphone'),
                email: Yup.string().required('Veuillez entrer l\'email').email('Veuillez entrer un email valide'),
                task: Yup.string().required('Veuillez entrer la tâche'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                if (isUpdating) handleSaveUpdate(todos.indexOf(currentTodo), values);
                else handleSubmit(values, { setSubmitting, resetForm: formik.current.resetForm });
                setSubmitting(false);
                onCloseModal();
            }}
            innerRef={formik}
        >
            {({ isSubmitting }) => (
                <Form className="">
                    <div className="p-6">
                        <header className="mb-4 text-center">
                            <h3 className="text-xl font-medium text-slate-700">
                                {isUpdating ? 'Modifier une tâche' : 'Ajouter une tâche'}
                            </h3>
                        </header>
                        <div className="flex flex-col space-y-6">

                            <div className="relative">
                                <Field id="name" type="text" name="name" placeholder="Nom" className={`${styles.input}`} />
                                <label
                                    htmlFor="id-b03"
                                    className={styles.inputLabel}
                                >
                                    Nom
                                </label>
                                <ErrorMessage name="name" component="div" className={styles.error} />
                            </div>
                            <div className="relative">
                                <Field id="phone" type="text" name="phone" placeholder="Nom" className={`${styles.input}`} />
                                <label
                                    htmlFor="phone"
                                    className={styles.inputLabel}
                                >
                                    Téléphone
                                </label>
                                <ErrorMessage name="phone" component="div" className={styles.error} />
                            </div>
                            <div className="relative my-6">
                                <Field id="email" type="text" name="email" placeholder="Nom" className={`${styles.input}`} />
                                <label
                                    htmlFor="email"
                                    className={styles.inputLabel}
                                >
                                    Email
                                </label>
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </div>
                            <div className="relative my-6">
                                <Field id="task" type="text" name="task" placeholder="Nom" className={styles.input} />
                                <label
                                    htmlFor="task"
                                    className={`${styles.inputLabel}`}
                                >
                                    Tâche
                                </label>
                                <ErrorMessage name="task" component="div" className={styles.error} />
                            </div>
                        </div>
                    </div>
                    {/*  <!-- Action base sized basic button --> */}
                    <div className={styles.buttonContainer}>
                        <Button type="button" class={styles.cancelBtn} text="Annuler" onClick={() => onCloseModal({ clearForm: true })} />

                        <Button type="submit" disabled={isSubmitting} class={styles.submitBtn} text={isUpdating ? 'Enregistrer' : 'Créer'} />
                    </div>
                </Form>
            )}
        </Formik>
    );

    const dialog = (
        <Dialog
            title="Supprimer une tâche"
            description="Êtes-vous sûr de vouloir supprimer cette tâche ?"
            isOpen={isDialogModalOpen}
            onClose={() => {
                setIsDialogModalOpen(false);
                setCurrentTodo({});
            }}
            onConfirm={() => {
                handleDelete(todos.indexOf(currentTodo));
                setIsDialogModalOpen(false);
            }}
        />
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3 className={styles.title}>Todo List</h3>
                <Badge text={todos.length} alt="nombre de tâches" />
                <Button class={`ml-auto ${styles.primaryBtn}`} type="button" onClick={onCloseModal} icon={<AddIcon />} text="Ajouter" />
            </header>
            <main className={styles.main}>
                <div className={styles.card}>
                    <div className={`shadow-wuiSlate-200 ring-wuiSlate-20 ${styles.cardContent}`}>
                        <div className="w-full overflow-x-auto">
<<<<<<< HEAD
                        <Button class={`d-inline-flex p-2 ${styles.primaryBtn}`} type="button" onClick={onCloseModal} icon={<AddIcon />} text="Ajouter" />
=======
>>>>>>> parent of d4250fd (Update Totolist)
                            <Table {...{ columns, todos, handleCancelUpdate, handleSaveUpdate, isUpdating, currentTodo }} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            {isModalOpen && (<Modal {...{ isModalOpen }} component={form} onClose={onCloseModal} class="max-w-2xl" />)}
            {isDialogModalOpen && (<Modal component={dialog} isModalOpen={isDialogModalOpen} onClose={() => onCloseModal({ dialog: true })} class="max-w-xs" />)}
        </div>
    );
};
export default TodoList;