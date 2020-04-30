import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Draggable } from "react-beautiful-dnd"

export default function TrelloCard(props) {
    // console.log(taskData)
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {/* imported the <Card></Card> from Material UI */}
                    <Card style= {styles.cardContainer}> 
                        <CardContent>
                            <Typography color="primary" gutterBottom>
                                {props.taskData.content}
                            </Typography> 
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}

const styles = {
    cardContainer: {
        marginBottom: 10
    }
}