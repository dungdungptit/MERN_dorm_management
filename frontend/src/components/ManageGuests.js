import React, { useEffect, useState } from 'react';
import { getGuests, createGuest, deleteGuest } from '../api';
import AddGuestVisit from './AddGuestVisit';

const ManageGuests = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    name: '',
    identity_card: '',
    birth_date: '',
    visits: []
  });

  useEffect(() => {
    const fetchGuests = async () => {
      const response = await getGuests();
      setGuests(response.data);
    };
    fetchGuests();
  }, []);

  const handleAddGuest = async () => {
    await createGuest(newGuest);
    setNewGuest({
      name: '',
      identity_card: '',
      birth_date: '',
      visits: []
    });
    const response = await getGuests();
    setGuests(response.data);
  };

  const handleDeleteGuest = async (id) => {
    await deleteGuest(id);
    const updatedGuests = guests.filter(guest => guest._id !== id);
    setGuests(updatedGuests);
  };

  return (
    <div>
      <h1>Quản lý khách đến thăm</h1>
      <input
        placeholder="Tên khách"
        value={newGuest.name}
        onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
      />
      <input
        placeholder="CMT"
        value={newGuest.identity_card}
        onChange={(e) => setNewGuest({ ...newGuest, identity_card: e.target.value })}
      />
      <input
        type="date"
        value={newGuest.birth_date}
        onChange={(e) => setNewGuest({ ...newGuest, birth_date: e.target.value })}
      />
      <button onClick={handleAddGuest}>Thêm khách</button>

      <h2>Danh sách khách</h2>
      <table>
        <thead>
          <tr>
            <th>Tên khách</th>
            <th>CMT</th>
            <th>Ngày sinh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => (
            <tr key={guest._id}>
              <td>{guest.name}</td>
              <td>{guest.identity_card}</td>
              <td>{guest.birth_date}</td>
              <td>
                <button onClick={() => handleDeleteGuest(guest._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageGuests;
