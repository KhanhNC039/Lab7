import React, { useEffect, useState } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import axios from "axios";
import { useParams } from 'react-router-dom';
function Post() {
    const [post, setPost] = useState([]);

    let { id } = useParams();

    useEffect(() => {
      axios
        .get(`https://636610c1f711cb49d1081112.mockapi.io/Lab7/${id}`)
        .then((res) => {
          console.log(res);
          setPost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return (
        <div className="post">
            <img className="postImg" src={post.image}/>
            <h1 className="postAuthor">{post.author}</h1>
            <p className="postContent">{post.content}</p>
      </div>
    );
}

export default Post
