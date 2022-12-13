import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import HomeService from '../viewUser/api/api.homepage';
import { useNavigate, useLocation } from 'react-router-dom';
import { Uploader } from "uploader";

const theme = createTheme();

export default function AddUser() {
    const [error, setError] = React.useState(false)
    const isUpdate = React.useRef(false)
    const [fileURL, setFileURL] = React.useState('')


    const navigate = useNavigate()
    const location = useLocation()

    console.log("props", location.state)

    if (location?.state?.id) {
        isUpdate.current = true
    }



    const handleImage = () => {
        const uploader = Uploader({ apiKey: "public_kW15azgEhtKCsDc6rb6o5wp7GUkb" }); // Your real API key.
        uploader.open({ maxFileCount: 1 }).then(files => {
            if (files.length === 0) {
                console.log('No files selected.')
            } else {
                console.log('Files uploaded:');
                const currentFileURL = files[0].fileUrl
                console.log(currentFileURL);
                setFileURL(currentFileURL)
            }
        }).catch(err => {
            console.error(err);
        });
    }


    const handleSubmit = async (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const finalObj = {
            name: data.get('name'),
            mobile: data.get('mobile'),
            image: fileURL
        }
        console.log("is update", isUpdate, location.state)

        if (location.state) {
            let mobile = (location.state.description).toString()
            let name = finalObj?.name ? finalObj.name : location.state.name
            let image = fileURL ? fileURL : location?.state?.description
            const updateAPI = await HomeService.editUser(mobile, name, image)
            console.log(updateAPI)

            if (!updateAPI.err) {
                alert("User Updated Successfully")
                navigate('/viewAll')
            }
        }
        else {
            const numFlag = isNaN(finalObj.mobile)

            if (numFlag) {
                alert("Mobile Number should be Numeric")
            }

            if (!numFlag && finalObj.mobile?.length != 10) {
                alert("Mobile Number should be of 10 Characters")
            }

            if (!finalObj.name) {
                alert("Name cannot be empty")
            }

            if (!numFlag && finalObj.mobile.length == 10 && finalObj.name) {
                const createUser = await HomeService.createUser(finalObj.mobile, finalObj.name, finalObj.image)
                console.log(createUser)
                if (!createUser.err) {
                    alert("User Created Successfully")
                    navigate('/viewAll')
                }
                else {
                    const err = await createUser.response.data?.msg
                    alert(err ? err : "Internal Server Error")
                }
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            error={error}
                            defaultValue={location?.state?.name ? location?.state?.name : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="mobile"
                            label="Mobile"
                            type="tel"
                            id="mobile"
                            autoComplete="mobile"
                            error={error}
                            disabled={location?.state?.description ? true : false}
                            defaultValue={location?.state?.description ? location?.state?.description : ''}
                        />

                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <PhotoCamera onClick={handleImage} />
                        </IconButton>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, mb: 1, ml: 15 }}
                        >
                            {isUpdate.current ? "Update" : "Create"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}