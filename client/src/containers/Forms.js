import React, { useState, useEffect, useCallback } from "react";
import axios from "../utils/axios";

import { Button, Row, message, Modal } from "antd";
import { Link } from "react-router-dom";

import FormDrawer from "./../components/forms/FormDrawer";
import FormTable from "./../components/forms/FormTable";

const { confirm } = Modal;

const Forms = () => {
  const [currentForm, setCurrentForm] = useState(null);
  const [forms, setForms] = useState([]);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);

  useEffect(() => {
    const loadForms = async () => {
      const { data: forms } = await axios.get("/api/forms");

      setForms(forms);
    };

    loadForms();
  }, []);

  const openFormDrawer = useCallback(() => setFormDrawerOpen(true));
  const closeFormDrawer = useCallback(dirty => {
    const dismissChanges = () => {
      setCurrentForm(null);
      setFormDrawerOpen(false);
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

  const createForm = useCallback(async values => {
    const { data: updatedForm } = await axios.post("/api/forms", values);

    const formsState = forms.concat(updatedForm);

    message.success("Form created successfully");
    setForms(formsState);
    closeFormDrawer(false);
  });

  const editForm = useCallback(async values => {
    const { data: updatedForm } = await axios.patch(
      `/api/forms/${currentForm.id}`,
      values
    );

    const formsState = forms.map(form => {
      return form.id === updatedForm.id ? updatedForm : form;
    });

    message.success("Form updated successfully");

    setForms(formsState);
    closeFormDrawer(false);
  });

  const openEditForm = async id => {
    const { data: form } = await axios.get(`/api/forms/${id}`);

    setCurrentForm(form);

    openFormDrawer();
  };

  const deleteForm = async record => {
    const { data: form } = await axios.delete(`/api/forms/${record.id}`);
    const formsState = forms.filter(oldForm => oldForm.id !== form.id);
    message.success("Form deleted successfully");
    setForms(formsState);
  };

  return (
    <>
      <Link to="/forms/new">
        <Button
          id="new-form"
          style={{ marginBottom: "20px" }}
          type="primary"
          onClick={openFormDrawer}
        >
          Add New Form
        </Button>
      </Link>

      <Row>
        <FormTable
          forms={forms}
          onEditClick={openEditForm}
          onDeleteConfirm={deleteForm}
        />
      </Row>

      <FormDrawer
        visible={formDrawerOpen}
        onClose={closeFormDrawer}
        form={currentForm}
        onSubmit={currentForm ? editForm : createForm}
      />
    </>
  );
};

export default Forms;
