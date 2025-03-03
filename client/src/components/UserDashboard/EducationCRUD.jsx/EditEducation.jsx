import React, { useEffect, useState } from 'react';

const EditEducation = ({ userData, educationDetail, fetchData, setFetchData }) => {
  const [education, setEducation] = useState({
    schoolName: '',
    degreeType: '',
    degreeName: '',
    country: '',
    city: '',
    currentlyStudyingHere: false,
    startDate: '',
    endDate: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Helper function to format date to yyyy-MM-dd
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (educationDetail) {
      setEducation({
        ...educationDetail,
        startDate: formatDate(educationDetail.startDate),
        endDate: formatDate(educationDetail.endDate),
      });
    }
  }, [educationDetail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEducation({
      ...education,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const requestBody = {
      ...education,
      UserId: userData.id,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/educations/${education.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Error:', responseData.error);
        setErrorMessage(responseData.error);
      } else {
        setSuccessMessage('Education details saved successfully.');
        setEducation({
          schoolName: '',
          degreeType: '',
          degreeName: '',
          country: '',
          city: '',
          currentlyStudyingHere: false,
          startDate: '',
          endDate: '',
          description: '',
        });
        setFetchData(!fetchData);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('An error occurred while saving education details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-lg mx-auto p-4 bg-white rounded shadow-lg'>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>School Name</label>
        <input type='text' name='schoolName' value={education.schoolName} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Degree Type</label>
        <input type='text' name='degreeType' value={education.degreeType} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Degree Name</label>
        <input type='text' name='degreeName' value={education.degreeName} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Country</label>
        <input type='text' name='country' value={education.country} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>City</label>
        <input type='text' name='city' value={education.city} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Currently Studying Here</label>
        <input type='checkbox' name='currentlyStudyingHere' checked={education.currentlyStudyingHere} onChange={handleChange} className='mr-2 leading-tight' />
        <span className='text-gray-700'>Yes</span>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Start Date</label>
        <input type='date' name='startDate' value={education.startDate} onChange={handleChange} className='w-full px-3 py-2 border rounded' required />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>End Date</label>
        <input
          type='date'
          name='endDate'
          value={education.endDate}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded'
          required={!education.currentlyStudyingHere}
          disabled={education.currentlyStudyingHere}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Description</label>
        <textarea name='description' value={education.description} onChange={handleChange} className='w-full px-3 py-2 border rounded' rows='4' />
      </div>
      {errorMessage && <div className='text-red-600'>{errorMessage}</div>}
      {successMessage && <div className='text-green-600'>{successMessage}</div>}
      <button type='submit' className='w-full px-4 py-2 bg-blue-500 text-white font-bold rounded'>
        Save Changes
      </button>
    </form>
  );
};

export default EditEducation;
