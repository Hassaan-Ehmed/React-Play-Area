import React, { useState } from 'react'

export default function index() {

const [color,setColor] = useState("rebeccapurple")
const [ProgressTodos,setProgressTodos] = useState<any>([])
const [todos,setTodos] = useState(
    
    [
    "Eating Dinner",
    "Coding",
    "Sleep",
    "some Drinks",
    "Bill Pay"
    ]
    
    )



const handleDragStart=(e:any,i:number)=>{

    console.log("Drag Start>>")

   e.dataTransfer.setData("indexes",i);

}


const handleDragOver=(e:any)=>{

    e.preventDefault()

    console.log("Dragging Over");

    setColor("red");

}


const handleDroped=(e:any)=>{

    console.log("Element Dropped!");
    console.warn(e.dataTransfer.getData("indexes"));
    setColor("rebeccapurple");


    let index = e.dataTransfer.getData("indexes");

    console.log(index)  

    let todos_COPY = [...todos];

    let filteredArr = todos_COPY.filter((_,i)=>  i !== parseInt(index)  );
    

setTodos(filteredArr)


const removedFromTodos =  todos_COPY.filter((_:any,i:any)=> i === parseInt(index));


setProgressTodos([...ProgressTodos,removedFromTodos])

}



      return (
    <>
      

      <div style={{
        width:"100%",
        height:"100vh",
        backgroundColor:"grey",
         display:'flex',
         justifyContent:'space-around',
         alignItems:"center", }}>


<div style={{width:"20%",height:'80vh',backgroundColor:"rebeccapurple",display:"flex",flexDirection:"column",alignItems:"center"}}>

<h1>Todo</h1>


{todos.map((todo,i)=>{

return <li draggable={true} onDragStart={(e)=>handleDragStart(e,i)} key={i}

style={{
width:"90%",
backgroundColor:"whitesmoke",
marginTop:"20px",
listStyleType:"none",
textAlign:"center",
cursor:"grab"

}}

>{todo}</li>

})}

</div>


<div 
style={{width:"20%",height:'80vh',backgroundColor:"rebeccapurple",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center", transition:"all 3sec",border:`2px solid ${color}`}}

onDragOver={(e)=>handleDragOver(e)}

onDrop={(e)=>handleDroped(e)}

>

<h1>In Progress</h1>


{ProgressTodos?.map((todo:any,i:any)=>{

return <li draggable={true} onDragStart={(e)=>handleDragStart(e,i)} key={i}

style={{
width:"90%",
backgroundColor:"whitesmoke",
marginTop:"20px",
listStyleType:"none",
textAlign:"center"
}}

>{todo}</li>

})}


</div>

      </div>

    </>
  )
}
