import React, { useState } from 'react';
import { useTable } from 'react-table';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

const contactsData = [
  {"id":1,"first_name":"john","last_name":"doe","dob":"12/29/2023","email":"cgamlen0@huffingtonpost.com","phone":"321-398-6220","address":"Degeneration of iris (pigmentary), right eye","city":"Falāvarjān","state":null,"zip":"1"},
  {"id":2,"first_name":"jane","last_name":"Habben","dob":"9/28/2024","email":"chabben1@unc.edu","phone":"438-612-1442","address":"Other contact with dog","city":"Nueva Loja","state":null,"zip":"05392"},
  {"id":3,"first_name":"Sherie","last_name":"Peploe","dob":"5/16/2024","email":"speploe2@friendfeed.com","phone":"353-227-3943","address":"Other juvenile arthritis, hip","city":"Yanaoca","state":null,"zip":"76991"},
  {"id":4,"first_name":"Cathlene","last_name":"Yuill","dob":"12/30/2023","email":"cyuill3@ucsd.edu","phone":"659-858-7099","address":"Non-pressure chronic ulcer of unsp part of left lower leg","city":"Leon","state":"Castilla - Leon","zip":"03228"},
  {"id":5,"first_name":"Currie","last_name":"Chaloner","dob":"3/14/2024","email":"cchaloner4@opensource.org","phone":"855-957-1227","address":"War op w nuclear radiation effects of nuclear weapon, civ","city":"Neiba","state":null,"zip":"49"},
  {"id":6,"first_name":"Claudian","last_name":"Grivori","dob":"6/22/2024","email":"cgrivori5@mozilla.org","phone":"955-839-8024","address":"Acquired clubhand","city":"Krajan Suko Kidul","state":null,"zip":"275"},
  {"id":7,"first_name":"Oralle","last_name":"Dewar","dob":"6/12/2024","email":"odewar6@ucoz.ru","phone":"730-377-2065","address":"Abn lev enzymes in specimens from male genital organs","city":"Bellavista","state":"Veracruz Llave","zip":"61"},
  {"id":8,"first_name":"Everard","last_name":"Weekley","dob":"11/20/2024","email":"eweekleyt@nytimes.com","phone":"241-776-0972","address":"Driver of pk-up/van injured in clsn w unsp mv in traf, subs","city":"Mudanjiang","state":null,"zip":"4"}];

const App = () => {
  const [searchQuery, setSearchQuery] = useState({
    first_name: '',
    last_name: '',
    dob:'',
    email: '',
    phone: '',
    address:'',
    city:'',
    state:'',
    zip:''   
  });

  const [selectedContact, setSelectedContact] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState(contactsData);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(5); // Items per page

  // Handle search filters change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({
      ...searchQuery,
      [name]: value
    });
  };

  // Filter the contacts based on search query
  const filterContacts = () => {
    let filtered = contactsData.filter(contact => {
      return (
        contact.first_name.toLowerCase().includes(searchQuery.first_name.toLowerCase()) &&
        contact.last_name.toLowerCase().includes(searchQuery.last_name.toLowerCase()) &&
        contact.email.toLowerCase().includes(searchQuery.email.toLowerCase()) &&
        contact.phone.includes(searchQuery.phone)
      );
    });
    setFilteredContacts(filtered);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  
  const columns = React.useMemo(() => [  
    {
      Header: 'First Name',
      accessor: 'first_name'
    },
    {
      Header: 'Last Name',
      accessor: 'last_name'
    },
    {
      Header: 'Date of Birth',
      accessor: 'dob',
      Cell: ({ value }) => moment(value).format('MM/DD/YYYY')
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      Header: 'Address',
      accessor: 'address'
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'State',
      accessor: 'state'
    },
    {
      Header: 'Zip Code',
      accessor: 'zip'
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <button class="btn btn-outline-secondary" onClick={() => handleContactSelect(row.original)}>
          Show
        </button>
      )
    }
  ], []);
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredContacts.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  });

  // Handle selection of a contact
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div class="container">
      <h1>Contact Search Feature</h1>      
      <div class="row">
        <div class="col-6 labels-space text-space">      
        <div class="col p-2"><label for="first_name">First name:</label><br></br>
        <input
          type="text"
          name="first_name"
          class="form-control"
          value={searchQuery.first_name}
          onChange={handleSearchChange}
          placeholder="First Name"
        /></div>

        <div class="col p-2"><label for="last_name">Last name:</label><br></br>
        <input
          type="text"
          name="last_name"
          class="form-control"
          value={searchQuery.last_name}
          onChange={handleSearchChange}
          placeholder="Last Name"
        /></div>

        <div class="col p-2"><label for="dob">Date of Birth:</label><br></br>
         <input
          type="text"
          name="dob"
          class="form-control"
          value={searchQuery.dob}
          onChange={handleSearchChange}
          placeholder="Date of Birth"
        /></div>

        <div class="col p-2"><label for="email">Email:</label><br></br>
        <input
          type="text"
          name="email"
          class="form-control"
          value={searchQuery.email}
          onChange={handleSearchChange}
          placeholder="Email"
        /></div>

        <div class="col p-2"><label for="phone">Phone:</label><br></br>
        <input
          type="text"
          name="phone"
          class="form-control"
          value={searchQuery.phone}
          onChange={handleSearchChange}
          placeholder="Phone"
        /></div>      
        </div>

      <div class="col-6 labels-space text-space">
       <div class="col p-2"><label for="address">Street Address:</label><br></br>
        <input
          type="text"
          name="address"
          class="form-control"
          value={searchQuery.address}
          onChange={handleSearchChange}
          placeholder="address"
        /></div>

        <div class="col p-2"><label for="city">City:</label><br></br>
        <input
          type="text"
          name="city"
          class="form-control"
          value={searchQuery.city}
          onChange={handleSearchChange}
          placeholder="city"
        /></div>

        <div class="col p-2"><label for="state">State:</label><br></br>
        <input
          type="text"
          name="state"
          class="form-control"
          value={searchQuery.state}
          onChange={handleSearchChange}
          placeholder="state"
        /></div>

          <div class="col p-2"><label for="zip">Zip code:</label><br></br>
          <input
          type="text"
          name="zip"
          class="form-control"
          value={searchQuery.zip}
          onChange={handleSearchChange}
          placeholder="zip"
        /></div>
        </div>
        
        <div class="col p-3">
             <button class="btn btn-outline-secondary" onClick={filterContacts}>Search</button>
        </div>          
      </div>

      <table class="table" {...getTableProps()} border="1" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ReactPaginate 
        pageCount={Math.ceil(filteredContacts.length / pageSize)}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />

      {selectedContact && (
        <div>
          <h3>Selected Contact:</h3>
          <p>Name: {selectedContact.firstName} {selectedContact.lastName}</p>
          <p>Email: {selectedContact.email}</p>
          <p>Phone: {selectedContact.phone}</p>
          <p>Address: {selectedContact.address}</p>
          <p>City: {selectedContact.city}</p>
          <p>State: {selectedContact.state}</p>
          <p>Zip: {selectedContact.zip}</p>
        </div>
      )}
    </div>
  );
};

export default App;

