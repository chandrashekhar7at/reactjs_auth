import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App

// import React from 'react'
// import {BrowserRouter,Routes,Route} from "react-router-dom"
// import Layout from './components/Layout'
// import Home from './pages/Home'
// import Dashboard from './pages/Dashboard'
// import Signup from './pages/Signup'
// import Signin from './pages/Signin'
// import PaymentPage from './pages/PaymentPage'
// import PrivateRoute from './components/PrivateRoute'
// import Cosmofedninetynine from './pages/Cosmofedninetynine'
// import Withdrawl from './pages/Withdrawl'
// import AddCash from './pages/AddCash'
// import Demo from './pages/Demo'

// const App = () => {
//   return (
//       <BrowserRouter basename="/">
//         <Routes>
//           <Route path="/" element={<Layout/>}>
//              <Route index element={<Home/>} />
//             <Route path="" element={<PrivateRoute/>}>
//               <Route path='/payment' element={<PaymentPage/>} />
//               <Route path="/dashboard" element={<Dashboard/>} />
//               <Route path='/signup' element={<Signup/>} />
//               <Route path='/signin' element={<Signin/>} />
//               <Route path="/withdrawl" element={<Withdrawl/>}/>
//               <Route path="/cosmofeed" element={<Cosmofedninetynine/>}/>
//               <Route path="/addcash" element={<AddCash/>}/>
//             </Route>
//             <Route path="demo" element={<Demo/>} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//   )
// }

// export default App