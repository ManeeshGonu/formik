import React from "react";
import { useFormik } from "formik";

const YoutubeForm = () => {
  const initialValues = {
    name: "Maneesh",
    email: "",
    channel: "",
  };

  const onSubmit = (values) => {
    console.log("Form Data", values);
  };

  const validate = (values) => {
    //values.name, values.email, values.channel
    //errors.name, errors.email, errors.channel

    let errors = {};

    if (!values.name) errors.name = "Required";
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }

    if (!values.channel) errors.channel = "Required";

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  // console.log("Form Values", formik.values);
  // console.log("Form Errors", formik.errors);
  console.log("Visited Fields", formik.touched);

  return (
    <form
      className="w-1/2 mx-auto min-h-screen flex flex-col justify-center items-center space-y-5"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-1/2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name ? (
          <div className="error">*{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="w-1/2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div className="error">*{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="w-1/2">
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channel}
        />
        {formik.errors.channel ? (
          <div className="error">*{formik.errors.channel}</div>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default YoutubeForm;
