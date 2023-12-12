import React, { useState  , useEffect ,useRef } from 'react';
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
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './nav';

export default function Profile() {

    const [editModal, setEditModal] = useState(false);
    const toggleEdit = () => setEditModal(!editModal);


    const handleEditContentChange = (content, editor) => {
        setEditContent(content);
    }

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
    const [follow_btn_status, setFollowBtnStatus] = useState('Follow');
    const [cloudinaryEditImage, setEditCloudinaryImage] = useState("");

    const [posts, setPosts] = useState([]);

    const [uploadFile, setUploadFile] = useState("");
    const [cloudinaryImage, setCloudinaryImage] = useState("");

    const [userProfile, setUserProfile] = useState({});

    const [isFollowDisabled, setIsFollowDisabled] = useState(false);

    useEffect(() => {

        const response = axios.post('http://localhost:8080/follow/checkISDataAvailable', {
            "user": localStorage.getItem('user'),
            "friend": localStorage.getItem('profile_view'),
        });
        
        console.log(response);
        if (response.data === true) {
            setIsFollowDisabled(true);
            setFollowBtnStatus("Followed");
        }else{
            setIsFollowDisabled(false);
            setFollowBtnStatus("Follow");
        }

    
        axios
        .get("http://localhost:8080/userProfile/"+localStorage.getItem('profile_view'))
        .then((response) => setUserProfile(response.data))
        .catch((error) => console.log(error));
  
        load_post();
    }, []);

    function load_post(){
        axios.get('http://localhost:8080/filterPostsByUploader/'+localStorage.getItem('profile_view'))
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
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

    function follow(){
        // make POST request to follow endpoint
        axios.post('http://localhost:8080/follow', {
            "user": localStorage.getItem('user'),
            "friend": localStorage.getItem('profile_view'),
            "timeStamp": "2023-05-08 10:39"
        })
        .then((response) => {
            // show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Followed!',
                text: 'You are now following this user.'
            });
            setFollowBtnStatus("Followed");
        })
        .catch((error) => {
            // show error message using SweetAlert2
            Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Something went wrong. Please try again later.'
            });
        });
    }

  return (
    <div style={{backgroundColor:"#EEEEEE"}}>
        <NavBar/>
        <MDBModal show={editModal} setShow={setEditModal} tabIndex="-1" staticBackdrop>
            <MDBModalDialog size="lg">
                <MDBModalContent>
                <MDBModalHeader className="bg-dark">
                    <MDBModalTitle className="text-white">Edit Post</MDBModalTitle>
                    <MDBBtn className="btn-close" color="none" onClick={toggleEdit}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody className="p-4">
                    <div className="mt-3">
                    <label>Title</label>
                    <MDBInput  id="form1" type="text" value={edit_title} onChange={(e) => setEditTitle(e.target.value)} />
                    </div>
                    
                    <div className="mt-4">
                    <label>Write Your Post</label>
                    <Editor
                        apiKey="akxn7iktno5jpriljrrs530wh1pnmvfd1w9vgrr0ofx4uuo6"
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={edit_content}
                        onEditorChange={handleEditContentChange}
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
                    <MDBBtn color="danger" className="shadow-0" onClick={toggleEdit}>
                    Close
                    </MDBBtn>
                    <MDBBtn color="dark" className="shadow-0" onClick={handleEditPost}>
                    Edit changes
                    </MDBBtn>
                </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
            </MDBModal>

        <div className='container pb-5'>
            <div className='row'>
                <div className='col-5'>

                    <div className='mt-5 text-center'>
                        <h3>&nbsp;</h3>
                    </div>
                    <div style={{backgroundColor:"#F9F8F8"}} className='p-3 mt-4 rounded shadow'>
                        <h4 className='text-left mt-4'>PROFILE CARD</h4>
                        <hr/> 
                        <div  className='text-center pt-3' >
                         <img src="./img/profile.webp" style={{width:'50%'}}/>
                         <h4 className='mt-4'>{userProfile.fullName}</h4>
                        </div>
                        <div className='text-start' style={{paddingLeft:'15%'}}>
                            <MDBIcon fas icon="at" />&nbsp;&nbsp;<span>{userProfile.email}</span><br/>
                            <MDBIcon fas icon="phone-alt" />&nbsp;&nbsp;<span>{userProfile.telephone}</span><br/>
                            <MDBIcon fas icon="calendar-alt" />&nbsp;&nbsp;<span>{userProfile.createdAt}</span><br/><br/>
                            {/* render other user profile data */}
                        </div>
                        {localStorage.getItem('user') !== localStorage.getItem('profile_view') && (
                        <>
                            <hr/>
                            <div className='text-center'>
                                <MDBBtn className='shadow-0' color='primary' style={{width:'130px'}} disabled={isFollowDisabled} onClick={follow}>{follow_btn_status} <MDBIcon fas icon="fingerprint" /></MDBBtn> &nbsp;
                                <MDBBtn className='shadow-0' color='primary' outline style={{width:'130px'}}>Like <MDBIcon far icon="thumbs-up" /></MDBBtn>
                            </div>
                        </>
                        )}
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-6'>
                    <div className='mt-5 text-center'>
                        <h3>YOUR POSTS</h3>
                    </div>
                    {posts.map((post, index) => (
                    <div style={{backgroundColor:"#F9F8F8"}} className='p-3 mt-4 rounded shadow'>
                        {localStorage.getItem('user') === localStorage.getItem('profile_view') && (
                        <>
                            <div className='row' style={{width:'15%' , float:'right'}}>
                                <div className='col text-end' style={{cursor:'pointer'}}>
                                    <div onClick={()=>editPost(post)}>
                                        <MDBIcon fas icon="ellipsis-v" color="muted"  style={{fontSize:'22px'}} />
                                    </div>
                                </div>
                                <div className='col text-end'>
                                    <div  onClick={()=>deletePost(post)}>
                                        <MDBIcon fas icon="trash" color="muted"  style={{fontSize:'22px'}} />
                                    </div>
                                </div>
                            </div>
                        </>
                        )}
                        <br/>
                        <div className='p-4'  onClick={()=>viewPost(post)}>
                            <img src={post.file} style={{width:'100%'}} />
                            <span className='pt-2' style={{fontSize:'14px'}}>Post By {post.uploadedBy}<br/></span>
                            <span style={{fontSize:'14px' , lineHeight:'10px'}}>{post.timeStamp}</span>
                            <h4 className='mt-4'>{post.title}</h4>
                            <div dangerouslySetInnerHTML={{__html: post.body}}></div>                            
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
            </div>
        </div>
    </div>
  )
};