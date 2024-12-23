import React from "react";
import { useFormik } from "formik";

const YoutubeForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "Maneesh",
      email: "",
      channel: "",
    },
  });

  console.log("Form Values", formik.values);

  return (
    <form className="w-1/2 mx-auto min-h-screen flex flex-col justify-center items-center space-y-5">
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
