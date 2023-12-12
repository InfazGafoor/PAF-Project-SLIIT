import React, { useState , useEffect ,useRef } from 'react';
import {
    MDBIcon,
    MDBBadge,
    MDBCard,
    MDBCardText,
    MDBCardBody,
  } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
import NavBar from './nav';

function Dashboard() {
    const [showBasic, setShowBasic] = useState(false);

    const [idPost, setID] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writer, setWriteBy] = useState('');
    const [time_stamp, setTimeStamp] = useState('');
    const [cloudinaryImage, setCloudinaryImage] = useState("");

    const [rate, setRate] = useState('');
    const [comment, setComment] = useState('');

    const [comments, setComments] = useState([]);

    const [isHeartClicked, setIsHeartClicked] = useState(false);

    const handleHeartClick = () => {
        setIsHeartClicked(!isHeartClicked);
    };

    const handleRateChange = (event) => {
        setRate(event.target.value);
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    useEffect(() => {
        var data = localStorage.getItem('one_post');
        const jsonObject = JSON.parse(data);
        
        setTitle(jsonObject.title);
        setContent(jsonObject.body);
        setCloudinaryImage(jsonObject.file);
        setWriteBy(jsonObject.uploadedBy);
        setTimeStamp(jsonObject.time_stamp);
        setID(jsonObject.id);


        fetch("http://localhost:8080/comment/searchComment/"+jsonObject.id)
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.log(error));
    });

    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    function submit_review(){
        axios.post('http://localhost:8080/comment', {
            "postId": idPost,
            "user": localStorage.getItem('user'),
            "rate": rate,
            "comment": comment,
            "timeStamp": new Date().toLocaleString()
          })
        .then(response => {
            console.log(response.data);
            // show SweetAlert2 success message
            Swal.fire({
                icon: 'success',
                title: 'Comment saved successfully',
                showConfirmButton: false,
                timer: 1500
            });
            setRate("");
            setComment("");
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Try Again.',
                showConfirmButton: false,
                timer: 1500
            });
            console.error(error);
        });
    }

    function back(){
        window.location.href = "/PostWall";
    }

    
    function viewProfile(data){
        
        localStorage.setItem('profile_view', data);
        window.location.href="./Profile";
    }

    function editPost(data){}
    function deletePost(data) {
        const { id } = data;
      
        Swal.fire({
          title: `Are you sure you want to delete ?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
           
            axios.delete(`http://localhost:8080/comment/${id}`)
            .then(response => {
              console.log(response.data);
              Swal.fire(
                'Deleted!',
                'Your post has been deleted.',
                'success'
              );
              
              fetch("http://localhost:8080/comment/searchComment/"+idPost)
              .then(response => response.json())
              .then(data => setComments(data))
              .catch(error => console.log(error));
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
      
    return (
        <div style={{backgroundColor:"#EEEEEE"}}>
             <NavBar/>
     
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
                        <div style={{backgroundColor:"#F9F8F8"}} className='p-3 mt-4 rounded shadow' onClick={back}>
                            <MDBIcon fas icon="long-arrow-alt-left" style={{fontSize:'25px' ,cursor:'pointer'}} />&nbsp;&nbsp;&nbsp;&nbsp;<span className='text-uppercase' style={{fontSize:'25px'}}>Review Post</span>
                        </div>
                        <div style={{backgroundColor:"#F9F8F8"}} className='p-3 mt-4 rounded shadow'>
                            <div className='text-end'>
                            
                                <MDBIcon fas icon="ellipsis-v" color="muted"  style={{fontSize:'22px'}} />
                            </div>
                            <div className='p-4'>
                                <img src={cloudinaryImage} style={{width:'100%'}} />
                                <span onClick={()=>viewProfile(writer)} className='pt-2' style={{fontSize:'14px'}}>Post By {writer}<br/></span>
                                <span style={{fontSize:'14px' , lineHeight:'10px'}}>{time_stamp}</span>
                                <h4 className='mt-4'>{title}</h4>
                                <div dangerouslySetInnerHTML={{__html: content}}></div>                            
                            </div>
                            <hr/>
                            <div className='row' style={{width:'34%'}}>
                                
                                <div className='col'>
                                    <MDBIcon fas icon="heart"  
                                    style={{ fontSize: '27px', color: isHeartClicked ? '#007bff' : '#515151' }}
                                    onClick={handleHeartClick}
                                    /><br/>
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
                        <div style={{backgroundColor:"#F9F8F8"}} className='p-3 mt-4 rounded shadow mb-5'>
                            <h5 className='text-uppercase'>Comments</h5>
                            <hr/>

                            <div className="mt-3">
                                <label>Comments Star</label>
                                <select className='form-select' value={rate}  onChange={handleRateChange}>
                                    <option value="">Select Rate</option>
                                    <option value="1">Level One</option>
                                    <option value="2">Level Two</option>
                                    <option value="3">Level Three</option>
                                </select>
                            </div>
                            <div className="mt-3">
                                <label>Comment</label>
                                <textarea className='form-control' rows={4} value={comment} onChange={handleCommentChange}></textarea>
                            </div>
                            <div className="mt-3 mb-3 text-end">
                                <button className='btn btn-dark shadow-0' onClick={submit_review}>Submit</button>
                            </div>
                            <hr/>
                            <br/>
                            <h6 className='text-uppercase'>Read Comments ({comments.length} Comments)</h6>
                            {comments.map((comment, index) => (
                                <>
                                <MDBCard background='light' className='text-white mb-3 shadow-0 ' style={{border:'1px solid #DADADA'}}>
                                <MDBCardBody>
                                    <div className='row'>
                                        <div className='col'>
                                            <h6 className=' border-0' style={{color:'#696969' , fontSize:'16px'}}>{comment.user}</h6>
                                        </div>
                                        <div className='col text-end'>
                                            <span className='m-0 p-0' style={{color:'#696969' , fontSize:'13px'}}>{comment.timeStamp}</span><br/>
                                            <span style={{color:'#696969' , fontSize:'13px' }}>Level {comment.rate} Comment</span>
                                        </div>
                                    </div>
                                    <hr style={{backgroundColor:'#696969'}}/>
                                    
                                    <br/>
                                    <MDBCardText style={{fontSize:'15px'}} className='text-muted'>
                                    {comment.comment}
                                    </MDBCardText>
                                    {((localStorage.getItem('user') == comment.user) || (localStorage.getItem('user') == writer)) && (
                                    <>
                                        <div className='row' style={{width:'15%' , float:'right'}}>
                                            <div className='col text-end' style={{cursor:'pointer'}}>
                                                <div onClick={()=>editPost(comment)}>
                                                    <MDBIcon fas icon="pen" color="muted"  style={{fontSize:'22px'}} />
                                                </div>
                                            </div>
                                            <div className='col text-end'>
                                                <div  onClick={()=>deletePost(comment)}>
                                                    <MDBIcon fas icon="trash" color="muted"  style={{fontSize:'22px'}} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    )}
                                </MDBCardBody>
                                </MDBCard>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='col-3'></div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;