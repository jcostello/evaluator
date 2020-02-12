import React from "react";

import { Table, Icon, Popconfirm } from "antd";

const { Column } = Table;

const FormTable = ({ forms, onEditClick, onDeleteConfirm }) => {
  return (
    <Table dataSource={forms} rowKey="id" id="form-list">
      <Column
        title="Name"
        key="name"
        dataIndex="name"
        render={name => <a href="/">{name}</a>}
      />

      <Column
        title="Action"
        key="action"
        width="100px"
        render={(_text, record) => (
          <span>
            <Popconfirm
              title="Are you sure you want to delete this form?"
              onConfirm={() => onDeleteConfirm(record)}
              okText="Yes"
            >
              <a id="delete" href="/" style={{ fontSize: "16px" }}>
                <Icon type="delete" />
              </a>
            </Popconfirm>
            <a
              href="#"
              id="edit"
              style={{ fontSize: "16px", paddingLeft: "15px" }}
              onClick={() => onEditClick(record.id)}
            >
              <Icon type="edit" />
            </a>
          </span>
        )}
      />
    </Table>
  );
};

export default FormTable;
