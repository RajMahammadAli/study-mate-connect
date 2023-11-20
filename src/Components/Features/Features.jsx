import React from "react";

const Feature = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="bg-blue-500 rounded-full p-3 mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
  );
};

const Features = () => {
  const featuresData = [
    {
      id: 1,
      icon: (
        <span role="img" aria-label="User">
          &#128100;
        </span>
      ),
      title: "User-Friendly",
      description: "An intuitive interface for a seamless user experience.",
    },
    {
      id: 2,
      icon: (
        <span role="img" aria-label="Security">
          &#128274;
        </span>
      ),
      title: "Secure",
      description:
        "Ensure the safety and privacy of user data and transactions.",
    },
    {
      id: 3,
      icon: (
        <span role="img" aria-label="Cloud">
          &#9729;
        </span>
      ),
      title: "Cloud Integration",
      description:
        "Access your data and files from anywhere with cloud support.",
    },
  ];

  return (
    <section className="bg-gray-100 py-8 sm:py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8">
          Key Features
        </h2>
        <div className="flex flex-wrap -mx-4 justify-center">
          {featuresData.map((feature) => (
            <Feature key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
