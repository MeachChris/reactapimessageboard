import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from "yup";

const schema = yup.object().shape({
  msgText: yup
    .string()
    .trim()
    .min(2, 'Your message must be at least ${min} characters.')
    .max(30, 'Your message must be no more than ${max} characters')
    .required('A message is required.')
});

const NewMessageForm = ({ addNewMessage }) => {
  
  const handleFormData = ( values, { resetForm, setSubmitting }) => {
      /* addNewMessage(values)
     * This is a function that needs to be passed to 
     * this Component and implemented in the Parent.
     * values will contain the data this Component 
     * collected from the Form and will be passed to
     * the Parent Component via this function.
     */
    addNewMessage(values);
    // reset the Form to prevent a double submit
    resetForm();
    // sets isSubmitting to false to finish submission
    setSubmitting(false);
  }
  
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Add a Message:</Card.Title>
        <Formik
          validationSchema={schema}
          onSubmit={handleFormData}
          initialValues={{ msgText: '' }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="align-items-center">
                <Form.Group as={Col} md={9} controlId="msgText">
                  <Form.Label>Enter Message:</Form.Label>
                  <Form.Control
                    placeholder="Your message"
                    value={values.msgText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.msgText && !errors.msgText}
                    isInvalid={touched.msgText && errors.msgText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.messageText}
                  </Form.Control.Feedback>
                </Form.Group>
                <Col>
                  <Button variant="primary" type="submit" className="mt-3">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}

export default NewMessageForm;
