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

const useDebouncedCallback = (callback, delay) => {
  const callbackRef = useRef();
  callbackRef.current = callback;
  return useCallback(
    debounce((...args) => callbackRef.current(...args), delay),
    []
  );
};

const TeamDrawer = ({ team, visible, onClose, onSubmit }) => {
  const [value, setValue] = useState("");
  const [members, setMembers] = useState([]);
  const [memberChange, setMemberChanged] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (team) {
      setMembers(team.members);
    }
  }, [team]);

  const initialValues = {
    name: "",
    members: [null],
    ...team
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required")
  });

  const children = users.map(user => (
    <Option key={user.id} value={user.id}>
      <Avatar src={user.avatarUrl} style={{ marginRight: "10px" }} />
      <span>{user.fullName}</span>
    </Option>
  ));

  const onSelect = value => {
    const user = users.find(user => user.id === value);

    if (user) {
      const newMembersState = members.concat(user);
      const newUsersState = users.filter(stateUser => stateUser.id !== user.id);

      setMembers(newMembersState);
      setUsers(newUsersState);
      setMemberChanged(true);
      setValue("");
    }
  };

  const removeMember = id => {
    const user = members.find(user => user.id === id);
    const newMembersState = members.filter(member => member.id !== id);
    const newUsersState = users.concat(user);

    setMembers(newMembersState);
    setMemberChanged(true);
    setUsers(newUsersState);
  };

  const onSearch = useDebouncedCallback(async value => {
    if (openAutocomplete()) {
      const { data: users } = await axios.get("/api/users/find", {
        params: { query: value }
      });

      const filteredUsers = users.filter(
        user => !members.map(member => member.id).includes(user.id)
      );

      setUsers(filteredUsers);
    }
  }, 200);

  const onChange = value => {
    setValue(value);
  };

  const localOnSubmit = values => {
    const newValues = { ...values, members: members.map(user => user.id) };

    onSubmit(newValues);
  };

  const openAutocomplete = () => {
    return value.length >= 3;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={localOnSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ dirty }) => (
          <Drawer
            title={team ? "Edit team" : "Create new team"}
            width="720"
            visible={visible}
            onClose={() => onClose(dirty || memberChange)}
          >
            <Form>
              <Form.Item name="name" label="Name">
                <Input name="name" />
              </Form.Item>

              <Form.Item
                name="members"
                validate={() => {
                  if (members.length === 0) {
                    return "The team has to have at least one member";
                  }
                }}
              >
                <AutoComplete
                  onSelect={onSelect}
                  onSearch={onSearch}
                  onChange={onChange}
                  value={value}
                  notFoundContent="No results found"
                  placeholder="Search for members to add"
                  open={openAutocomplete()}
                >
                  {children}
                </AutoComplete>
              </Form.Item>

              <Table
                dataSource={members}
                rowKey="id"
                showHeader={false}
                id="member-list"
              >
                <Column
                  key="avatarUrl"
                  dataIndex="avatarUrl"
                  width="50px"
                  render={avatarUrl => <Avatar src={avatarUrl} />}
                />
                <Column key="fullName" dataIndex="fullName" />
                <Column
                  key="actions"
                  width="50px"
                  render={resource => (
                    <a
                      id="delete"
                      href="#"
                      style={{ fontSize: "16px" }}
                      onClick={() => removeMember(resource.id)}
                    >
                      <Icon type="delete" />
                    </a>
                  )}
                />
              </Table>

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

export default TeamDrawer;
