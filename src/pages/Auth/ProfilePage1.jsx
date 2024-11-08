import { Formik, Form, Field } from "formik";

const ProfilePage1 = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
    <Formik
      initialValues={{ firstName: "", lastName: "", mobileNumber: "", dob: "" }}
      onSubmit={(values) => console.log(values)} // Replace with API call
    >
      {() => (
        <Form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Field name="firstName" placeholder="First Name" className="mb-4" />
          <Field name="lastName" placeholder="Last Name" className="mb-4" />
          <Field
            name="mobileNumber"
            placeholder="Mobile Number"
            className="mb-4"
          />
          <Field name="dob" placeholder="Date of Birth" className="mb-4" />
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-2 rounded"
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ProfilePage1;
