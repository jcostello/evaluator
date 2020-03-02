import React, { useEffect, useState, useCallback } from "react";
import axios from "../utils/axios";

import { Row, Button, Input, message, Modal } from "antd";

import UserDrawer from "./../components/users/UserDrawer";
import UserTable from "./../components/users/UserTable";

const { confirm } = Modal;
const { Search } = Input;

const Users = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [unfilteredUsers, setUnfilteredUsers] = useState([]);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const { data: users } = await axios.get("/api/users");

      setUnfilteredUsers(users);
      setUsers(users);
    };

    loadUsers();
  }, []);

  const openUserDrawer = useCallback(() => setUserDrawerOpen(true));
  const closeUserDrawer = useCallback(dirty => {
    const dismissChanges = () => {
      setCurrentUser(null);
      setUserDrawerOpen(false);
    };

    if (dirty) {
      confirm({
        title: "Are you sure you want to dismiss the changes?",
        content: "When clicked the OK button, all changes will be dismissed",
        onOk: dismissChanges
      });
    } else {
      dismissChanges();
    }
  });

  const importUsers = async () => {
    message.loading("Importing Slack's users");

    const { data: newUsers } = await axios.post("/api/users/import");

    const { data: users } = await axios.get("/api/users");

    if (newUsers.length > 0) {
      message.success(`${users.length} new users imported`);
    } else {
      message.warning("No new users imported");
    }

    setUnfilteredUsers(users);
    setUsers(users);
  };

  const filterUsers = value => {
    let filteredUsers = unfilteredUsers;

    if (value) {
      filteredUsers = unfilteredUsers.filter(user => {
        return user.email.includes(value) || user.fullName.includes(value);
      });
    }

    setUsers(filteredUsers);
  };

  const editUser = useCallback(async values => {
    const { data: updatedUser } = await axios.patch(
      `/api/users/${currentUser.id}`,
      values
    );

    const usersState = unfilteredUsers.map(user => {
      return user.id === updatedUser.id ? updatedUser : user;
    });

    message.success("User updated successfully");

    setUnfilteredUsers(usersState);
    setUsers(usersState);
    closeUserDrawer(false);
  });

  const openEditUser = async id => {
    const { data: user } = await axios.get(`/api/users/${id}`);

    setCurrentUser(user);

    openUserDrawer();
  };

  const deleteUser = async record => {
    const { data: user } = await axios.delete(`/api/users/${record.id}`);
    const usersState = unfilteredUsers.filter(
      oldUser => oldUser.id !== user.id
    );
    message.success("Form deleted successfully");
    setUnfilteredUsers(usersState);
    setUsers(usersState);
  };

  const clearFilter = () => {
    setUsers(unfilteredUsers);
    setSearchValue("");
  };

  const onFilterChange = e => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Search
        placeholder="Name or Email"
        enterButton="Search"
        style={{ width: "300px" }}
        value={searchValue}
        onSearch={filterUsers}
        onChange={onFilterChange}
        suffix={
          <a href="#" onClick={clearFilter}>
            Clear
          </a>
        }
      />
      <Button
        id="import-slack-users"
        style={{ marginBottom: "20px", float: "right" }}
        type="primary"
        onClick={importUsers}
      >
        Import Slack Users
      </Button>
      <Row>
        <UserTable
          users={users}
          onEditClick={openEditUser}
          onDeleteConfirm={deleteUser}
        />
      </Row>

      <UserDrawer
        visible={userDrawerOpen}
        onClose={closeUserDrawer}
        user={currentUser}
        onSubmit={editUser}
      />
    </>
  );
};

export default Users;
