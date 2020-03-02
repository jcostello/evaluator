import React, { useEffect, useState, useCallback } from "react";
import axios from "../utils/axios";

import { Button, Row, message, Modal } from "antd";
import { Link } from "react-router-dom";

import TeamTable from "./../components/teams/TeamTable";
import TeamDrawer from "./../components/teams/TeamDrawer";

const { confirm } = Modal;

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [teamDrawerOpen, setTeamDrawerOpen] = useState(false);

  useEffect(() => {
    const loadTeams = async () => {
      const { data: teams } = await axios.get("/api/teams");

      setTeams(teams);
    };

    loadTeams();
  }, []);

  const openTeamDrawer = useCallback(() => setTeamDrawerOpen(true));
  const closeTeamDrawer = useCallback(dirty => {
    const dismissChanges = () => {
      setCurrentTeam(null);
      setTeamDrawerOpen(false);
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

  const createTeam = useCallback(async values => {
    const { data: updatedTeam } = await axios.post("/api/teams", values);

    const teamsState = teams.concat(updatedTeam);

    message.success("Team created successfully");
    setTeams(teamsState);
    closeTeamDrawer(false);
  });

  const editTeam = useCallback(async values => {
    const { data: updatedTeam } = await axios.patch(
      `/api/teams/${currentTeam.id}`,
      values
    );

    const teamsState = teams.map(team => {
      return team.id === updatedTeam.id ? updatedTeam : team;
    });

    message.success("Team updated successfully");

    setTeams(teamsState);
    closeTeamDrawer(false);
  });

  const openEditTeam = async id => {
    const { data: team } = await axios.get(`/api/teams/${id}`);

    setCurrentTeam(team);

    openTeamDrawer();
  };

  const deleteTeam = async record => {
    const { data: team } = await axios.delete(`/api/teams/${record.id}`);
    const teamsState = teams.filter(oldTeam => oldTeam.id !== team.id);
    message.success("Team deleted successfully");
    setTeams(teamsState);
  };

  return (
    <>
      <Link to="/teams/new">
        <Button
          id="new-team"
          style={{ marginBottom: "20px" }}
          type="primary"
          onClick={openTeamDrawer}
        >
          Add New Team
        </Button>
      </Link>

      <Row>
        <TeamTable
          teams={teams}
          onEditClick={openEditTeam}
          onDeleteConfirm={deleteTeam}
        />
      </Row>

      <TeamDrawer
        visible={teamDrawerOpen}
        onClose={closeTeamDrawer}
        team={currentTeam}
        onSubmit={currentTeam ? editTeam : createTeam}
      />
    </>
  );
};

export default Teams;
