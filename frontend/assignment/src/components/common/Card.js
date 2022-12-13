import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import defaultImg from '../../assets/default.jpg'
import HomeService from '../viewUser/api/api.homepage';
import { useNavigate } from 'react-router-dom';

export default function MyCard(params) {

  const navigate = useNavigate()

  const handleDelete = async (params) => {
    console.log(params)
    const deleteAPI = await HomeService.deleteUsers(params.description.toString())
    alert("User Deleted Successfully")
    window.location.reload(true);
  }

  const handleEdit = async (params) => {
    console.log(params)
    navigate('/createUser',{state: params})
    
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="170"
        src={params?.img ? params.img : defaultImg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {params.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {params.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => { handleEdit(params) }}>Edit</Button>
        <Button size="small" onClick={() => { handleDelete(params) }}>Delete</Button>
      </CardActions>
    </Card>
  );
}