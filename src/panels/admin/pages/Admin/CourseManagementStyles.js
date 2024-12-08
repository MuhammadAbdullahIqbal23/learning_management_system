import styled, { createGlobalStyle } from 'styled-components';

// Global Styles
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f4f6f9;
    line-height: 1.6;
  }

  * {
    box-sizing: border-box;
  }
`;

// Responsive Page Container
export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #e9f0f9 0%, #d6e2f0 100%);
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

// Responsive Course Management Card
export const CourseManagementCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

// Responsive Page Header
export const PageHeader = styled.div`
  background-color: #3b82f6;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1rem;
  }
`;

// Responsive Header Title
export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;

    @media (max-width: 480px) {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// Responsive Add Course Button
export const AddCourseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #3b82f6;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

// Responsive Course Table
export const CourseTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background-color: #f3f4f6;
    color: #374151;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9fafb;
    }
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tbody, tr, td {
      display: block;
      width: 100%;
    }

    tr {
      margin-bottom: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      padding: 0.75rem 1rem;

      &:before {
        content: attr(data-label);
        font-weight: bold;
        margin-right: 1rem;
      }

      &:last-child {
        justify-content: center;
        gap: 1rem;
      }
    }
  }
`;

// Responsive Instructor Badge
export const InstructorBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background-color: #e0f2fe; 
  color: #0c4a6e;

  @media (max-width: 480px) {
    font-size: 0.675rem;
    padding: 0.2rem 0.5rem;
  }
`;

// Responsive Action Buttons
export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.color || '#3b82f6'};
  transition: color 0.3s ease;
  margin-right: 0.5rem;

  &:hover {
    color: ${props => props.hoverColor || '#2563eb'};
  }

  @media (max-width: 480px) {
    margin-right: 0.25rem;
  }
`;

// Responsive Modal
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

// Responsive Modal Content
export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 1.5rem;
    border-radius: 12px;
    width: 95%;
    max-height: 95vh;
  }
`;

// Responsive Close Button
export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;

  @media (max-width: 480px) {
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.25rem;
  }
`;

// Responsive Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }

  textarea {
    min-height: 100px;
  }

  @media (max-width: 480px) {
    input, textarea, select {
      padding: 0.5rem;
    }

    textarea {
      min-height: 80px;
    }
  }
`;

// Responsive Form Actions
export const FormActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

// Responsive Submit Button
export const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem 1rem;
  }
`;

// Responsive Cancel Button
export const CancelButton = styled.button`
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e5e7eb;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem 1rem;
  }
`;