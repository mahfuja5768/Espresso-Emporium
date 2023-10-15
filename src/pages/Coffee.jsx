import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

const Coffee = ({ coffee, handleDelete }) => {
  // console.log(coffee);
  const { category, details, name, photo_URL, quantity, supplier, taste, _id } =
    coffee;

  return (
    <div>
      <div className="card card-side bg-[#F5F4F1] shadow">
        <figure>
          <img src={photo_URL} className="w-52 h-52" alt="Movie" />
        </figure>
        <div className="flex justify-between items-center gap-5">
          <div className="card-body">
            <h2 className="card-title">Name: {name}</h2>
            <p>Quantity: {quantity}</p>
            <p>Category: {category}</p>
            <p>Taste: {taste}</p>
          </div>
          <div className="flex flex-col justify-end items-center gap-2 ">
            <button className="btn bg-[#D2B48C] text-white"><FaEye></FaEye></button>
            <Link to={`/updateCoffee/${_id}`} className="btn ">
              <button  className="btn bg-[#3C393B] text-white">
               <FaPen/>
              </button>
            </Link>

            <button onClick={() => handleDelete(_id)} className="btn bg-[#EA4744] text-white">
             <FaTrash/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coffee;
