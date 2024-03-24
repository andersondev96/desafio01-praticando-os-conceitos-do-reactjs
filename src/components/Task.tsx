import { Check, Trash } from "@phosphor-icons/react";
import styles from './Task.module.css';

export interface TaskType {
    id: number;
    description: string;
    isChecked: boolean;
}


interface TaskProps {
    task: TaskType;
    removeTask: (id: number) => void;
    toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void;
}

export function Task({ task, removeTask, toggleTaskStatus }: TaskProps) {
    function handleTaskToggle() {
        toggleTaskStatus({ id: task.id, value: !task.isChecked })
    }

    function handleRemove() {
        removeTask(task.id)
    }

    const checkboxCheckedClassName = task.isChecked
        ? styles['checkbox-checked']
        : styles['checkbox-unchecked']

    const paragraphCheckedClassName = task.isChecked
        ? styles['paragraph-checked']
        : ''

    return (
        <div className={styles.container}>
            <div>
                <div
                    onClick={handleTaskToggle}
                    className={`${styles.checkbox} ${checkboxCheckedClassName}`}>
                    {task.isChecked ? <Check size={16} color="#F2F2F2" /> : ''}
                </div>
                <label htmlFor="task">
                    <p className={`${styles.paragraph} ${paragraphCheckedClassName}`}>
                        {task.description}
                    </p>
                </label>
            </div>
            <button onClick={handleRemove}>
                <Trash size={24} color="#808080" />
            </button>
        </div>
    )
}