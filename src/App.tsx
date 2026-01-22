import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Loading from './components/Loading'
import { Toaster } from 'react-hot-toast'
import SaveRoute from './protectedRoute/SaveRoute'


// pages configration
const Home = React.lazy(() => import('./pages/Home'))
const Register = React.lazy(() => import('./components/auth/Register'))
const Login = React.lazy(() => import('./components/auth/Login'))
const ForgetPassword = React.lazy(() => import('./components/auth/ForgetPassword'))
const OtpVerify = React.lazy(() => import('./components/auth/OtpVerify'))
const UpdatePassword = React.lazy(() => import('./components/auth/UpdatePassword'))
const TimerChallanger = React.lazy(() => import('./pages/TimerChallanger'))
const Think_Drow = React.lazy(() => import('./pages/Think_Drow'))



const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Profile = React.lazy(() => import('./pages/Profile'))

// todo list
const CreateTodo = React.lazy(() => import('./pages/Todo-List/CreateTodo'))
const ManageTodo = React.lazy(() => import('./pages/Todo-List/ManageTodo'))
const TodoEdit = React.lazy(() => import('./pages/Todo-List/TodoEdit'))
const TodoDetails = React.lazy(() => import('./pages/Todo-List/TodoDetails'))

{/* work shedular */ }
const CreateShedular = React.lazy(() => import('./pages/Work-Shedular/CreateShedular'))

// analyze
const Analyze = React.lazy(() => import('./pages/Analyze/Analyze'))






// style configration
import './styles/app.scss'
import './styles/loading.scss'
import './styles/sidebaar.scss'
import './styles/header.scss'
import './styles/banner.scss'
import './styles/feature.scss'
import './styles/register.scss'
import './styles/profile.scss'

// task
import './styles/Todo-list/manageTodo.scss'
import './styles/Todo-list/todoDetails.scss'
// time challanger
import './styles/timechallange.scss'
// work shedular
import './styles/works-hedular/createShedular.scss'

//think drow
import './styles/think_drow.scss'

// anzlyze
import './styles/Analyze/analyze.scss'
import './styles/Analyze/coverImg.scss'


const AppLayout = () => {
  const location = useLocation()

  const hideHeaderRoutes = [
    "/dashboard",
    "/createTodo",
    "/managetodo",
    "/profile",
    "/todoEdit",
    "/todoDetails",
    "/analyze",
  ];

  // dashboard route check
  const hideHeader = hideHeaderRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideHeader && <Header />}
      <Suspense fallback={<Loading />}>

        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/otpverify' element={<OtpVerify />} />
          <Route path='/updatepassword' element={<UpdatePassword />} />


          <Route element={<SaveRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/timechallaner' element={<TimerChallanger />} />
            <Route path='/thinkdrow' element={<Think_Drow />} />

            {/*In dashboard all page will be here */}
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            {/* todo part */}
            <Route path='/createTodo' element={<CreateTodo />} />
            <Route path='/managetodo' element={<ManageTodo />} />
            <Route path='/todoEdit/:id' element={<TodoEdit />} />
            <Route path='/todoDetails/:id' element={<TodoDetails />} />

            {/* work shedular */}
            <Route path='/createshedular' element={<CreateShedular />} />

            {/* analyze */}
            <Route path='/analyze' element={<Analyze />} />



          </Route>



        </Routes>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </Suspense >
    </>
  )
}


const App = () => {

  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App