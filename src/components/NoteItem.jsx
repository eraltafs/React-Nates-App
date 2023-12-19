import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NoteContext } from '../contexts/NoteContext';

function NoteItem({ note, updateNote }) {
    const { deleteNote } = useContext(NoteContext)

    return (
        <Card className='bg-dark text-white' style={{boxShadow:"rgb(255 255 255 / 35%) 0px 5px 6px"}}>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Card.Title>{note.title}</Card.Title>
                    <div>
                        <img src="./images/edit.png" style={{ cursor: "pointer" }} alt="" srcSet="" width={"25px"} onClick={() => updateNote(note)}/>
                        <img src="./images/delete.png" style={{ cursor: "pointer" }} alt="" srcSet="" width={"25px"} onClick={() => deleteNote(note._id)} />
                    </div>
                </div>
                <Card.Text>
                    {note.Description}
                </Card.Text>

            </Card.Body>
        </Card>

    )
}

export default NoteItem



