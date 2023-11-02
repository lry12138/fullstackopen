const Filtered = ({arr,filterArr}) =>{
    return(
        <ul>
        {arr.filter(filterArr).map(({id,name,number})=> 
            <li key={id}>{name} {number}</li>
          )}
        </ul>
    )
  
}

export default Filtered