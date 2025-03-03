import React, { useState, useEffect } from 'react';
import pricing from '../../img/pricing.svg';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';

const RightIcon = () => {
  return (
    <svg className='fill-current' width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M10.0001 0.00012207C4.48608 0.00012207 7.62939e-05 4.48612 7.62939e-05 10.0001C7.62939e-05 15.5141 4.48608 20.0001 10.0001 20.0001C15.5141 20.0001 20.0001 15.5141 20.0001 10.0001C20.0001 4.48612 15.5141 0.00012207 10.0001 0.00012207ZM8.00108 14.4131L4.28808 10.7081L5.70008 9.29212L7.99908 11.5871L13.2931 6.29312L14.7071 7.70712L8.00108 14.4131Z' />
    </svg>
  );
};

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/subscriptionsPlan');
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };

    fetchPlans();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleCheckout = async (planId) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', { planId });
      const { url } = response.data;
      window.location.href = url; // Redirect to the Stripe checkout session URL
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className='max-w-[1200px] mx-auto my-0 px-[15px] flex flex-col items-center justify-center'>
        <div className='flex flex-col lg:flex-row items-center justify-between mt-[50px] py-8 bg-white'>
          <div className='max-w-xl text-center lg:text-left'>
            <h1 className='text-3xl font-bold mb-4'>Buy Premium Subscription to Post Jobs</h1>
            <p className='mb-8 text-gray-700'>
              Become an employer on our platform and the wide reach of qualified candidates, using our learning and intuitive treatment to post and manage your job announcements.
            </p>
          </div>
          <div className='mt-8 lg:mt-0 lg:ml-8'>
            <img src={pricing} alt='Illustration' />
          </div>
        </div>
        <div className='bg-gray-100 full-width'>
          <div className='max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:items-start justify-between mt-[50px] py-8 pb-12'>
            {plans.map((plan) => (
              <div key={plan._id} className='relative h-full flex-1'>
                <div className='max-w-sm p-6 bg-white group h-full rounded-2xl lg:hover:-translate-y-6 ease-in duration-300 hover:bg-[#06234f] hover:text-white '>
                  <div className='flex flex-row gap-5 items-center w-full'>
                    <div><RightIcon /></div>
                    <span className='text-3xl font-bold'>{plan.planName}</span>
                  </div>
                  <span className='flex mt-4 text-[#A9A9AA] text-2xl'>What You&apos;ll Get</span>
                  {plan.planDescription.split(', ').map((benefit, index) => (
                    <div key={index} className='flex flex-row gap-2.5 items-start mt-6 text-left text-lg'>
                      <div className='pt-1 shrink-0'>
                        <RightIcon />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                  <div className='border border-dashed border-[#A9A9AA] tracking-widest my-4' />
                  <div className='h-36'>
                    <div className='bottom-6 left-6 right-6 absolute'>
                      <div className='flex justify-start items-baseline'>
                        <span className='text-[32px] font-bold '>{`€${plan.planPrice} per year`}</span>
                      </div>
                      <button
                        className='w-full px-4 py-3 bg-[#F5F9FF] text-[#1D5DFF] group-hover:text-white group-hover:bg-[#1D5DFF] rounded-xl mt-6 font-semibold text-xl'
                        onClick={() => handleCheckout(plan.stripeId)}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Choose'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;