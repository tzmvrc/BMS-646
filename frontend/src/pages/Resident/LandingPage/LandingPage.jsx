/** @format */
import React, { useState, useEffect } from "react";
import UserLoginCard from "../../../components/UserLoginCard";
import Loader from "../../../components/Loader";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import policeAnimation from "../../../animations/police.json";
import fireAnimation from "../../../animations/fire.json";
import medicalAnimation from "../../../animations/medical.json";
import barangayAnimation from "../../../animations/barangay.json";
import ThreeD from "../../../components/3D.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const services = [
    {
      title: "Resident Registration",
      description: "Register as a barangay resident and access services",
      icon: "👥",
      image:
        "https://www.theforage.com/blog/wp-content/uploads/2024/03/client-services-e1709741837781.jpg",
    },
    {
      title: "Document Requests",
      description:
        "Request barangay clearance, certificates, and other documents",
      icon: "📄",
      image:
        "https://www.filedoc.com/wp-content/uploads/2022/04/filledoc-19.jpg",
    },
    {
      title: "Complaint Submission",
      description: "Submit complaints or concerns to barangay officials",
      icon: "📢",
      image:
        "https://blog.ipleaders.in/wp-content/uploads/2016/08/before-you-file-a-complaint.jpg",
    },
    {
      title: "Community Events",
      description:
        "Participate in barangay activities, meetings, and social programs",
      icon: "🎉",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      {/* Hero Section */}
      <section className="dotted-bg rounded-lg mx-4 my-12 lg:mx-8 lg:my-9 relative py-12 md:py-20 bg-white/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto">
            {/* Left side - Barangay System text */}
            <div className="z-20 px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                <span className="block">Barangay 646,</span>
                <span className="block mt-2 text-gray-500">Zone 67</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Barangay Management System
              </p>
              <p className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl">
                A comprehensive solution for managing barangay operations,
                resident information, document processing, and community
                services. Streamline administrative tasks and improve service
                delivery to residents.
              </p>
            </div>

            {/* Right side - Login form */}
            <div className="z-20 w-full max-w-md mx-auto px-4">
              <UserLoginCard />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white/80 backdrop-blur-sm mx-4 lg:mx-8 mb-12 relative py-16">
        <div className="container mx-auto px-4">
          {/* Centered Services Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover the range of services we offer to our barangay residents
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-t-lg"
                    src={service.image}
                    alt={service.title}
                  />
                </div>
                <div className="p-6">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barangay Officials Section */}
      <section className="rounded-lg mx-4 my-12 lg:mx-8 lg:my-9 backdrop-blur-sm mb-12 relative py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Barangay Officials
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Our dedicated officials work together to ensure the welfare and
              progress of our community in health, education, infrastructure,
              and public safety.
            </p>
          </div>

          <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm md:mb-12 md:grid-cols-2 bg-white">
            <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
               <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  Committed to Public Service
                </h3>
                <p className="my-4">
                  "As your Barangay Captain, I pledge to lead with transparency
                  and dedication to improve our community."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Barangay Captain"
                />
                <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                  <div>Juan Dela Cruz</div>
                  <div className="text-sm text-gray-500">Barangay Captain</div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg">
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  Advocating for Health & Sanitation
                </h3>
                <p className="my-4">
                  "Ensuring clean surroundings and accessible healthcare for
                  every resident is my priority."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                  alt="Health Officer"
                />
                <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                  <div>Maria Santos</div>
                  <div className="text-sm text-gray-500">
                    Barangay Health Officer
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:border-b-0 md:border-e">
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  Focused on Education & Youth
                </h3>
                <p className="my-4">
                  "Empowering our youth through education and skills development
                  is key to our barangay's future."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="SK Chairman"
                />
                <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                  <div>Carlos Reyes</div>
                  <div className="text-sm text-gray-500">SK Chairman</div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg">
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  Ensuring Peace & Order
                </h3>
                <p className="my-4">
                  "Working closely with local authorities to maintain safety and
                  harmony in our barangay."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                  alt="Peace Officer"
                />
                <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                  <div>Antonio Bautista</div>
                  <div className="text-sm text-gray-500">
                    Barangay Peace Officer
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Hotlines Section */}
      <section className="bg-white/80 backdrop-blur-sm mx-4 lg:mx-8 mb-12 relative py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Emergency Hotlines
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Important contact numbers for emergencies and assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Police */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="  border border-gray-200 shadow-sm rounded-xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="w-24 h-24 mx-auto mb-4">
                <Lottie
                  animationData={policeAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Police Emergency
              </h3>
              <p className="text-gray-600 mb-2">Available 24/7</p>
              <a
                href="tel:911"
                className="text-red-600 font-semibold hover:underline block transition-colors"
              >
                911 or (02) 8722-0650
              </a>
            </motion.div>

            {/* Fire Department */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="border border-gray-200 shadow-sm rounded-xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="w-24 h-24 mx-auto mb-4">
                <Lottie
                  animationData={fireAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Fire Department
              </h3>
              <p className="text-gray-600 mb-2">Available 24/7</p>
              <a
                href="tel:911"
                className="text-orange-600 font-semibold hover:underline block transition-colors"
              >
                911 or (02) 8426-0219
              </a>
            </motion.div>

            {/* Medical Emergency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="border border-gray-200 shadow-sm rounded-xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="w-24 h-24 mx-auto mb-4">
                <Lottie
                  animationData={medicalAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Medical Emergency
              </h3>
              <p className="text-gray-600 mb-2">Available 24/7</p>
              <a
                href="tel:911"
                className="text-blue-600 font-semibold hover:underline block transition-colors"
              >
                911 or (02) 8790-6300
              </a>
            </motion.div>

            {/* Barangay Hotline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="border border-gray-200 shadow-sm rounded-xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="w-24 h-24 mx-auto mb-4">
                <Lottie
                  animationData={barangayAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Barangay Hotline
              </h3>
              <p className="text-gray-600 mb-2">Mon-Sun, 8AM-5PM</p>
              <a
                href="tel:123456789"
                className="text-green-600 font-semibold hover:underline block transition-colors"
              >
                (02) 8642-1234
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <footer>
        <footer class="bg-white dark:bg-black">
          <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-between">
              <div class="mb-6 md:mb-0">
                <a href="https://flowbite.com/" class="flex items-center">
                  <img
                    src="./BrgyLogo.png"
                    class="h-8 me-3"
                    alt="FlowBite Logo"
                  />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Barangay 646
                  </span>
                </a>
              </div>
              <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Address
                  </h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="mb-4">
                      <a href="https://flowbite.com/" class="hover:underline">
                        Zone 67
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tailwindcss.com/"
                        class="hover:underline"
                      >
                        District VI
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Follow us
                  </h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="mb-4">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        class="hover:underline "
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://discord.gg/4eeurUVvTy"
                        class="hover:underline"
                      >
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Legal
                  </h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="mb-4">
                      <a href="#" class="hover:underline">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" class="hover:underline">
                        Terms &amp; Conditions
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2025{" "}
                <a href="https://flowbite.com/" class="hover:underline">
                  BMS646™
                </a>
                . All Rights Reserved.
              </span>
              <div class="flex mt-4 sm:justify-center sm:mt-0">
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 8 19"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Facebook page</span>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 21 16"
                  >
                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                  </svg>
                  <span class="sr-only">Discord community</span>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 17"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Twitter page</span>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">GitHub account</span>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Dribbble account</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </footer>
    </div>
  );
};

export default Dashboard;
