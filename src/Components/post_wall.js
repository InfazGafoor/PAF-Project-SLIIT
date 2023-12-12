import React, { useState , useEffect ,useRef } from 'react';
import {
    MDBIcon,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBInput,
    MDBModalBody,
    MDBBadge,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Cloudinary } from 'cloudinary-core';
import NavBar from './nav';



function Dashboard() {
    const [showBasic, setShowBasic] = useState(false);
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [editModal, setEditModal] = useState(false);
    const toggleEdit = () => setEditModal(!editModal);


    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [edit_title, setEditTitle] = useState('');
    const [edit_content, setEditContent] = useState('');
    const [edit_id, setEditID] = useState('');
    const [cloudinaryEditImage, setEditCloudinaryImage] = useState("");

    const [posts, setPosts] = useState([]);

    const [uploadFile, setUploadFile] = useState("");
    const [cloudinaryImage, setCloudinaryImage] = useState("");

    useEffect(() => {
        load_post();
    }, []);

    function load_post(){
        axios.get('http://localhost:8080/post')
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }

   

    const saveData = (cloudinaryImageUrl) => {
      
        // Send POST request to API endpoint
        const response = axios.post('http://localhost:8080/post', {
            "title": title,
            "body": content,
            "file": cloudinaryImageUrl,
            "uploadedBy": localStorage.getItem('user')
        })
        .then(response => {
                // Show success message using SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Post created successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                load_post();
                setBasicModal(!basicModal);
        }).catch(error => {
            console.log(error);
        })
        
            
    };

    const handleContentChange = (content, editor) => {
        setContent(content);
    }

    

   

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const formData = new FormData ();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "ml_default");
        
        axios.post(
            "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
            formData
            )
            .then((response) => {
                console.log(response);
                setCloudinaryImage(response.data.secure_url);
                saveData(response.data.secure_url);
            })
            .catch((error) => {
                console.log(error);
            });   
    }

    function viewPost(data){
        localStorage.setItem('one_post', JSON.stringify(data));
        window.location.href="./ReviewPost";
    }

    function editPost(data){
        setEditModal(!editModal);
        setEditTitle(data.title);
        setEditContent(data.body);
        setEditCloudinaryImage(data.file); 
        setEditID(data.id);
    }

    function handleEditPost() {
        axios.put("http://localhost:8080/update_Post/"+edit_id, {
            "title": edit_title,
            "body": edit_content,
            "file": cloudinaryEditImage,
            "uploadedBy": "John Doe"
        })
        .then(response => {
            // Handle success scenario
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Post updated successfully',
                showConfirmButton: false,
                timer: 1500
            });
            setEditModal(!editModal);
        })
        .catch(error => {
            // Handle error scenario
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
        });

    }

    function deletePost(data) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this post!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            // Delete the post by its id
            axios.delete(`http://localhost:8080/post/${data.id}`)
              .then(response => {
                console.log(response.data);
                Swal.fire(
                  'Deleted!',
                  'Your post has been deleted.',
                  'success'
                );
                load_post();
                
              })
              .catch(error => {
                console.error(error);
                Swal.fire(
                  'Error!',
                  'Failed to delete the post. Please try again later.',
                  'error'
                );
              });
          }
        });
    }

    function viewProfile(data){
        
        localStorage.setItem('profile_view', data.uploadedBy);
        window.location.href="./Profile";
    }

    return (
        <div style={{backgroundColor:"#EEEEEE"}}>
            <NavBar/>
            
         

            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' staticBackdrop>
                <MDBModalDialog size="lg">
                <MDBModalContent>
                    <MDBModalHeader className='bg-dark'>
                    <MDBModalTitle className='text-white'>ADD POSTS</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className='p-4'>
                        <div className='mt-3'>
                            <label>Title</label>
                            <MDBInput label='' id='form1' type='text' value={title}  onChange={(e) =>{
                                                            setTitle(e.target.value);
                                                        }}/>
                        </div>
                        <div className='mt-4'>
                            <label>Upload File</label>
                            <input type="file" className='form-control'
                                onChange ={(event) => {setUploadFile(event.target.files[0]);}} 
                              />
                        </div>
                        <div className='mt-4'>
                            <label>Write Your Post</label>
                            <Editor
                                apiKey='akxn7iktno5jpriljrrs530wh1pnmvfd1w9vgrr0ofx4uuo6'
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue={content}
                                onEditorChange={handleContentChange}
                                init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                        
                    </MDBModalBody>

                    <MDBModalFooter>
                    <MDBBtn color='danger'  className='shadow-0' onClick={toggleShow}>
                        Close
                    </MDBBtn>
                    <MDBBtn color='dark'  className='shadow-0' onClick={handleSubmit}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                        <br/>
                        
                        <h5 style={{fontSize:'19px'}} className='text-uppercase'>Home</h5>
                        <hr style={{width:'60%'}}/>
                        <br/>
                        <MDBBadge light='true' className='text-start p-3 badge-primary rounded-4 square border border-primary' style={{width:'200px'}}>
                            <MDBIcon fas icon="file-alt" />&nbsp;<span style={{fontSize:'15px'}}>&nbsp;Pages</span>
                        </MDBBadge>
                        <br/>
                        <MDBBadge light='true' className='text-start p-3 badge-primary rounded-4 mt-2 square border border-primary' style={{width:'200px'}}>
                            <MDBIcon fas icon="tasks" />&nbsp;<span style={{fontSize:'15px'}}>&nbsp;Ads</span>
                        </MDBBadge>
                        <br/>
                        <MDBBadge light='true' className='text-start p-3 badge-primary rounded-4 mt-2 square border border-primary' style={{width:'200px'}}>
                            <MDBIcon fas icon="shop" />&nbsp;<span style={{fontSize:'15px'}}>&nbsp;Shops</span>
                        </MDBBadge>
                        <br/>
                        <MDBBadge light='true' className='text-start p-3 badge-primary rounded-4 mt-2 square border border-primary' style={{width:'200px'}}>
                            <MDBIcon fas icon="save" />&nbsp;<span style={{fontSize:'15px'}}>&nbsp;Saved</span>
                        </MDBBadge>
                        <br/>
                        <MDBBadge light='true' className='text-start p-3 badge-primary rounded-4 mt-2 square border border-primary' style={{width:'200px'}}>
                            <MDBIcon fas icon="users" />&nbsp;<span style={{fontSize:'15px'}}>&nbsp;Gropus</span>
                        </MDBBadge>
                        <br/>
                        <MDBBadge light='true' className='text-start p-3 badge-primary rounded-4 mt-2 square border border-primary' style={{width:'200px'}}>
                            <MDBIcon fas icon="comment" />&nbsp;<span style={{fontSize:'15px'}}>&nbsp;Chats</span>
                        </MDBBadge>
                        <br/>
                        <hr style={{width:'60%'}}/>
                        <br/>
                        <h5 style={{fontSize:'13px' , lineHeight:'22px'}} className='text-uppercase text-muted'>Privacy Policy</h5>
                        <h5 style={{fontSize:'13px' , lineHeight:'22px'}} className='text-uppercase text-muted'>Terms And Condition</h5>
                        <h5 style={{fontSize:'13px' , lineHeight:'22px'}} className='text-uppercase text-muted'>Cookies Policy</h5>
                        <h5 style={{fontSize:'13px' , lineHeight:'22px'}} className='text-uppercase text-muted'>Account Managing</h5>
                        <h5 style={{fontSize:'13px' , lineHeight:'22px'}} className='text-uppercase text-muted'>Help Center</h5>
                    </div>
                    <div className='col-6'>
                        <div style={{backgroundColor:"#F9F8F8"}} className='p-3 mt-4 rounded shadow'>
                            <h5 className='text-uppercase'>Posts wall</h5>
                            <hr/>
                            <input type='text' placeholder='Write Somthing' onClick={toggleShow}   className='form-control border-0' style={{borderRadius:'15px' , backgroundColor:'#DADADA' , paddingTop:'1%' , paddingBottom:'1%'}}/>
                            <br/>
                            <hr style={{backgroundColor:'#9A9A9A'}}/>
                            <div className='row text-center'>
                                <div className='col'>
                                    <MDBIcon fas icon="video" color="danger" style={{fontSize:'27px'}} />
                                </div>
                                <div className='col'>
                                    <MDBIcon fas icon="camera" color="success" style={{fontSize:'27px'}} />
                                </div>
                                <div className='col'>
                                    <MDBIcon fas icon="pen" color="warning" style={{fontSize:'27px'}} />
                                </div>
                            </div>
                        </div>

                        {posts.map((post, index) => (
                        <div style={{backgroundColor:"#F9F8F8"}} className='p-3 mt-4 rounded shadow'>
                        
                            <div className='p-4'  >
                                <img src={post.file} style={{width:'100%'}} />
                                <span className='pt-2' style={{fontSize:'14px' , cursor :'pointer'}} onClick={()=>viewProfile(post)}>Post By {post.uploadedBy}<br/></span>
                                <span style={{fontSize:'14px' , lineHeight:'10px'}} onClick={()=>viewPost(post)}>{post.timeStamp}</span>
                                <h4 className='mt-4' onClick={()=>viewPost(post)}>{post.title}</h4>
                                <div onClick={()=>viewPost(post)} dangerouslySetInnerHTML={{__html: post.body}}></div>                            
                            </div>
                            <hr/>
                            <div className='row' style={{width:'34%'}}>
                            
                                <div className='col'>
                                    <MDBIcon fas icon="heart"  style={{fontSize:'27px',color:'#515151'}}/><br/>
                                    <sppan>100</sppan>
                                </div>
                                <div className='col'>
                                    <MDBIcon fas icon="comment"  style={{fontSize:'27px',color:'#515151'}}/><br/>
                                    <sppan>100 </sppan>
                                </div>
                                <div className='col'>
                                    <MDBIcon fas icon="share"  style={{fontSize:'27px',color:'#515151'}}/><br/>
                                    <sppan>100 </sppan>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className='col-3'></div>
                </div>
                <br/>
            </div>
        </div>

    );
}

export default Dashboard;