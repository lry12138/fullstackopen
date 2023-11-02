const AddNew = ({addPerson,newName, newNumber,handleChangeName,handleChangePhone} ) =>{
    return(
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handleChangeName}/>
        </div>
        <div>number:<input value={newNumber}
          onChange={handleChangePhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default AddNew