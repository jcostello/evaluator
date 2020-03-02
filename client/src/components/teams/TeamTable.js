import React from "react";

import { Table, Icon, Popconfirm } from "antd";

const { Column } = Table;

const TeamTable = ({ teams, onEditClick, onDeleteConfirm }) => {
  return (
    <Table dataSource={teams} rowKey="id" id="team-list">
      <Column
        title="Name"
        key="name"
        dataIndex="name"
        render={(text, record) => (
          <a href="#" onClick={() => onEditClick(record.id)}>
            {text}
          </a>
        )}
      />

      <Column
        title="Members"
        key="members"
        dataIndex="members"
        render={members => <span>{members.length}</span>}
      />

      <Column
        title="Action"
        key="action"
        width="100px"
        render={(_text, record) => (
          <span>
            <Popconfirm
              title="Are you sure you want to delete this team?"
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

export default TeamTable;
