import React from "react";
import {firebase} from './firebase'

function App() {

  const [tasks, setTasks] = React.useState([])
  const [task, setTask] = React.useState('')
  const [EditionMode, setEditionMode] = React.useState(false)
  const [id, setId] = React.useState('')

  React.useEffect(() => {

    const getData = async () => {

      try{

        const db = firebase.firestore()
        const data = await db.collection('Tasks').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(arrayData);
        setTasks(arrayData)

      } catch (error) {
        console.log(error);
      }
    }

    getData()

  }, [])

  const add = async (e) => {
    e.preventDefault()

    if(!task.trim()){
      console.log('Is empty');
      return
    }

    try {

      const db = firebase.firestore()
      const newTask = {
        name: task,
        date: Date.now()
      }
      const data = await db.collection('Tasks').add(newTask)

      setTasks([
        ...tasks,
        {...newTask, id:data.id}
      ])

      setTask('')

    } catch (error) {
      console.log(error);
    }

    console.log(task);
  }

  const eliminate = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('Tasks').doc(id).delete()

      const filterArray = tasks.filter(item => item.id !==id)
      setTasks(filterArray)

    } catch (error) {
      console.log(error);
    }
  }
    const actEdition = (item) => {
      setEditionMode(true)
      setTask(item.name)
      setId(item.id)
    }

    const edit = async (e) => {
      e.preventDefault()
      if(!task.trim()){
        console.log('Empty')
        return
      }
      try {
  
        const bd = firebase.firestore()
        await bd.collection('Tasks').doc(id).update({
          name: task
        })

        const editedArray = tasks.map(item => (
          item.id === id ? {id: item.id, date: item.date, name: task} : item
        ))
  
        setTasks(editedArray)
        setEditionMode(false)
        setTask('')
        setId('')
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="container mt-3"> 
      <div className="row">
        <div className="col-md-6">
          <h3>Tasks list</h3>
          <ul className="list-group">
            {
            tasks.map(item => (
              <li className="list-group-item" key={item.id}>
                {item.name}
                <button 
                className="btn btn-danger btn-sm float-end ms-2"
                onClick={() => eliminate(item.id)}
                >
                  Eliminate
                </button>
                <button className="btn btn-warning btn-sm float-end"
                onClick={() => actEdition(item)}
                >
                  Edit
                </button>
              </li>
            ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3>
            {
              EditionMode ? 'Edit Task' : 'Add Task'
            }
            </h3>
          <form onSubmit = {EditionMode ? edit : add}>
            <input 
            type="text"
            placeholder="Insert task"
            className="form-control mb-2"
            onChange={e => setTask(e.target.value)}
            value={task}
            />
            <button
            className={
            EditionMode ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
            }
            type="submit"
            >
              {
                EditionMode ? 'Edit' : 'Add'
              }
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
