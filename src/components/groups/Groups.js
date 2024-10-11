import React, { useEffect, useState } from 'react';
import { Table, Button, Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useGroup } from '../../hooks/Groups/useGroups';
import { useCreateGroup } from '../../hooks/Groups/useCreateGroup';
import { useUpdateGroup } from '../../hooks/Groups/useUpdateGroup';


const initialGroupsData = [
  {
    avatar: user1,
    name: "Frontend Developers",
    description: "Responsible for UI/UX",
    duration: "6 months",
    status: "Active",
  },
  {
    avatar: user2,
    name: "Backend Engineers",
    description: "Handles server-side logic",
    duration: "12 months",
    status: "Active",
  },
  {
    avatar: user3,
    name: "QA Team",
    description: "Testing and Quality Assurance",
    duration: "3 months",
    status: "Inactive",
  },
  {
    avatar: user4,
    name: "DevOps",
    description: "Infrastructure automation",
    duration: "9 months",
    status: "Active",
  },
  {
    avatar: user5,
    name: "Design Team",
    description: "Handles product design",
    duration: "8 months",
    status: "Active",
  },
];

const Groups = () => {
  const [groups, setGroups] = useState(initialGroupsData);
  const [newGroup, setNewGroup] = useState({ name: '', description: '', duration: '', status: 'Active' });
  const [editIndex, setEditIndex] = useState(null);  // To track editing group index
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {createGroup} = useCreateGroup();
  const {UpdateGroup} = useUpdateGroup();

  const {group, loading} = useGroup();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prevGroup) => ({ ...prevGroup, [name]: value }));
  };

  // Add or edit group
  const saveGroup = () => {
    if (newGroup.name && newGroup.description && newGroup.duration && newGroup.status) {
      if (editIndex !== null) {
        // Update existing group
        const updatedGroups = [...group];
        updatedGroups[editIndex] = newGroup;
        setGroups(updatedGroups);
        UpdateGroup(newGroup.name, newGroup.description, newGroup.duration, newGroup.status.toLowerCase(), newGroup._id);
      } else {
        setGroups((prevGroups) => [...prevGroups, newGroup]);
        createGroup(newGroup.name, newGroup.description, newGroup.duration, newGroup.status.toLowerCase());
      }
      setNewGroup({ name: '', description: '', duration: '', status: 'Active' });
      setEditIndex(null);  // Reset edit index
      toggleModal();
    } else {
      alert('Please fill all fields');
    }
  };


  // Open modal for editing an existing group
  const editGroup = (index) => {
    setEditIndex(index);
    setNewGroup(group[index]);
    toggleModal();
  };

  return (
    <div>
      <Card>
        <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <CardTitle tag="h5">Groups </CardTitle>
            </div>
            <Button
                color="primary"
                className="ms-auto"
                onClick={() => {
                setEditIndex(null);
                toggleModal();
                }}
            >
                Add Group
            </Button>
            </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr className="bg-primary text-white">
                <th>Group</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {group.map((group, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className=" py-2">
                      {/* <img
                        src={group.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      /> */}
                      <div className="">
                        <h6 className="mb-0">{group.name}</h6>
                        <span className="text-muted">{group.description}</span>
                      </div>
                    </div>
                  </td>
                  {/* <td>{group.name}</td> */}
                  {/* <td>{group.description}</td> */}
                  <td>{group.duration} months</td>
                  <td>
                    {group.status === "active" ? (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    <Button color="warning" size="sm" className="me-2" onClick={() => editGroup(index)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal for adding/editing a group */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{editIndex !== null ? 'Edit Group' : 'Add New Group'}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Group Name</Label>
            <Input
              type="text"
              name="name"
              value={newGroup.name}
              onChange={handleInputChange}
              placeholder="Enter group name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={newGroup.description}
              onChange={handleInputChange}
              placeholder="Enter group description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="duration">Duration</Label>
            <Input
              type="text"
              name="duration"
              value={newGroup.duration}
              onChange={handleInputChange}
              placeholder="Enter duration"
            />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              value={newGroup.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveGroup}>
            {editIndex !== null ? 'Update Group' : 'Add Group'}
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Groups;
