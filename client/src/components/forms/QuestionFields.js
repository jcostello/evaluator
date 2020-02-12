import React from "react";

import { FieldArray } from "formik";
import { Col, Divider, Icon, Button } from "antd";
import { Input, Select, Switch, Form } from "formik-antd";

const { Option } = Select;

const QuestionFields = ({ index, values, questionsLength, remove }) => {
  const formItemLayout = {
    labelCol: { span: 3, style: { textAlign: "left" } },
    wrapperCol: { span: 14 }
  };

  return (
    <div>
      <Divider />

      <Col>
        <Form.Item
          name={`questions.${index}.question`}
          label={
            <span>
              Question #{index + 1}
              {questionsLength > 1 ? (
                <Icon
                  type="delete"
                  theme="twoTone"
                  style={{
                    float: "right",
                    fontSize: "20px",
                    marginTop: "9px"
                  }}
                  onClick={() => remove(index)}
                />
              ) : null}
            </span>
          }
        >
          <Input name={`questions.${index}.question`} />
        </Form.Item>
        <Form.Item
          name={`questions.${index}.questionType`}
          label="Question Type"
        >
          <Select
            name={`questions.${index}.questionType`}
            dropdownClassName="questionType"
            placeholder="Select a question type"
          >
            <Option value="text">Text Answer</Option>
            <Option value="rate">Ratting Answer</Option>
            <Option value="multiple">Multiple Answer</Option>
          </Select>
        </Form.Item>

        {values.questionType === "multiple" ? (
          <Col offset={1}>
            <FieldArray name={`questions.${index}.answers`}>
              {({ push: pushAnswer, remove: removeAnswer }) => (
                <div>
                  {values.answers.map((answer, answerIndex) => (
                    <Form.Item
                      key={answerIndex}
                      name={`questions.${index}.answers.${answerIndex}`}
                      label={
                        <span>
                          Answer #{answerIndex + 1}
                          {values.answers.length > 1 ? (
                            <Icon
                              type="delete"
                              theme="twoTone"
                              style={{
                                float: "right",
                                fontSize: "20px",
                                marginTop: "9px"
                              }}
                              onClick={() => removeAnswer(answerIndex)}
                            />
                          ) : null}
                        </span>
                      }
                    >
                      <Input
                        name={`questions.${index}.answers.${answerIndex}`}
                      />
                    </Form.Item>
                  ))}
                  <Button
                    type="primary"
                    style={{ marginBottom: "40px" }}
                    onClick={() => {
                      pushAnswer("");
                    }}
                  >
                    Add Answer
                  </Button>
                </div>
              )}
            </FieldArray>
          </Col>
        ) : null}

        <Form.Item
          name={`questions.${index}.comments`}
          label="Comments"
          {...formItemLayout}
        >
          <Switch name={`questions.${index}.comments`} />
        </Form.Item>
        <Form.Item
          name={`questions.${index}.optional`}
          label="Optional"
          {...formItemLayout}
        >
          <Switch name={`questions.${index}.optional`} />
        </Form.Item>
      </Col>
    </div>
  );
};

export default QuestionFields;
