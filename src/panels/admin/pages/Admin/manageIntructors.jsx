import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User as InstructorIcon, Edit, Trash2, PlusCircle } from 'lucide-react';

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f4f6f9;
  }
`;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0e9f9 0%, #f0d6e2 100%);
  padding: 2rem;
  box-sizing: border-box;
`;

const ManagementCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const PageHeader = styled.div`
  background-color: #8b5cf6;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
  }
`;

const AddInstructorButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #8b5cf6;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #f3f4f6;
    color: #374151;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  tbody tr:hover {
    background-color: #f9fafb;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ color }) => color || '#8b5cf6'};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ hoverColor }) => hoverColor || '#7c3aed'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;

    &:focus {
      border-color: #8b5cf6;
      outline: none;
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #8b5cf6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;

  &:hover {
    background-color: #7c3aed;
  }
`;

const CancelButton = styled.button`
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;

  &:hover {
    background-color: #e5e7eb;
  }
`;

// Main Component
const ManageInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState({ name: '', _id: null });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token');
  const handleTokenError = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchInstructors = async () => {
    try {
      const token = getToken();
      if (!token) return handleTokenError();

      const { data } = await axios.get('http://localhost:5002/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredInstructors = data.users.filter((user) => user.role === 'instructor');
      setInstructors(filteredInstructors);
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading instructors');
      if (err.response?.status === 401) handleTokenError();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      handleTokenError();
      return;
    }
  
    try {
      const payload = { name: currentInstructor.name }; // Only send name
      if (isEditing) {
        const response = await axios.put(`http://localhost:5002/api/instructors/${currentInstructor._id}`, payload, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        setInstructors(instructors.map((inst) => (inst._id === currentInstructor._id ? response.data.instructor : inst)));
      } else {
        const response = await axios.post('http://localhost:5002/api/instructors', payload, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        setInstructors([...instructors, response.data.instructor]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) handleTokenError();
      else alert(err.response?.data?.message || 'Error saving instructor');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <ManagementCard>
          <PageHeader>
            <HeaderTitle>
              <InstructorIcon size={32} />
              <h1>Instructor Management</h1>
            </HeaderTitle>
            <AddInstructorButton onClick={() => setIsModalOpen(true)}>
              <PlusCircle size={18} />
              Add New Instructor
            </AddInstructorButton>
          </PageHeader>
          <DataTable>
          <thead>
  <tr>
    <th>Name</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {instructors.map((inst) => (
    <tr key={inst._id}>
      <td>{inst.name}</td>
      <td>
        <ActionButton onClick={() => {
          setCurrentInstructor(inst);
          setIsEditing(true);
          setIsModalOpen(true);
        }}>
          <Edit />
        </ActionButton>
        <ActionButton
          onClick={async () => {
            const confirm = window.confirm('Are you sure you want to delete this instructor?');
            if (!confirm) return;
            try {
              const token = getToken();
              await axios.delete(`http://localhost:5002/api/instructors/${inst._id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setInstructors(instructors.filter((i) => i._id !== inst._id));
            } catch (err) {
              console.error(err);
              if (err.response?.status === 401) handleTokenError();
              else alert(err.response?.data?.message || 'Error deleting instructor');
            }
          }}
          color="red"
          hoverColor="darkred"
        >
          <Trash2 />
        </ActionButton>
      </td>
    </tr>
  ))}
</tbody>

          </DataTable>
        </ManagementCard>
      </PageContainer>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
            <h2>{isEditing ? 'Edit Instructor' : 'Add New Instructor'}</h2>
            <Form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                value={currentInstructor.name}
                onChange={(e) => setCurrentInstructor({ ...currentInstructor, name: e.target.value })}
                required
              />
              <FormActions>
                <SubmitButton type="submit">{isEditing ? 'Update' : 'Add'}</SubmitButton>
                <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
              </FormActions>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ManageInstructors;
