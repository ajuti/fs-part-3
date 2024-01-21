const FilterComp = (props) => {
  const handleFilterChange = (event) => {
    props.setFilter(event.target.value)
  }

  return (
    <form>
      filter shown with<input value={props.filter} onChange={handleFilterChange} />
    </form>
  )
}

export default FilterComp