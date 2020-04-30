import React, { useState } from 'react'
import Icon from '@material-ui/core/Icon'
import Card from '@material-ui/core/Card'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '@material-ui/core/Button'
import { connect } from "react-redux"
import { addColumn, addTask } from "../redux/columns"

// A REUSABLE COMPONENT that can be used to add both a card and a list
export function TrelloActionButton(props) {
    
    const [cardOpen, setCardOpen] = useState(false) // state to check if the form is card (task or column) is open or close
    const [text, setText] = useState("") // this state is used to display the text when adding a task details or a column details.

    const buttonText = props.addlisttext ? "Add another list" : "Add another card"
    const placeholderText = props.addlisttext ? "Enter list title..." : "Enter a title for this card..."
    const buttonTitle = props.addlisttext ? "Add List" : "Add Column"//{"Add Custom Task", "Add Request Task"}
    
    // In line styling
    const buttonTextColor = props.addlisttext ? "black" : "inherit"
    const buttonTextOpacity = props.addlisttext ? 1 : 0.5
    const buttonTextBackground = props.addlisttext ? "#dfe3e6" : "#dfe3e6"

    function handleClick() {
        setCardOpen(true)
    }

    function handleChange(event) {
        setText(event.target.value)
    }   

    function closeForm() {
        setCardOpen(false)
    }

    function handleaddColumn() {
        setText("")
        props.dispatch(addColumn(text))
    }

    function handleaddTask() {
        setText("")
        props.dispatch(addTask(text, props.colId))
    }

    function addChooser() {
        return buttonTitle === 'Add List' ? handleaddColumn() : handleaddTask()
    }

    function addTextButton() {
        return (
            <div 
                onClick={handleClick}
                style={{
                ...styles.textButtonContainer,
                color:buttonTextColor, 
                backgroundColor: buttonTextBackground, 
                opacity: buttonTextOpacity
                }}
            >
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        )        
    }

    function addCard() {
        return (
            <div>
                <Card style= {styles.cardContainer}>
                    <TextareaAutosize 
                        placeholder= {placeholderText}
                        autoFocus
                        value={text}
                        onChange={handleChange}
                        onBlur={closeForm}
                        style={{
                            resize: "none",
                            width: "100%",
                            overflow: "hidden",
                            outline: "none",
                            border: "none"
                        }}
                    />
                </Card>
                <div style={styles.formButtonGroup}>
                    {() => {
                        if (buttonTitle !== "Add List") {
                            <div>
                                <Button variant="contained" style={styles.cardButtonContainer} onMouseDown={addChooser}>
                                {buttonTitle}
                                </Button>
                                <Icon style={{marginLeft: 8, cursor:"pointer"}}>close</Icon>
                            </div>
                        }
                    }}
                 </div>
            </div>
        )
    }

    return cardOpen ? addCard() : addTextButton()
}

export default connect()(TrelloActionButton)

const styles = {
    textButtonContainer: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 40,
        width: 270,
        paddingLeft: 10
    },
    cardContainer: {
        minHeight: 85,
        minWidth: 273,
        padding: "6px 8px 2px"
    },
    cardButtonContainer: {
        color:"white", 
        backgroundColor:"rgb(90, 172, 68)"
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
}
