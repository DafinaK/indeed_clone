import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LowerJobSection from '../../components/CompanyComponents/Dashboard/LowerJobSection';
import DashboardNavSection from '../../components/CompanyComponents/DashboardNavSection';
import ApplicantListHeader from '../../components/CompanyComponents/Jobs/ApplicantList/ApplicantListHeader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import SignInPrompt from '../../components/SignInPrompt';
import InterviewListHeader from '../../components/CompanyComponents/Jobs/InterviewList/InterviewListHeader';

const InterviewList = ({ userData }) => {
  const location = useLocation();
  const [isInterviewActive, setInterviewIsActive] = useState('');
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      const JobPostId = id;
      try {
        const response = await fetch(`http://localhost:5000/api/interviewlists/jobs/${JobPostId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Sanitize userNotes using DOMPurify
        const sanitizedData = data.map((applicant) => ({
          ...applicant,
          userNotes: DOMPurify.sanitize(applicant.userNotes),
        }));

        // Set the sanitized data in the state
        setApplicants(sanitizedData);
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    const fetchJobStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobposts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jobPost = await response.json();
        setInterviewIsActive(jobPost.interviewActive);
      } catch (error) {
        console.error('Error fetching job post:', error);
      }
    };

    fetchApplicants();
    fetchJobStatus();
  }, [id]);

  useEffect(() => {
    //console.log('Updated applicants:', applicants);
  }, [applicants]);

  useEffect(() => {
    //console.log('Updated status:', isInterviewActive);
  }, [isInterviewActive]);

  return (
    <>
      <div className='applicantList dashboard bg-gray-100'>
        <DashboardNavSection />
        {userData.length !== 0 && userData.role === 'Company' ? (
          <>
            {applicants.length > 0 && isInterviewActive !== '' ? (
              <div className='flex flex-col gap-5 container mx-auto'>
                <InterviewListHeader applicantList={applicants} jobPostId={id} isActive={isInterviewActive} />
                <hr className='h-px my-8 bg-gray-300 border-0' />
              </div>
            ) : (
              <div>
                <hr className='h-px my-8 bg-gray-300 border-0' />
              </div>
            )}
          </>
        ) : (
          <SignInPrompt />
        )}
      </div>
    </>
  );
};

export default InterviewList;
