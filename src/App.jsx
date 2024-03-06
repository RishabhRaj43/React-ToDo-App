import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo,setTodo] = useState("")
  const [todos,setTodos] = useState([])
  const [showFinished,setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleEdit=(e,id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    // saveToLS()
  }
  const handleDelete=(e,id)=>{
    // let index = todos.findIndex(item=>{
    //   return item.id===id;
    // })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLS()
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox=(e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !(newTodos[index].isCompleted )
    setTodos(newTodos)
    // saveToLS()
  }
  const toggleFinished=(e)=>{
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto my-5 rounded-xl p-5 bg-red-300 min-h-[70vh] w-1/2'>
        <div className="addTodo">
          <h2 className='text-lg font-bold' >Add a Todo</h2>
          <input
          onChange={handleChange}
          value={todo}
          type="text" className='w-full' />
          <button 
          onClick={handleAdd}
          disabled={todo.length<3}
          className='bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 font-bold'>Save</button>
        </div>
        <input
        onChange={toggleFinished}
        type="checkbox" 
        checked={showFinished} /> Show Finished

        <h2 className='text-lg font-bold'>your todo</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todo To Display</div>}
          {todos.map(item=>{

          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-auto my-3">
            <div className='flex gap-5 p-0.5'>
            <input 
            name={item.id} 
            onChange={handleCheckbox} 
            type="checkbox" 
            checked={item.isCompleted} 
            id="" />
            <div className={`${item.isCompleted === true?"line-through":""}`}>
              {item.todo} 
              </div>
              </div>

            <div className="buttons">
              <button
              onClick={(e)=>{handleEdit(e,item.id)}}
              className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2 font-bold'>Edit</button>
              <button
              onClick={(e)=>{handleDelete(e,item.id)}}
              className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2 font-bold'>Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
