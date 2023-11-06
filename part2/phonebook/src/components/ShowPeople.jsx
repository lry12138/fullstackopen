const ShowPeople = ({name,number,deletePerson}) =>{
    return(
        <li>
        {name} {number}
        <button onClick={deletePerson}> Delete </button>
        </li>
    )
  
}

export default ShowPeople