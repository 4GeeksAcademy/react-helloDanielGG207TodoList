import React, { useEffect } from "react";
import { use } from "react";


import { useState } from "react";

//include images into your bundle


//create your first component
const Home = () => {
	
	
	const [isHover, setisHover] = useState("showF")
	const [tasks, setTasks] = useState([])
    const [change, setChange] = useState([true])
	useEffect (() => { 
       
	fetch("https://playground.4geeks.com/todo/users/DanielGG207/"  )

	.then( (response)=>{
      return(response.json())
	})
	
 
	.then((data)=> {
		setTasks(data.todos)
		console.dir(tasks)
		
	})

	.catch()

	}, [change])
  
	return (
		
		<div className="text-container">
			

            <h1>Todos</h1>
			<div className="tasks-box bg-white">
				<input placeholder = "Type your task" onKeyUp={(event) => {
					if (event.key == "Enter") {
						let data = {
							"label": event.target.value,
							"is_done": false
						  }
						console.log(data)
						fetch("https://playground.4geeks.com/todo/todos/DanielGG207" , {
                        method: "POST",
						body:JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"
						  }
						})

						.then(()=> {setChange(!change)})

						.then(()=> {})

						.catch()
						setTasks((lastValue) => 
							{ return ([...lastValue, event.target.value])})
						
						
					}
						
					}}></input>
                
				<h2>{tasks.map((task) => 
					{
						
						return (<div className="task-container" onMouseEnter={()=> {setisHover("")}} onMouseLeave={()=>{setisHover ("showF")}}>
						 {task.label} <div className={isHover + " delete"} data-id= {task.id} 
						 
						onClick={(event) => {
							let taskIndex = Number(event.currentTarget.dataset.id);
							fetch("https://playground.4geeks.com/todo/todos/" + taskIndex , {method: "DELETE"})

							.then(()=> {setChange(!change)})

							.then()

							.catch()

						}}> 
						 <i className="fa-solid fa-trash"></i>  </div> 

					</div>)})}
					
					
					</h2>

					
					{console.dir(tasks)}
				
			</div>
			 <button type="button" className="btn btn-danger" onClick={()=> {
             tasks.map((obj) => {
				let id = obj.id
				fetch("https://playground.4geeks.com/todo/todos/" + id , {method:"DELETE"})

				.then(()=> {setChange(!change)})

				.then()

				.catch
			
			 })



			 }}>Delete All Tasks</button>
			<div>
				
			</div>
		</div>
	);
};

export default Home;