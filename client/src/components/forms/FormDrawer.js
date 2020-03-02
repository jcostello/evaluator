import React from "react";
import { Formik, FieldArray } from "formik";
import { Button, Drawer } from "antd";
import { Form, Input, SubmitButton } from "formik-antd";
import * as Yup from "yup";

import QuestionFields from "./QuestionFields";

const FormDrawer = ({ form, visible, onClose, onSubmit }) => {
  const initialQuestion = {
    question: "",
    questionType: "",
    answers: [""],
    comments: false,
    optional: false
  };

  const initialValues = {
    name: "",
    questions: [initialQuestion],
    ...form
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        questionType: Yup.string().required("Question Type is required"),
        answers: Yup.array().when("questionType", {
          is: "multiple",
          then: Yup.array().of(Yup.string().required("Answer required"))
        })
      })
    )
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ values, dirty, resetForm }) => (
          <Drawer
            title={form ? "Edit form" : "Create new Form"}
            width="720"
            visible={visible}
            onClose={() => onClose(dirty)}
          >
            <Form>
              <Form.Item name="name" label="Name">
                <Input name="name" />
              </Form.Item>

              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div>
                    {values.questions.map((question, index) => (
                      <QuestionFields
                        key={index}
                        index={index}
                        questionsLength={values.questions.length}
                        values={values.questions[index]}
                        remove={remove}
                      />
                    ))}

                    <Form.Item name="submit">
                      <Button
                        type="primary"
                        onClick={() => {
                          push(initialQuestion);
                        }}
                      >
                        Add Question
                      </Button>
                      <SubmitButton
                        id="submit"
                        type="primary"
                        style={{ float: "right" }}
                      >
                        Submit Form
                      </SubmitButton>
                    </Form.Item>
                  </div>
                )}
              </FieldArray>
            </Form>
          </Drawer>
        )}
      </Formik>
    </div>
  );
};

export default FormDrawer;
