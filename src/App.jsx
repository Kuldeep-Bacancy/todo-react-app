import { useState } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const toggleComplete = (id) => {
    const newTodos = [...todoList]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.completed = !todo.completed
    setTodoList(newTodos)
  }

  const deleteTask = (id) => {  
    const newTodos = todoList.filter((todo) => todo.id != id)
    setTodoList(newTodos)
  }
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTodoList([...todoList, { id: crypto.randomUUID(), task: todo, completed: false }])
          setTodo('')
        }}
      >
        <div className="flex justify-center items-center gap-6">
          <input
            className="w-72 border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
            value={todo}
            onChange={(e) => setTodo(e.target.value) }
            placeholder="Enter a new task"
            required
          />
          <button className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md">
            Add Todo Item
          </button>
        </div>
      </form>
      
      <div className="w-full text-center flex items-center flex-col gap-5">
        <h1 className="text-blue-600 uppercase font-semibold text-2xl">Task List</h1>
        <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
            {
              todoList.length > 0
              ?
                todoList.map((content) => {
                  return(
                    <div className='flex justify-between items-center mb-5' key={content.id}>
                      <li className="list-none w-2/3 text-left break-normal">{content.task}</li>
                      <div className="flex gap-3">
                        <button className="bg-blue-600 text-white px-2 py-2 font-medium rounded-md" 
                          onClick={(e) => {
                            e.preventDefault();
                            toggleComplete(content.id)
                          }
                          }>
                        { content.completed ? 'Uncomplete!' : 'Complete!' }</button>
                        <button className="bg-white text-blue-600 px-2 py-2 font-medium rounded-md" onClick={() => deleteTask(content.id) }>Delete</button>
                      </div>
                    </div>
                  )
                })
              :
                <li className="list-none w-2/3 text-left break-normal text-center">No Task Available!</li>
            }
        </div>
      </div>
    </div>
  )
}

export default App
