// Home.js
import { useSelector, useDispatch } from 'react-redux';
import Add from './Add';
import Edit from './Edit';

function Home() {
  const contacts = useSelector((state) => state.contacts);
  const contactToEdit = useSelector((state) => state.contactToEdit);
  const searchValue = useSelector((state) => state.searchValue);
  const filterValue = useSelector((state) => state.filterValue);
  const dispatch = useDispatch();

  const editContact = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    dispatch({ type: 'SET_CONTACT_TO_EDIT', payload: contact });
  };

  const deleteContact = (id) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  const displayContacts = () => {
    let filteredContacts = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filterValue !== 'all') {
      filteredContacts = filteredContacts.filter((contact) => contact.gender === filterValue);
    }

    return filteredContacts.map((contact) => (
      <tr key={contact.id}>
        <td>{contact.id}</td>
        <td>{contact.firstName}</td>
        <td>{contact.lastName}</td>
        <td>{contact.gender}</td>
        <td>
          <button className="btn btn-warning" onClick={() => editContact(contact.id)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => deleteContact(contact.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const handleAddContact = (newContact) => {
    dispatch({ type: 'ADD_CONTACT', payload: newContact });
  };

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: e.target.value });
  };

  const handleFilterChange = (e) => {
    dispatch({ type: 'SET_FILTER_VALUE', payload: e.target.value });
  };

  if (!contactToEdit) {
    return null;
  }

  return (
    <div>
      <input
        className="form-control"
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <select
        className="form-select"
        style={{ maxWidth: '150px !important' }}
        value={filterValue}
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <Add handleAddContact={handleAddContact} />
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Gender</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{displayContacts()}</tbody>
      </table>
      <Edit contactToEdit={contactToEdit} />
    </div>
  );
}

export default Home;
