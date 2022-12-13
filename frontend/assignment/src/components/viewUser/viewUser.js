import { useEffect, useState } from 'react'
import HomeService from './api/api.homepage'
import MyCard from '../common/Card'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AddUser from '../addUser/addUser';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
}));


const ViewUsers = () => {

    const [users, setUsers] = useState([])


    useEffect(() => {

        async function fetchUsersData() {
            const callUsersApi = await HomeService.viewUsers()
            console.log(callUsersApi)
            const userDetails = callUsersApi?.response?.data?.response
            setUsers(userDetails)
        }

        fetchUsersData()

    }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>{users.map((ele, index) => {
                    return (<Grid item xs={2} sm={4} md={2} key={index}><Item><MyCard id={index} className='card' name={ele.name} description={ele.mobile} img={(ele?.image).toString()} /></Item></Grid>)
                })}
                </Grid>
            </Box>
            <Link to='/' style={{ top: '90%' }}> Back To Home Page</Link>
        </>)
}


export default ViewUsers