import { useEffect, useState } from "react";
import Coffee from "./Coffee";
import Swal from "sweetalert2";

const DisplayCoffee = () => {
  const [allCoffee, setAllCoffee] = useState([]);

  useEffect(() => {
    fetch("https://coffee-store-server-f074xxx5n-mahfuja5768.vercel.app/coffee")
      .then((res) => res.json())
      .then((data) => setAllCoffee(data));
  }, []);

  const handleDelete = (_id) => {
    // console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://coffee-store-server-f074xxx5n-mahfuja5768.vercel.app/coffee/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Coffee has been deleted.", "success");
              // console.log(data);
              const remaining = allCoffee.filter(
                (coffee) => coffee._id !== _id
              );
              const newArr = [...remaining];
              setAllCoffee(newArr);
            }
          });
      }
    });
  };

  return (
    <div className="my-12">
      <h1 className="flex justify-center items-center text-3xl font-bold my-6">
        All Coffees: {allCoffee.length}
      </h1>
      <div className="grid grid-cols-2 gap-6">
        {allCoffee.map((coffee) => (
          <Coffee
            key={coffee._id}
            coffee={coffee}
            handleDelete={handleDelete}
          ></Coffee>
        ))}
      </div>
    </div>
  );
};

export default DisplayCoffee;
