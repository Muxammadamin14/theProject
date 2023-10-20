// Edit.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function Edit({ contactToEdit }) {
  const [firstName, setFirstName] = useState(contactToEdit?.firstName || '');
  const [lastName, setLastName] = useState(contactToEdit?.lastName || '');
  const [gender, setGender] = useState(contactToEdit?.gender || '');
  const dispatch = useDispatch();

  const resetForm = () => {
    setFirstName(contactToEdit?.firstName || '');
    setLastName(contactToEdit?.lastName || '');
    setGender(contactToEdit?.gender || '');
  };

  const saveContact = () => {
    const updatedContact = {
      id: contactToEdit?.id,
      firstName,
      lastName,
      gender,
    };

    dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
    resetForm();
  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Contact
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveContact}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
