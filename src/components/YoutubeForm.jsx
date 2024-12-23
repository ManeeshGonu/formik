import React from "react";
import { useFormik } from "formik";

const YoutubeForm = () => {
  const formik = useFormik({});
  return (
    <form className="w-1/2 mx-auto min-h-screen flex flex-col justify-center items-center space-y-5">
      <div className="w-1/2">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="w-1/2">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className="w-1/2">
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default YoutubeForm;
