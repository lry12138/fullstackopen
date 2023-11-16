import { useState,useEffect } from 'react'
import personServices from './services/persons'
import ShowPeople from './components/ShowPeople'
import AddNew from './components/AddNew'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [userFilter, setuserFilter] = useState('')
  const [message,setMessage] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(() => {
    personServices 
      .getAll()
      .then(phonebook =>{
        setPersons(phonebook)
      })
  }, [])
  
  const handleChangeName = (event)=>{
    setNewName(event.target.value)
  }

  const handleChangePhone =  (event)=>{
    setnewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setuserFilter(event.target.value)
  }
    
  const addPerson = (event) => {
    event.preventDefault()
    var existance = persons.find(({ name }) => name === newName)
    if (existance !== undefined) {
      if(window.confirm(`${newName} is already in the phonebook. Would you like to update the number?`)){
        const newPerson = {
          id: existance.id,
          name: newName,
          number: newNumber
        }
        personServices
          .update(existance.id,newPerson)
          .then(returned  =>{
              setPersons(persons.map(person => person.id !== existance.id ? person:returned))
              setNewName('')
              setnewNumber('') 
            })
          .catch(error => {
            setErrorMessage(
              `Information for ${newName} is already removed from server `
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
              setPersons(persons.filter(person => person.id !== existance.id))
            })
      }
    } 
    else {
      const newPerson = {
        id: persons[persons.length-1].id+1,
        name: newName,
        number: newNumber
      }
      personServices
        .create(newPerson)
        .then(returned  =>{
          setPersons(persons.concat(returned))
          setMessage(
            `Add ${newName} `
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setnewNumber('')
      })

    }
  }

  const filterPerson = (person) =>{
    return person.name.toLowerCase().includes(userFilter.toLowerCase());
  }

  const peopletoShow = persons.filter(filterPerson)

  const deletePerson = (person) =>{
    const id = person.id
    if (window.confirm(`Delete ${person.name} ?`)){
      console.log(`Deleted ${person.name}`)
      personServices
        .deleteObj(id)

      setPersons(persons.filter(person => person.id !== id))
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm userFilter={userFilter} handleFilter={handleFilter} />

      <h2>Add new</h2>
      <AddNew addPerson={addPerson} newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone}/>
      
      <h2>Numbers</h2>
      <Notification message={message} colour ='green'/>
      <Notification message={errorMessage} colour ='red'/>
      <ul>
        {peopletoShow.map(people =>
          <ShowPeople
          key={people.id}
          name={people.name}
          number={people.number}
          deletePerson = {()=>deletePerson(people)}/>)
        }
            
      </ul>
            
    </div>
  )
}

export default App