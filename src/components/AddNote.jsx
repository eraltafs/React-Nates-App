import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NoteContext } from '../contexts/NoteContext';

function AddNote() {
    const {addNote} = useContext(NoteContext)
    const [note, setNote] = useState({ title: "", Description: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(note)
        const {title, Description} = note
        addNote(title, Description)
    }
    return (
        <Form onSubmit={onSubmit} style={{ width: "400px",boxShadow:"rgb(255 255 255 / 35%) 0px 5px 6px", borderRadius:"10px" }} className='mx-auto text-white p-4'>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" name='title' placeholder="Enter Title" onChange={onChange} value={note.title} required/>

            </Form.Group>

            <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="Description" name='Description' placeholder="Description" onChange={onChange} value={note.Description} required/>
            </Form.Group>
            
            <Button variant='primary'  type="submit" style={{boxShadow:"rgba(255, 255, 255, 0.17) 0px -23px 25px 0px inset, rgba(255, 255, 255, 0.15) 0px -36px 30px 0px inset, rgba(255, 255, 255, 0.1) 0px -79px 40px 0px inset, rgba(255, 255, 255, 0.06) 0px 2px 1px, rgba(255, 255, 255, 0.09) 0px 4px 2px, rgba(255, 255, 255, 0.09) 0px 0px 0px, rgba(255, 255, 255, 0.09) 0px 0px 0px, rgba(255, 255, 255, 0.09) 0px 0px 0px", backgroundColor:"transparent", border:"none", borderRadius:"20px"}}>
                Submit
            </Button>
        </Form>

    )
}

export default AddNote
