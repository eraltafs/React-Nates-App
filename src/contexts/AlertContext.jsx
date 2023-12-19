import React, { createContext, useState } from 'react'
const AlertContext = createContext()
function AlertState(props) {
  const [alert, setAlert] = useState(null)
  const showAlert = (type, message) => {
    setAlert({
      type,
      message
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }
  return (
    <AlertContext.Provider value={{alert, showAlert}}>
      {props.children}
    </AlertContext.Provider>
  )
}

export { AlertState, AlertContext }