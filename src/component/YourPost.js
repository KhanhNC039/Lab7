import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardHeader,
  Collapse,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdatePost from "./UpdatePost";

const YourPost = ({ user }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
    setOpenModal(false);
  };
  const postDelete = (id, e) => {
    e.preventDefault();
    axios
      .delete(`https://636610c1f711cb49d1081112.mockapi.io/Lab7/${id}`)
      .then((res) => console.log(`Deleted!!!`, res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get(`https://636610c1f711cb49d1081112.mockapi.io/Lab7`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid container pl={10} pr={10} pt={20}>
      <Dialog onClose={handleClose} open={openDialog}>
        <DialogTitle>A R E - Y O U - S U R E !!!!!!!</DialogTitle>
        <Grid container p={2}>
          <Button
            size="large"
            color="error"
            onClick={(e) => (postDelete(modalData.id, e), setOpenDialog(false))}
          >
            YES
          </Button>
          <Button size="large" onClick={handleClose}>
            NO
          </Button>
        </Grid>
      </Dialog>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalData != null ? (
            <UpdatePost
              id={modalData.id}
              title={modalData.title}
              content={modalData.content}
            />
          ) : undefined}
        </Box>
      </Modal>
      {posts
        .filter((post) => post.authorid === user.id)
        .map((post) => (
          <Grid key={post.id} item xs={4} pr={2} pt={2} pb={2}>
            <Card>
              <Link style={{ textDecoration: "none" }} to={`/post/${post.id}`}>
                <CardHeader
                  align="left"
                  title={<Typography variant="body1">{post.author}</Typography>}
                  subheader={
                    <Typography variant="body2" color="text.secondary">
                     {post.date}
                    </Typography>
                  }
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={post.image}
                  alt="You haven't post any image yet"
                />
                <CardContent align="left">
                  <Typography variant="h5" component="div" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
              </Link>
              <CardActions>
                <Grid container>
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <MoreHorizIcon />
                      </AccordionSummary>
                      <AccordionDetails align="left">
                        <Grid container pl={4}>
                          <Grid item xs={15}>
                            <Button
                              onClick={() => {
                                setOpenModal(true);
                                setModalData(post);
                              }}
                              startIcon={<EditIcon />}
                              size="large"
                              style={{color:'black'}}
                            >
                              E D I T
                            </Button>
                            <hr />
                          </Grid>
                          <Grid item xs={15}>
                            <Button
                              startIcon={<DeleteIcon color="error" />}
                              onClick={() => {
                                setOpenDialog(true);
                                setModalData(post);
                                
                              }}
                              size="large"
                              style={{color:'black  '}}
                            >
                              D E L E T E
                            </Button>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default YourPost;