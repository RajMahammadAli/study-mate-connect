const Feature = ({ icon, title, description }) => {
  return (
    <>
      <div className="card w-full shadow-lg my-2">
        <div className="card-body">
          <h2 className="card-title ">{icon}</h2>
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default Feature;
