import React, { useState, useEffect, useRef, useCallback } from "react";
import { Formik } from "formik";
import { Drawer, Icon } from "antd";
import { Form, Input, SubmitButton } from "formik-antd";
import * as Yup from "yup";
import { Table, Avatar, AutoComplete } from "antd";
import axios from "./../../utils/axios";
import { debounce } from "lodash";

const { Column } = Table;
const { Option } = AutoComplete;

const UserDrawer = ({ user, visible, onClose, onSubmit }) => {
  const [users, setUsers] = useState([]);

  const initialValues = {
    fullName: "",
    email: "",
    ...user
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email()
      .required("Email is required")
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
        {({ dirty }) => (
          <Drawer
            title="Edit User"
            width="720"
            visible={visible}
            onClose={() => onClose(dirty)}
          >
            <Form>
              <Form.Item name="fullName" label="Full Name">
                <Input name="fullName" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input name="email" />
              </Form.Item>

              <Form.Item name="submit">
                <SubmitButton
                  id="submit"
                  type="primary"
                  style={{ float: "right", marginTop: "20px" }}
                >
                  Submit Team
                </SubmitButton>
              </Form.Item>
            </Form>
          </Drawer>
        )}
      </Formik>
    </div>
  );
};

export default UserDrawer;
