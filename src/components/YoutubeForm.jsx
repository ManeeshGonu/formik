import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const YoutubeForm = () => {
  const [formData, setFormData] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
  };

  const savedData = {
    name: "Maneesh",
    email: "gonumaneesh@gmail.com",
    channel: "ManeeshGonu",
    comments: "Welcome to channel",
    address: "Tenali, Andhra Pradesh",
    social: {
      facebook: "Maneesh Gonu",
      twitter: "ManeeshGonu04",
    },
    phoneNumbers: ["8790579282", "9515961667"],
    phNumbers: ["9999999999"],
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form Data", values);
    onSubmitProps.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email format").required("Required!"),
    channel: Yup.string().required("Required!"),
    address: Yup.string().required("Required!"),
    social: Yup.object({
      facebook: Yup.string().required("Required!"),
      twitter: Yup.string().required("Required!"),
    }),
    phoneNumbers: Yup.array()
      .of(Yup.string().required("Required!"))
      .required("Phone numbers are required!")
      .min(2, "You must provide both primary and secondary phone numbers."),
  });

  const validateComment = (value) => {
    let error;
    if (!value) {
      error = "Required";
    }

    return error;
  };

  // console.log("Form Values", formik.values);
  // console.log("Form Errors", formik.errors);
  // console.log("Visited Fields", formik.touched);

  return (
    <div className="mx-auto min-h-screen flex flex-col justify-center items-center space-y-5">
      <Formik
        initialValues={formData || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
        // validateOnMount
      >
        {(formik) => {
          console.log("formik props", formik);
          return (
            <Form className="grid grid-cols-3 gap-4">
              <div className="w-full">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component={TextError} />
              </div>
              <div className="w-full">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component={TextError} />
              </div>
              <div className="w-full">
                <label htmlFor="channel">Channel</label>
                <Field
                  type="text"
                  id="channel"
                  name="channel"
                  placeholder="Channel name"
                />
                <ErrorMessage name="channel" component={TextError} />
              </div>
              <div className="w-full">
                <label htmlFor="comments">Comments</label>
                <Field
                  as="textarea"
                  id="comments"
                  name="comments"
                  placeholder="comments"
                  validate={validateComment}
                />
                <ErrorMessage name="comments" component={TextError} />
              </div>

              <div className="w-full">
                <FastField name="address">
                  {(props) => {
                    console.log("Field Render");
                    const { field, form, meta } = props;
                    return (
                      <div>
                        <label htmlFor="address">Address</label>
                        <input id="address" {...field} />
                        {meta.touched && meta.error ? (
                          <div className="error">{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </FastField>
              </div>
              <div className="w-full">
                <label htmlFor="facebook">Facebook</label>
                <Field
                  type="text"
                  id="facebook"
                  name="social.facebook"
                  placeholder="Facebook Id"
                />
                <ErrorMessage name="social.facebook" component={TextError} />
              </div>
              <div className="w-full">
                <label htmlFor="twitter">Twitter</label>
                <Field
                  type="text"
                  id="twitter"
                  name="social.twitter"
                  placeholder="Twitter Id"
                />
                <ErrorMessage name="social.twitter" component={TextError} />
              </div>
              <div className="w-full">
                <label htmlFor="primaryPh">Primary Phone</label>
                <Field
                  type="text"
                  id="primaryPh"
                  name="phoneNumbers[0]"
                  placeholder="Primary Phone Number"
                />
                <ErrorMessage name="phoneNumbers[0]" component={TextError} />
              </div>
              <div className="w-full">
                <label htmlFor="secondaryPh">Secondary Phone</label>
                <Field
                  type="text"
                  id="secondaryPh"
                  name="phoneNumbers[1]"
                  placeholder="Secondary Phone Number"
                />
                <ErrorMessage name="phoneNumbers[1]" component={TextError} />
              </div>
              <div className="w-full">
                <label htmlFor="phNumbers">List of Phone Numbers</label>
                <FieldArray name="phNumbers">
                  {(fieldArrayProps) => {
                    const { form, push, remove } = fieldArrayProps;
                    const { values } = form;
                    const { phNumbers } = values;
                    // console.log("Form errors", form.errors);
                    return (
                      <div className="flex flex-col gap-4">
                        {phNumbers.map((each, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <Field name={`phNumbers[${index}]`} />
                            {index > 0 && (
                              <button
                                type="button"
                                className="mt-0"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                            <button
                              type="button"
                              className="mt-0"
                              onClick={() => push("")}
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              <div className="col-span-3 flex flex-col justify-center items-center">
                <div>
                  <button
                    type="button"
                    className="mr-2"
                    onClick={() => formik.setFieldTouched("comments")}
                  >
                    Visit Comments
                  </button>
                  <button
                    type="button"
                    onClick={() => formik.validateField("comments")}
                  >
                    Validate Comments
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="mr-2"
                    onClick={() =>
                      formik.setTouched({
                        name: true,
                        email: true,
                        channel: true,
                        comments: true,
                      })
                    }
                  >
                    Visit All
                  </button>
                  <button type="button" onClick={() => formik.validateForm()}>
                    Validate All
                  </button>
                </div>

                <button type="button" onClick={() => setFormData(savedData)}>
                  Load Saved Data
                </button>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className={`${
                    !formik.isValid || formik.isSubmitting ? "bg-gray-400" : ""
                  } `}
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default YoutubeForm;
