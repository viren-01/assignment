import '../src/styles/App.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()

  const handleViewUser = () => {
    navigate("/viewAll")
  }

  const handleCreateUser = () => {
    navigate("/createUser")
  }


  return (<div className="App"> <div className="scroller">
    <span>
      {"WELCOME"}
      <Button className='createUser' variant="contained" onClick={handleCreateUser}>Create User</Button>
      <Button className='viewUser' variant="contained" onClick={handleViewUser}>View Users</Button>
    </span>


  </div>  </div>)
}
export default App