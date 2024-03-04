import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from "./routes/Signup"
import Signin from "./routes/Signin"
import Dashboard from "./routes/Dashboard"
import SendMoney from "./routes/SendMoney"
import Redirect from "./routes/Redirect"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/send" element={<SendMoney/>} />
          <Route path="/send/redirect" element={<Redirect/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App
