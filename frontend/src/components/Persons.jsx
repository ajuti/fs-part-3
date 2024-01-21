const Persons = ({ persons, filter, handler }) =>  {
  return (
    <>
      {persons.filter(x => x.name.includes(filter)).map(obj => 
        <p key={obj.name}>
          {obj.name} {obj.number}
          <button onClick={() => handler(obj)}>delete</button>
        </p>
      )}
    </>
  )
}

export default Persons