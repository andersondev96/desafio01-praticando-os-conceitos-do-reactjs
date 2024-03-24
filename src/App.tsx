import { PlusCircle } from '@phosphor-icons/react'
import styles from './App.module.css'
import { Button } from './components/Button'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { Task } from './components/Task'

import { useState } from 'react'
import './global.css'

export interface ITask {
  id: number;
  description: string;
  isChecked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState('');

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  function handleAddTask() {
    if (!inputValue) {
      return
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      description: inputValue,
      isChecked: false
    }

    setTasks((state) => [...state, newTask])
    setInputValue('')
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    setTasks(filteredTasks)
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button onClick={handleAddTask}>
          Criar
          <PlusCircle size={16} color="#F2F2F2" weight="bold" />
        </Button>
      </div>

      <div className={styles.main}>
        <div className={styles.headerTasks}>
          <div className={styles.statusTasks}>
            <span>Tarefas criadas</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className={styles.statusTasks}>
            <span>Concluídas</span>
            <strong>{checkedTasksCounter} de {tasks.length}</strong>
          </div>
        </div>
        <div className={styles.contentTasks}>
          {tasks.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                removeTask={handleRemoveTask}
                toggleTaskStatus={handleToggleTask}
              />
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default App
