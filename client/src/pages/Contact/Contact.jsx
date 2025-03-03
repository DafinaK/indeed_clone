import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import LeafletMap from "./MapComponent";
import TestimonialForm from "../../components/HomePageComponents/TestimonialForm";

const ContactUs = ({ userData }) => {
  const [successMessage, setSuccessMessage] = useState("");
  // State to handle form input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/chatsupports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission (e.g., show a success message, clear the form, etc.)
        setSuccessMessage("Message sent successfully");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        // Handle server errors
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="bg-[#f1f2f4]">
        <div className="max-w-[1200px] mx-auto my-0 px-[15px] py-0">
          <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-jobportal-pink font-bold mb-2">Who we are</h2>
              <h1 className="text-3xl font-bold mb-4">
                We care about customer services
              </h1>
              <p className="text-gray-600 mb-6">
                Want to chat? We'd love to hear from you! Get in touch with our
                Customer Success Team to inquire about speaking events,
                advertising rates, or just say hello.
              </p>
              <a
                href="mailto:indeedclonesite@gmail.com"
                className="bg-jobportal-pink hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold"
              >
                Email Support
              </a>
            </div>
            <div className="md:w-1/2 bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">
                Get in Touch Chat our Team
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                {successMessage ? (
                  <section className="resetPassword__form-message-container resetPassword__form-success">
                    <div className="resetPassword__form-message">
                      <section>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <div>{successMessage}</div>
                      </section>
                    </div>
                  </section>
                ) : (
                  <></>
                )}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-jobportal-pink text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
                >
                  Send Message <FaPaperPlane className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="">
          {userData.length !== 0 ? (
            <TestimonialForm userData={userData} />
          ) : null}
        </div>

        <div className="w-full">
          <LeafletMap />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
