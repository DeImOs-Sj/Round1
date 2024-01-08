import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
    const [formData, setFormData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [newData, setNewData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
        address: '',
        aadhar: '',
        dob: '',
    });
    const [newDataId, setNewDataId] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('email');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/form');
            setFormData(response.data);
            setOriginalData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newDataId) {
                await axios.put(`http://localhost:5000/api/form/${newDataId}`, newData);
                setNewDataId(null);
            } else {
                await axios.post('http://localhost:5000/api/form', newData);
            }
            setNewData({
                name: '',
                email: '',
                password: '',
                contact: '',
                address: '',
                aadhar: '',
                dob: '',
            });
            fetchData();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/form/${id}`);
            const editedData = response.data;

            setNewData({
                name: editedData.name,
                email: editedData.email,
                password: editedData.password,
                contact: editedData.contact,
                address: editedData.address,
                aadhar: editedData.aadhar,
                dob: editedData.dob,
            });

            setNewDataId(id);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Form data not found');
            } else {
                console.error('Error fetching data for editing:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/form/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleSort = (field) => {
        setSortField(field);
        const sortedData = [...formData].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setFormData(sortedData);
    };

    const handleSearch = () => {
        const filteredData = originalData.filter(
            (data) =>
                data[searchField].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFormData(filteredData);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchField('email');
        setFormData(originalData);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder={`Search by ${searchField.charAt(0).toUpperCase() + searchField.slice(1)}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-2 px-4 border rounded mr-2"
                />
                <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="py-2 px-4 border rounded mr-2"
                >
                    <option value="email">Email</option>
                    <option value="aadhar">Aadhar</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Search
                </button>
                <button
                    onClick={handleClearSearch}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Clear
                </button>
            </div>
            <div className="mb-4">
                <span>Sort by:</span>
                <button onClick={() => handleSort('name')} className="ml-2">
                    Name
                </button>
                <button onClick={() => handleSort('email')} className="ml-2">
                    Email
                </button>
                <button onClick={() => handleSort('aadhar')} className="ml-2">
                    Aadhar
                </button>
            </div>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={newData.name}
                        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                        className="w-full py-2 px-4 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={newData.email}
                        onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                        className="w-full py-2 px-4 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={newData.password}
                        onChange={(e) => setNewData({ ...newData, password: e.target.value })}
                        className="w-full py-2 px-4 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700">Contact:</label>
                    <input
                        type="text"
                        value={newData.contact}
                        onChange={(e) => setNewData({ ...newData, contact: e.target.value })}
                        className="w-full py-2 px-4 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700">Address:</label>
                    <input
                        type="text"
                        value={newData.address}
                        onChange={(e) => setNewData({ ...newData, address: e.target.value })}
                        className="w-full py-2 px-4 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700">Aadhar:</label>
                    <input
                        type="text"
                        value={newData.aadhar}
                        onChange={(e) => setNewData({ ...newData, aadhar: e.target.value })}
                        className="w-full py-2 px-4 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700">DOB:</label>
                    <input
                        type="text"
                        value={newData.dob}
                        onChange={(e) => setNewData({ ...newData, dob: e.target.value })}
                        className="w-full py-2 px-4 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {newDataId ? 'Update' : 'Submit'}
                </button>
            </form>

            <table className="min-w-full text-black bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Password</th>
                        <th className="py-2 px-4 border-b">Contact</th>
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b">Aadhar</th>
                        <th className="py-2 px-4 border-b">DOB</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((data) => (
                        <tr key={data._id}>
                            <td className="py-2 px-4 border-b">{data.name}</td>
                            <td className="py-2 px-4 border-b">{data.email}</td>
                            <td className="py-2 px-4 border-b">{data.password}</td>
                            <td className="py-2 px-4 border-b">{data.contact}</td>
                            <td className="py-2 px-4 border-b">{data.address}</td>
                            <td className="py-2 px-4 border-b">{data.aadhar}</td>
                            <td className="py-2 px-4 border-b">{data.dob}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit(data._id)}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 mr-2 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(data._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Form;
