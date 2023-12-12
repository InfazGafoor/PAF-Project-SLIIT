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
  MDBCollapse,
} from 'mdb-react-ui-kit';

export default function Nav() {
  const [showBasic, setShowBasic] = useState(false);

  function profile(){
    window.location.href="./Profile"
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
            <MDBIcon far icon="user-circle" size='2x' color='warning' onClick={profile}/>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
  )
};