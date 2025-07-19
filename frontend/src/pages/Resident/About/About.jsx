import React from "react";
import {
  FaUsers,
  FaBullseye,
  FaLandmark,
  FaUserTie,
  FaHandsHelping,
} from "react-icons/fa";

const About = () => {
  const officials = [
    {
      name: "Juan Dela Cruz",
      position: "Barangay Captain",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Maria Santos",
      position: "Barangay Secretary",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Pedro Reyes",
      position: "Barangay Treasurer",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Sofia Martinez",
      position: "SK Chairman",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
  ];

  const kagawads = [
    {
      name: "Antonio Bautista",
      committee: "Peace & Order",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Lourdes Garcia",
      committee: "Health & Sanitation",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Ricardo Lim",
      committee: "Education",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Elena Torres",
      committee: "Agriculture",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Fernando Cruz",
      committee: "Infrastructure",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Carmen Reyes",
      committee: "Women & Family",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Alfredo Mendoza",
      committee: "Youth & Sports",
      image:
        "https://images.unsplash.com/photo-1542190891-2093d38760f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-7xl mx-auto gap-6">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">
            About Our Barangay
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our community, leadership, and the principles that guide
            our service to residents
          </p>
        </div>

        {/* History Section */}
        <div className="rounded-xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                <FaLandmark className="mr-2 text-gray-800" />
                <span className="text-black">Barangay History</span>
              </h2>
              <p className="text-gray-700 mb-4">
                Established in 1960, our barangay has grown from a small rural
                community to a thriving neighborhood with over 5,000 residents.
                Named after the legendary local hero, our community takes pride
                in its rich cultural heritage and strong sense of unity.
              </p>
              <p className="text-gray-700">
                Over the years, we've developed modern infrastructure while
                preserving our traditional values. Our barangay hall was
                renovated in 2015 to better serve our growing population.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Barangay Hall"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-500 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <FaBullseye className="text-3xl mr-3 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-100">Our Vision</h2>
            </div>
            <p className="text-gray-300">
              To be a model barangay with empowered, healthy, and resilient
              communities living in a peaceful, progressive, and environmentally
              sustainable neighborhood under transparent and accountable
              governance.
            </p>
          </div>

          <div className="bg-gray-700 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <FaHandsHelping className="text-3xl mr-3 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-100">Our Mission</h2>
            </div>
            <p className="text-gray-300">
              To deliver effective and efficient public service through
              participatory governance, sustainable development programs, and
              community-based initiatives that improve quality of life while
              preserving our cultural heritage and natural resources.
            </p>
          </div>
        </div>

        {/* Officials Section */}
        <div className="rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-black mb-8 flex items-center">
            <FaUserTie className="mr-2 text-black" />
            Barangay Officials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officials.map((official, index) => (
              <div key={index} className="text-center">
                <img
                  src={official.image}
                  alt={official.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-700"
                />
                <h3 className="font-bold text-lg text-black">
                  {official.name}
                </h3>
                <p className="text-gray-700">{official.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kagawads Section */}
        <div className=" rounded-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-8 flex items-center">
            <FaUsers className="mr-2 text-black" />
            Barangay Kagawads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kagawads.map((kagawad, index) => (
              <div key={index} className="text-center">
                <img
                  src={kagawad.image}
                  alt={kagawad.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-700"
                />
                <h3 className="font-bold text-lg text-white">{kagawad.name}</h3>
                <p className="text-black font-medium">Kagawad</p>
                <p className="text-gray-700 text-sm">{kagawad.committee}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-16  rounded-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border bg-white border-gray-300 shadow-sm p-6 rounded-lg text-center">
              <div className="bg-gray-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-black mb-2">Integrity</h3>
              <p className="text-gray-700">
                We uphold honesty and transparency in all our actions and
                decisions.
              </p>
            </div>
            <div className="border bg-white border-gray-300 shadow-sm p-6 rounded-lg text-center">
              <div className="bg-gray-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-black mb-2">Service</h3>
              <p className="text-gray-700">
                We prioritize the welfare of our constituents above all else.
              </p>
            </div>
            <div className="border bg-white border-gray-300 shadow-sm p-6 rounded-lg text-center">
              <div className="bg-gray-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-black mb-2">Progress</h3>
              <p className="text-gray-700">
                We commit to continuous improvement and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
