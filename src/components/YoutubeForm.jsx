import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const YoutubeForm = () => {
  const initialValues = {
    name: "Maneesh",
    email: "",
    channel: "",
  };

  const onSubmit = (values) => {
    console.log("Form Data", values);
  };
  //   //values.name, values.email, values.channel
  //   //errors.name, errors.email, errors.channel

  //   let errors = {};

  //   if (!values.name) errors.name = "Required";
  //   if (!values.email) {
  //     errors.email = "Required";
  //   } else if (
  //     !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
  //   ) {
  //     errors.email = "Invalid email format";
  //   }

  //   if (!values.channel) errors.channel = "Required";

  //   return errors;
  // };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email format").required("Required!"),
    channel: Yup.string().required("Required!"),
  });

  // console.log("Form Values", formik.values);
  // console.log("Form Errors", formik.errors);
  // console.log("Visited Fields", formik.touched);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className="w-1/2 mx-auto min-h-screen flex flex-col justify-center items-center space-y-5"
    >
      <Form
        className="flex flex-col items-center gap-2"
      >
        <div className="w-full">
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            id="name"
            name="name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">*{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">*{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="w-full">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            id="channel"
            name="channel"
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error">*{formik.errors.channel}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
