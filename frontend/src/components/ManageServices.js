import React, { useEffect, useState } from 'react';
import { getServices, createService, deleteService } from '../api';
import AddGuestVisit from './AddGuestVisit';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ service_name: '', price: '' });

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getServices();
      setServices(response.data);
    };
    fetchServices();
  }, []);

  const handleAddService = async () => {
    await createService(newService);
    setNewService({ service_name: '', price: '' });
    const response = await getServices();
    setServices(response.data);
  };

  const handleDeleteService = async (id) => {
    await deleteService(id);
    const updatedServices = services.filter(service => service._id !== id);
    setServices(updatedServices);
  };

  return (
    <div>
      <h1>Quản lý dịch vụ</h1>
      <input
        placeholder="Tên dịch vụ"
        value={newService.service_name}
        onChange={(e) => setNewService({ ...newService, service_name: e.target.value })}
      />
      <input
        placeholder="Giá"
        type="number"
        value={newService.price}
        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
      />
      <button onClick={handleAddService}>Thêm dịch vụ</button>

      <h2>Danh sách dịch vụ</h2>
      <table>
        <thead>
          <tr>
            <th>Tên dịch vụ</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service._id}>
              <td>{service.service_name}</td>
              <td>{service.price} VNĐ</td>
              <td>
                <button onClick={() => handleDeleteService(service._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageServices;
