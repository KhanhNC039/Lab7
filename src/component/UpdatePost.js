import React, { useEffect, useState } from "react";
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

const UpdatePost = ({ id, title, content }) => {

  const formik = useFormik({
    initialValues: {
      title: title,
      content: content,
    },
    onSubmit: (values) => {
      axios
        .put(`https://636610c1f711cb49d1081112.mockapi.io/Lab7/${id}`, {
          title: values.title,
          content: values.content
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
        content: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        name="title"
        label="Title"
        type="text"
        fullWidth
        variant="filled"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      {formik.errors.title && formik.touched.title && (
        <p>{formik.errors.title}</p>
      )}
      <TextField
        autoFocus
        multiline
        rows={6}
        margin="dense"
        name="content"
        label="Content"
        type="text"
        fullWidth
        variant="filled"
        value={formik.values.content}
        onChange={formik.handleChange}
      />
      {formik.errors.content && formik.touched.content && (
        <p>{formik.errors.content}</p>
      )}
      <Grid item pt={5}>
        <Button fullWidth variant="contained" size="large" type="submit" style={{color:'black'}}>
          U P D A T E
        </Button>
      </Grid>
    </form>
  );
};

export default UpdatePost;
