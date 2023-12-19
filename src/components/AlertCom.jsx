import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { AlertContext } from '../contexts/AlertContext'

function AlertCom() {
    const { alert } = useContext(AlertContext)
    return (
            alert && 
            <Alert variant={alert.type}>
                {alert.message}
            </Alert>
    )
}

export default AlertCom