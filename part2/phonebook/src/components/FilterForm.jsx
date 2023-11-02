const FilterForm = ({userFilter,handleFilter}) =>{
    return(
        <form onSubmit={console.log(userFilter)}>
        <div>filter shown with <input value={userFilter}
          onChange={handleFilter}/>
        </div>
      </form>
    )
}
export default FilterForm