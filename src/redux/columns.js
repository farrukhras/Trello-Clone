import { createAction, createReducer } from "@reduxjs/toolkit"

let cId = 2
let tId = 5

const initialState = {
    tasks: { // my tasks are stored as an object inside the tasks object and each task is an object of id and content
        'task-1': { id: 'task-1', content: 'Book Auditorium for LUMUN' },
        'task-2': { id: 'task-2', content: 'Setup Vendor Meetings for Logistics' },
        'task-3': { id: 'task-3', content: 'Clear the payment of the CMS.'},
        'task-4': { id: 'task-4', content: 'Hold a meeting with the LUMS Finance Department and convince them to pay Rs. 185000 to the Students.'},
        'task-5': { id: 'task-5', content: 'Stop getting angry on small things and ignore the world.'}
    },
    columns: { // the columns are stored inside the columns object and each column is an object and has an id, a title and an array of tasks addociated with it
        'column-1': {
            id: 'column-1',
            title: 'Asher Javaid',
            tasksIds: ['task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'Farkhanda Khan',
            tasksIds: ['task-1', 'task-2', 'task-5']
        }
    },
    columnOrder : ['column-1', 'column-2']  // columnOrder facilitates reordring of columns
}

export const addColumn = createAction(
    'ADD_COLUMN', 
    (title) => ({payload: title})
)

export const addTask = createAction(
    'ADD_TASK',
    (content, coId) => ({payload:{content, coId}})
)

export const sort = createAction(
    'SORT',
    (sdIds) => ({payload:sdIds})
)

const columnReducer = createReducer(initialState, { 
    ADD_COLUMN: (state, action) => { // add a new column to trello screen
        cId += 1
        const columnID = `column-${cId}`

        const newColumn = {
            id: columnID,
            title: action.payload,
            tasksIds: []
        }

        state.columns[columnID] = newColumn
        state.columnOrder.push(columnID)
    },
    ADD_TASK: (state, action) => {
        tId += 1
        const newtaskID = `task-${tId}`

        const newTask = {
            id: newtaskID,
            content: action.payload.content
        }
       
        state.columnOrder.map(columnId => {
            if (columnId === action.payload.coId) {
                state.tasks[newtaskID] = newTask
                state.columns[columnId].tasksIds.push(newtaskID)
            } else {
                return
            }
        })
    },
    SORT: (state, action) => {
        console.log(action.payload)

        const {
            droppableIdStart, 
            droppableIdEnd, 
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        } = action.payload
        
        if(droppableIdStart === droppableIdEnd) { // drag and drop happen in the same column
            const column = state.columns[droppableIdStart] // it will get the column from where the task was dragged
            console.log(column.title)
            const newTaskIds = Array.from(column.tasksIds) // i will extract the tasks array that holds the tasks stored in that column

            newTaskIds.splice(droppableIndexStart, 1) // this means that from the (source.index) index in the newTasksIds array, we want to remove 1 item
            newTaskIds.splice(droppableIndexEnd, 0, draggableId) // here we will start from the destination index and insert the draggable id(task id)
            console.log(newTaskIds)

            state.columns[droppableIdStart].tasksIds = newTaskIds
        }

        if (droppableIdStart !== droppableIdEnd) {
            // find the column where drag started
            const startColumn = state.columns[droppableIdStart]

            // pull out the task from the startColumn tasksIds list and then store the updated 
            // array(with removed task) to the current tasksIds list
            const updStartTaskIds = Array.from(startColumn.tasksIds)
            updStartTaskIds.splice(droppableIndexStart, 1)
            state.columns[droppableIdStart].tasksIds = updStartTaskIds
            
            // find the column where the drag ended
            const endColumn = state.columns[droppableIdEnd]

            // pull out the task from the endColumn tasksIds list and then store the updated 
            // array(with removed task) to the current tasksIds list 
            const updEndTaskIds = Array.from(endColumn.tasksIds)
            updEndTaskIds.splice(droppableIndexStart, 0, draggableId)
            state.columns[droppableIdEnd].tasksIds = updEndTaskIds
        }
    }
})

export default columnReducer