"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useStore } from '@/store/App';
import { useRouter } from 'next/navigation';


enum provider {
    Google,
    Twitter
}

// TODO remove, this demo shouldn't need to reset the theme.
const LoginPage = () => {
    const router = useRouter();
    const isLoggedIn = useStore((state)=>state.login)

    const login = async (provider:provider) => {
        if (await isLoggedIn(provider)) {
          router.push("/");
        } else {
          router.refresh();
        }
      };

  return (
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
          <Avatar className='m-4 bg-yellow-500'>
            <LockOutlinedIcon />
          </Avatar>
          <Button className='flex' onClick={()=>login(provider.Google)}>
            <GoogleIcon className='mx-1'/> 
            <Typography>
           Login With Google
           </Typography>
          </Button>
           <Button className='flex' onClick={()=>login(provider.Twitter)}>
            <TwitterIcon className='mx-1'/> 
            <Typography>
           Login With Twitter
           </Typography>
          </Button>
          </Box>
          </Container>
  )
}
export default LoginPage;