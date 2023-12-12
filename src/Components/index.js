import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Index() {
  const [showBasic, setShowBasic] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async () => {
    
    try {
        const response = await axios.post('http://localhost:8080/login', {
          "email": username,
          "password": password
        });
        console.log(response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Login successful.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          localStorage.setItem('user' , username);
          localStorage.setItem('profile_view' , username);
          window.location.href ="./PostWall";
        });
        
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: 'Error!',
            text: 'Invalid username or password.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
  }


  function reg(){
    window.location.href="./Register";
  }
  return (
    <>
    <MDBNavbar expand='lg' light style={{backgroundColor:'#982121'}}>
      <MDBContainer container>
        <MDBNavbarBrand href='#' className='text-warning' style={{fontSize:'30px' ,fontWeight:'500'}}> <MDBIcon fas icon="hamburger" /> Foodies</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-white' aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'  className='text-white'>Contact</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'  className='text-white'>Blog</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'  className='text-white'>About</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <MDBBtn outline color='warning' size='lg'>JOIN&nbsp;NOW</MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    <div className='container' style={{paddingTop:'10%'}}>
        <div className='row'>
            <div className='col'>
                <img src="./img/login_bg_2.png" style={{width:'85%'}}/>
            </div>
            <div className='col'>
                <div style={{backgroundColor:'#DFCFCF'}} className='p-4 rounded'>
                    <h3 className='text-center'>SIGN IN</h3>
                    <hr/>
                    <div className='mt-2'>
                        <label>User Name</label>
                        <MDBInput type="text" className='bg-white' onChange={handleUsernameChange} value={username} />
                    </div>
                    <div className='mt-3'>
                        <label>Password</label>
                        <MDBInput type="password" className='bg-white' onChange={handlePasswordChange} value={password} />
                    </div>
                    <div className='mt-4'>
                        <div className="d-grid gap-2">
                            <MDBBtn className='btn-danger shadow-0' onClick={handleSubmit}>Login</MDBBtn>
                        </div>
                        <div className='text-end'>
                            <label style={{color:'#C10D0D' , cursor:'pointer'}} onClick={reg}>I don't have a account</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}