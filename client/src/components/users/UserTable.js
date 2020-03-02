import React from "react";

import { Table, Icon, Popconfirm, Avatar } from "antd";

const { Column } = Table;

const UserTable = ({ users, onEditClick, onDeleteConfirm }) => {
  return (
    <Table dataSource={users} rowKey="id" id="user-list">
      <Column
        key="avatarUrl"
        dataIndex="avatarUrl"
        width="50px"
        render={avatarUrl => <Avatar src={avatarUrl} />}
      />

      <Column
        title="Full Name"
        key="fullName"
        dataIndex="fullName"
        render={(text, record) => (
          <a href="#" onClick={() => onEditClick(record.id)}>
            {text}
          </a>
        )}
      />
      <Column title="Email" key="email" dataIndex="email" />

      <Column
        title="Action"
        key="action"
        width="100px"
        render={(_text, record) => (
          <span>
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => onDeleteConfirm(record)}
              okText="Yes"
            >
              <a id="delete" href="/" style={{ fontSize: "16px" }}>
                <Icon type="delete" />
              </a>
            </Popconfirm>
          </span>
        )}
      />
    </Table>
  );
};

export default UserTable;
