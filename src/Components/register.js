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


export default function Register() {
  const [showBasic, setShowBasic] = useState(false);

  function login(){
    window.location.href="/";
  }

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [telephoneNumberError, setTelephoneNumberError] = useState('');


  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleTelephoneNumberChange = (event) => {
    const { value } = event.target;
    setTelephoneNumber(value);

    // Regular expression to validate telephone number
    const phonePattern = /^[\d\s()+-]{10,20}$/;
    if (!phonePattern.test(value)) {
      setTelephoneNumberError('Please enter a valid telephone number');
    } else {
      setTelephoneNumberError('');
    }
  };

  function handleEmailChange(e) {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  }

  function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function isStrongPassword(str) {
    // Regular expression to check for a strong password:
    // - At least 8 characters long
    // - Contains at least one uppercase letter
    // - Contains at least one lowercase letter
    // - Contains at least one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(str);
  }

  const registerUser = async () => {
  
    try {
      const response = await axios.post('http://localhost:8080/user', {
        "fullName": fullName,
        "email": email,
        "telephone": telephoneNumber,
        "password": password
      });
      console.log(response.data);
      // Display success message with SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Account is Created successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        window.location.href = '/';
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password)
  };



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
    <div className='container' style={{paddingTop:'10%' , paddingBottom:'20%'}}>
        <div className='row'>
            <div className='col'>
                <img src="./img/login_bg.png" style={{width:'85%'}}/>
            </div>
            <div className='col'>
                <div style={{backgroundColor:'#DFCFCF'}} className='p-4 rounded'>
                    <h3 className='text-center'>SIGN UP</h3>
                    <hr/>
                    <div className='mt-2'>
                      <label>Full Name</label>
                      <MDBInput type="text" className='bg-white' onChange={handleFullNameChange} />
                    </div>
                    <div className='mt-4'>
                      <label>Email <sup>(As User Name)</sup></label>
                      <MDBInput type="text" className='bg-white' onChange={handleEmailChange} />
                      {email && !isValidEmail() && <div className='text-danger'>Please enter a valid email address</div>}
                    </div>
                    <div className='mt-4'>
                      <label>Telephone Number</label>
                      <MDBInput type="text" className='bg-white' onChange={handleTelephoneNumberChange} />
                      {telephoneNumberError && (
                        <div className="text-danger">{telephoneNumberError}</div>
                      )}
                    </div>
                    <div className='mt-4'>
                      <label>Password</label>
                      <MDBInput
                        type="password"
                        className='bg-white'
                        onChange={handlePasswordChange}
                      />
                      {password && !isStrongPassword(password) && (
                        <div className="text-danger">Password is not strong enough</div>
                      )}
                    </div>
                    <div className='mt-4'>
                        <label>Confirm Password:</label>
                        <MDBInput type="password" className='bg-white' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                        {passwordMatch ? (
                          <div className='text-success'>Passwords Match</div>
                          ) : (
                            <div className='text-danger'>Passwords Do Not Match</div>
                            )}
                    </div>
                    <div className='mt-4'>
                        <div className="d-grid gap-2">
                            <MDBBtn className='btn-danger shadow-0' onClick={registerUser}>Register</MDBBtn>
                        </div>
                        <div className='text-end'>
                            <label style={{color:'#C10D0D' , cursor:'pointer'}} onClick={login}>I have a account</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}