import React from "react";
import Feature from "./Feature";

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
    <div className="container my-8 mx-auto ">
      <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {featuresData.map((feature) => (
          <Feature key={feature.id} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Features;
