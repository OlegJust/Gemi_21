import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom' // для работы с роутерами
import {useAuth} from './hooks/auth.hook'
import {useRoutes} from './routes'
import {Loader} from "./components/Loader";
import {AuthContext} from './context/AuthContext'
// import socket from "./core/socket"

// import './App.css';


function App() {
    const {name, token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    //const [car, setForm] = useState("oc")
    // const clic = (event) => {
    //     setForm(event.target.value) // передаём даные из инпута
    //     socket.emit('add user', event.target.value)
    //     console.log(car)
    // }
    //
    // useEffect(() => {
    //
    //     socket.on('user joined', (data) => {
    //         console.log(data)
    //     })
    // }, [])


    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            name, token, login, logout, userId, isAuthenticated
        }}>
            <Router>

                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
