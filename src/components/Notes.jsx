import React, { useContext, useEffect, useState } from 'react'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { NoteContext } from '../contexts/NoteContext'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Form } from 'react-bootstrap'

function Notes() {
    const { notes, getNotes, editNote } = useContext(NoteContext)
    const [note, setNote] = useState({ title: "", Description: "" })
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1)
    const currentNotes = []
    const navigate = useNavigate()
    const maxPage = Math.ceil(notes.length / 6)
    const appendButton = () => {
        let buttons = []
        for (let i = 1; i <= maxPage; i++) {
            buttons.push(
                <Button
                    disabled={i === page} key={i}
                    className={`mx-2 ${page === i ? 'text-danger' : ""}`}
                    onClick={() => {
                        setPage(i)
                        handlePageChange(i)
                    }}>
                    {i}
                </Button>)
        }
        return buttons
    }
    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem("token"))
        if (storedToken) {
            getNotes(storedToken)
        }
        else {
            navigate("/login")
        }
    }, [])
    const updateNote = (note) => {

        setNote(note)
        handleShow()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault()

        editNote(note)
        handleClose()
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePageChange = (page) => {
        const ILN = page * 6
        const IFN = ILN - 6
        for (let i = IFN; i < ILN; i++) {
            if (notes[i] == undefined) {
                break;
            }
            currentNotes.push(notes[i])
        }
    }
    handlePageChange(page)

    return (
        <>
            <h2 className='text-center text-white my-2 mx-auto p-2' style={{ width: "max-content", borderRadius: "10px", backgroundColor: "rgb(33,37,41)", boxShadow: "rgb(255 255 255 / 35%) 0px 5px 6px" }}>Add Note</h2>
            <AddNote />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ width: "400px", color: "black" }} className='mx-auto text-white'>
                        <Form.Group style={{ color: "black" }} className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="title" name='title' placeholder="Enter Title" onChange={onChange} value={note.title} required />
                        </Form.Group>
                        <Form.Group style={{ color: "black" }} className="mb-3" controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="Description" name='Description' placeholder="Description" onChange={onChange} value={note.Description} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2 className='text-center text-white my-4 mx-auto p-2' style={{ width: "max-content", borderRadius: "10px", backgroundColor: "rgb(33,37,41)", boxShadow: "rgb(255 255 255 / 35%) 0px 5px 6px" }}>Your Notes</h2>
            {currentNotes && currentNotes.length > 0 ?
                <div className="container">
                    <div className="row my-4 container mx-auto row-gap-4">

                        {currentNotes.map((note, i) => {
                            return (
                                <div key={i} className="col-md-4">
                                    <NoteItem note={note} updateNote={updateNote} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="pagination mx-auto my-2" style={{ width: "max-content" }}>
                        <Button
                            disabled={page === 1}
                            onClick={() => {
                                setPage(page - 1)
                                handlePageChange(page - 1)
                            }}>
                            <i class="fa-solid fa-arrow-left"></i>
                        </Button>
                        {appendButton()}
                        <Button
                            disabled={page === maxPage}
                            onClick={() => {
                                setPage(page + 1)
                                handlePageChange(page + 1)
                            }}>
                            <i class="fa-solid fa-arrow-right"></i>
                        </Button>
                    </div>
                </div> : <h3 className='text-center text-white my-2 mx-auto p-2'>Currently you Don't have notes. You can add.</h3>}

        </>
    )
}

export default Notes