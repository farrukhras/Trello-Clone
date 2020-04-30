import React from 'react'
import TrelloCard from "./TrelloCard"
import TrelloActionButton from "./TrelloActionButton"
import { Droppable } from "react-beautiful-dnd"

/* just a simple column which has several tasks in it
our coloumn has:
1. a title
2. tasks
*/

// now we can render many cards, for now they have been hardcoded but we will recieve them from
// the backend somehow. 
export default function TrelloColumn({colId, columnData, allData}) {
    return (
        <Droppable droppableId={colId}>
            {provided => (
                <div
                    {...provided.droppableProps} 
                    ref={provided.innerRef}         
                    style = {style.container}
                >
                    <h4>{columnData.title}</h4>
                    {columnData.tasksIds.map((taskId, index) => (
                    <TrelloCard 
                        key={taskId}
                        index={index}
                        taskData={allData.tasks[taskId]} 
                        allData={allData} 
                        id={taskId}
                    />
                    ))}
                    <TrelloActionButton colId={colId}/>
                    {provided.placeholder}
                </div>
            )}
        </Droppable> 
    )
}

// some basic, custom styling for the list(column)
const style = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        padding: 10,
        marginRight: 8
    }
}