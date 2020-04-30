import React from 'react'
import TrelloColumn from "./TrelloColumn"
import { connect } from "react-redux"
import TrelloActionButton from "./TrelloActionButton"
import { DragDropContext } from "react-beautiful-dnd"
import { sort } from "../redux/columns"

function App(props) {  
  // now we can render many columns, for now they have been hardcoded but we will recieve them from
  // the backend somehow. 
  

  // onDragStart ---> when the drag starts
  // onDragUpdate --> when the we drag and essentially update the position of the draggable component 
  //it is the responsibity of the onDragEnd to syncrously update the state on the drag to reflect the drag and drop result
  function onDragEnd(result) { //-----> when the drag ends
    const { destination, source, draggableId} = result

    if (!destination) { // if there s no destiontion (like the task is dragged but not into another column but maybe onto the board or else)
      return
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) { // if the task is dragged and dropped into the same column, then we do not need to reorder
      return
    }

    /* if the both conditions are not true, then we know that our task is dragged to another column
      thus we will have to reorder our taskIds array for the columns to account for newly added or dropped columns 
    */

    const sdIds = {
      droppableIdStart: source.droppableId, 
      droppableIdEnd: destination.droppableId, 
      droppableIndexStart: source.index, 
      droppableIndexEnd: destination.index, 
      draggableId 
    }

    props.dispatch(sort(sdIds))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>Trello Clone App</h1>
        <div style={styles.columnContainer}>
          { props.columns.columnOrder.map(columnId => 
            <TrelloColumn key={columnId} colId={columnId} columnData={props.columns.columns[columnId]} allData={props.columns}/>)
          }
          <TrelloActionButton addlisttext/> {/*pass in "text" if you want to add a list */}
        </div>
      </div>
    </DragDropContext>
  )
}

const mapStatetoProps = state => ({
  columns: state.columns
})

export default connect(mapStatetoProps)(App)

const styles= {
  columnContainer: {
    display: "flex",
    flexDirection: "row"
  }
}