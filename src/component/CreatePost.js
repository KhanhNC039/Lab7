import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { CheckboxWithLabel } from "formik-material-ui";
import axios from "axios";

const CreatePost = ({ user }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState("");
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "yzd58rhe");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/diwf1mkhu/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
  };

  const formik = useFormik({
    initialValues: {
      author: "",
      authorid:"",
      title: "",
      content: "",
      image: "",
      date: date,
    },
    onSubmit: async (values, { resetForm }) => {
      axios
        .post("https://636610c1f711cb49d1081112.mockapi.io/Lab7", {
          title: values.title,
          author: values.author,
          authorid: values.authorid,
          content: values.content,
          date: values.date,
          image,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      resetForm();
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("PLEASE ENTER YOUR TITLE")
        .min(2, "Must be 2 characters or more"),
      content: Yup.string()
        .required("PLEASE ENTER YOUR CONTENT")
        .min(2, "Must be 2 characters or more"),
    }),
  });
  return (
    <Grid
      container
      pt={10}
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{ minWidth: 800 }}>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container columnSpacing={10}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  name="author"
                  label="A U T H O R"
                  type="text"
                  variant="filled"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  margin="dense"
                  name="date"
                  label="D A T E"
                  type="text"
                  variant="filled"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="T I T L E"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && (
              <p style={{color:'red'}}>{formik.errors.title}</p>
            )}
            <TextField
              margin="dense"
              multiline
              rows={6}
              name="content"
              label="C O N T E N T"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.content}
              onChange={formik.handleChange}
            />
            {formik.errors.content && formik.touched.content && (
              <p style={{color:'red'}}>{formik.errors.content}</p>
            )}
            <Grid item>
              {image && (
                <div>
                  <img alt="Not have found" width={"400px"} src={image} />
                  <br />
                </div>
              )}
              <br />

              <Button
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
                size="small"
              >
                 C H O O S E -- P I C T U R E
                <input
                  accept="image/*"
                  name="image"
                  type="file"
                  hidden
                  onChange={uploadImage}
                />
              </Button>
            </Grid>
            <Grid item pt={5}>
              <Button fullWidth variant="contained" size="small" type="submit">
                Post
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CreatePost;