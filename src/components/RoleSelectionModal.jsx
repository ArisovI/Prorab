import React from 'react';
import './styles/RoleSelectionModal.css'

const RoleSelectionModal = ({ onClose, onSelectRole }) => {
  const handleRoleSelect = (role) => {
    onSelectRole(role);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Your Role</h2>
        <button onClick={() => handleRoleSelect('manager')}>Manager</button>
        <button onClick={() => handleRoleSelect('worker')}>Worker</button>
        <button onClick={() => handleRoleSelect('user')}>User</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
