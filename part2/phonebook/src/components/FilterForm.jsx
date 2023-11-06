const FilterForm = ({userFilter,handleFilter}) =>{
    return(
        <form>
        <div>filter shown with <input value={userFilter}
          onChange={handleFilter}/>
        </div>
      </form>
    )
}
export default FilterForm