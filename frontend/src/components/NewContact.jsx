const NewContact = (props) => {
  const handleNameChange = (event) => {
    props.setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    props.setNewNum(event.target.value) 
  }

  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNum} onChange={handleNumChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewContact 