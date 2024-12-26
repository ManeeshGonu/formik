import React from "react";
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

  const onSubmit = (values) => {
    console.log("Form Data", values);
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
    <div className="w-1/2 mx-auto min-h-screen flex flex-col justify-center items-center space-y-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        // validateOnBlur={false}
      >
        <Form className="flex flex-col items-center gap-2 w-1/2">
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
                console.log("Form errors", form.errors);
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

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default YoutubeForm;
