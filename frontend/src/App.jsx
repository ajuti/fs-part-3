import { useState, useEffect } from 'react'
import Header from './components/Header'
import FilterComp from './components/FilterComp'
import NewContact from './components/NewContact'
import Persons from './components/Persons'
import personService from "./services/persons.js"
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState(null) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState("")
  const [filter, setFilter] = useState("")
  const [notiText, setNotiText] = useState(null)
  const [showError, setShowError] = useState(false) 

  const jsonHook = () => {
    console.log("retrieving persons")
    personService
      .getAll()
      .then(initialList => {
        console.log("promise fulfilled")
        setPersons(initialList)
      })
  }

  useEffect(jsonHook, []) // executes after each render

  if (!persons) {
    return null
  }

  const handleUpdateNum = () => {
    const existingPerson = [...persons].find(x => x.name === newName)
    const modifiedPerson = {...existingPerson, number: newNum}
    personService
      .update(modifiedPerson)
      .then(updatedGuy => {
        console.log(`updating state`)
        setPersons(persons.map(person => person.id !== updatedGuy.id ? person : updatedGuy))

        setNotiText(`Updated the number of ${updatedGuy.name}`)
        setTimeout(() => {
          setNotiText(null)
        }, 3000)
      })
      .catch(error => {
        setShowError(true)
        setNotiText(`Information of ${modifiedPerson.name} has already been removed from server`)
        setPersons(persons.filter(person => person.id !== modifiedPerson.id))

        setTimeout(() => {
          setNotiText(null)
          setShowError(false)
        }, 3000)
      })
    setNewName("")
    setNewNum("")
  }

  const handleDestroyName = ({name, id}) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .destroy(id)
        .then(deleted => {
          const newList = [...persons].filter(x => x.id !== deleted.id) 
          setPersons(newList)

          setNotiText(`Deleted ${name}`)
          setTimeout(() => {
            setNotiText(null)
          }, 3000)
        })
        .catch(error => {
          console.log(`sumthng fcked up: ${error}`)
        })
    } else {
      console.log("User didn't want to delete the contact")
    }
  }

  const handleAddName = (event) => {
    event.preventDefault()
    if (persons.map(x => x.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        handleUpdateNum()
      } else {
        console.log("New number was not updated")
      }
      return 
    }
    if (persons.map(x => x.number).includes(newNum)) {
      alert(`${newNum} is already added to the phonebook`)
      return 
    }
    const nameObj = {
      name: newName,
      number: newNum,
    }

    personService
      .create(nameObj)
      .then(newContact => {
        console.log(newContact)
        setPersons(persons.concat(newContact))

        setNotiText(`Added ${nameObj.name}`)
        setTimeout(() => {
          setNotiText(null)
        }, 3000)
      })

    setNewName("")
    setNewNum("")


  }


  return (
    <div>
      <Header title={"Phonebook"} />
      <Notification msg={notiText} error={showError} />
      <FilterComp filter={filter} setFilter={setFilter} />
      <Header title={"add a new"} />
      <NewContact 
        newName={newName} 
        setNewName={setNewName} 
        newNum={newNum} 
        setNewNum={setNewNum} 
        addName={handleAddName} />
      <Header title={"Numbers"} />
      <Persons persons={persons} filter={filter} handler={handleDestroyName} />
    </div>
  )

}

export default App