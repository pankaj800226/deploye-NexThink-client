import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Loading from './components/Loading'
import { Toaster } from 'react-hot-toast'
import SaveRoute from './protectedRoute/SaveRoute'
import CommandPalette from './pages/CommandPalette'



// pages configration
const Home = React.lazy(() => import('./pages/Home'))
const Register = React.lazy(() => import('./components/auth/Register'))
const Login = React.lazy(() => import('./components/auth/Login'))
const ForgetPassword = React.lazy(() => import('./components/auth/ForgetPassword'))
const OtpVerify = React.lazy(() => import('./components/auth/OtpVerify'))
const UpdatePassword = React.lazy(() => import('./components/auth/UpdatePassword'))
const TimerChallanger = React.lazy(() => import('./pages/timerPomodoro/TimerChallanger'))
const About = React.lazy(() => import('./components/About'))

const Profile = React.lazy(() => import('./pages/Profile'))

// todo list
const CreateTodo = React.lazy(() => import('./pages/Task-management/CreateTodo'))
const ManageTodo = React.lazy(() => import('./pages/Task-management/ManageTodo'))
const TodoEdit = React.lazy(() => import('./pages/Task-management/TodoEdit'))
const TodoDetails = React.lazy(() => import('./pages/Task-management/TodoDetails'))

{/* work shedular */ }
const CreateHabitTracker = React.lazy(() => import('./pages/habitTracker/CreateHabitTracker'))

// analyze
const Analyze = React.lazy(() => import('./pages/Analyze/TodoAnalyze'))


// routing gols 
const DailyPlanner = React.lazy(() => import('./pages/dailyplanner/DailyPlanner'))



const AppLayout = () => {
  const location = useLocation()

  const hideHeaderRoutes = [
    // "/dashboard",
    // "/createTodo",
    // "/managetodo",
    // "/profile",
    // "/todoEdit",
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
      {/* <Header /> */}
      <Suspense fallback={<Loading />}>
        <CommandPalette />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/otpverify' element={<OtpVerify />} />
          <Route path='/updatepassword' element={<UpdatePassword />} />
          <Route path='/about' element={<About />} />


          {/* // saved route  */}
          <Route element={<SaveRoute />}>
            <Route path='/timechallaner' element={<TimerChallanger />} />

            {/*In dashboard all page will be here */}
            <Route path='/profile' element={<Profile />} />

            {/* todo part */}
            <Route path='/createTodo' element={<CreateTodo />} />
            <Route path='/managetodo' element={<ManageTodo />} />
            <Route path='/todoEdit/:id' element={<TodoEdit />} />
            <Route path='/todoDetails/:id' element={<TodoDetails />} />

            {/* habit tracker */}
            <Route path='/habittracker' element={<CreateHabitTracker />} />

            {/* analyze */}
            <Route path='/analyze' element={<Analyze />} />

            {/* routing gols  */}
            <Route path='/dailyplanner' element={<DailyPlanner />} />




          </Route>
          {/* end save  */}
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