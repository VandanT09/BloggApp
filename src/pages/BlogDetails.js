import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom' 
import {useNavigate} from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast'

const BlogDetails = () => {
     const [blog,setBlog] = useState({})
     const id = useParams().id
     const navigate = useNavigate();
     const [inputs,setInputs] = useState({});
     const getBlogDetails = async ()=> {
          try{
               const {data} = await axios.get(`/api/v1/blog/get-blog/${id}`)
               if(data?.success){
                    setBlog(data?.blog);
                    setInputs({
                         title:data?.blog.title,
                         description: data?.blog.description,
                         image:data?.blog.image,
                    });
               }
          } catch(error){
               console.log(error)
          }
     }

     useEffect(()=> {
          getBlogDetails();
     },[id]);
     
     const handleChange = (e) => {
          setInputs(prevState => ({
               ...prevState,
               [e.target.name]: e.target.value
          }))
     }

     const handleSubmit = async(e) => {
          e.preventDefault();
          try{
               const {data} = await axios.put(`/api/v1/blog/update-blog/${id}`,{
                    title:inputs.title,
                    description:inputs.description,
                    image:inputs.image,
                    user: id,
               })
               if(data?.success){
                    toast.success('Blog Updated')
                    navigate('/my-blogs')
               }
          } catch(error){
               console.log(error)
          }
     };
     console.log(blog);
  return (
    <>
      <form onSubmit={handleSubmit}>
          <Box border={3} width={'50%'} borderRadius={10} padding={3} margin="auto" boxShadow={'10px 10px 20px #ccc'} display="flex" flexDirection="column" marginTop="30px">
               <Typography variant='h2' textAlign={"center"} fontWeight={"bold"} padding={3} color={"grey"}>Create a post</Typography>
               <InputLabel sx={{mb:1, mt:2, fontSize: "24px", fontWeight: "bold"}}>Title</InputLabel>
               <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined" required />

               <InputLabel sx={{mb:1, mt:2, fontSize: "24px", fontWeight: "bold"}}>Description</InputLabel>
               <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined" required />

               <InputLabel sx={{mb:1, mt:2, fontSize: "24px", fontWeight: "bold"}}>Image URL</InputLabel>
               <TextField name="image" value={inputs.image} onChange={handleChange} margin="normal" variant="outlined" required />

               <Button type="submit" color="warning" variant="contained">Update</Button>
          </Box>
     </form>
    </>
  )
}

export default BlogDetails
