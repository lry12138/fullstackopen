const Title =({name})=>{
    return(
        <div>
        <h1>{name}</h1>
        </div>
)}

const Part = ({part})=>{
    return(
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Sum =({sum})=>{
    return(
        <div>
            <h4>Total of {sum} exercises</h4>
        </div>
    )
}
const Course = ({name,parts}) =>{
    const total = parts.reduce((acc,curr) => acc+ curr.exercises, 0)
    return(
        <div>
        <Title name={name} />
        {parts.map(part => 
            <Part key={part.id} part={part} />)}
        <Sum sum={total} />
        </div>
    )
}
export default Course