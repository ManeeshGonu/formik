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
    if (!values.name) {
      errors.name = "Required";
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
          value={formik.values.name}
        />
      </div>
      <div className="w-1/2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      <div className="w-1/2">
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          onChange={formik.handleChange}
          value={formik.values.channel}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default YoutubeForm;
