import { useLoaderData, useParams } from "react-router-dom";

import bg from "../assets/images/more/11.png";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const coffee = useLoaderData();
  const { id } = useParams();
  console.log(id);
  const { category, details, name, photo_URL, quantity, supplier, taste } =
    coffee;

  const handleUpdateCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo_URL = form.photo_URL.value;

    const newCoffee = {
      name,
      quantity,
      supplier,
      taste,
      category,
      details,
      photo_URL,
    };

    fetch(
      `https://coffee-store-server-f074xxx5n-mahfuja5768.vercel.app/coffee/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newCoffee),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Coffee Updated successfully!",
            icon: "success",
            confirmButtonText: "ok",
          });
          form.reset();
        }
      });
  };

  return (
    <div
      className="py-24"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[#F4F3F0] py-12 max-w-[1280px] mx-auto">
        <div className="flex justify-center flex-col my-12 items-center  ">
          <h1 className="text-5xl font-bold">Update Coffee</h1>
          <p className="w-1/2 text-center  my-3">
            It is a long established fact that a reader will be distraceted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here.
          </p>
        </div>
        <form onSubmit={handleUpdateCoffee} className=" px-24">
          <div className="grid grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl  ">Coffee Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  defaultValue={name}
                  placeholder="Enter coffee name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl ">Available Quantity</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  name="quantity"
                  defaultValue={quantity}
                  placeholder="Enter coffee quantity"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl ">Supplier</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="supplier"
                  defaultValue={supplier}
                  placeholder="Enter coffee supplier"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl ">Taste</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="taste"
                  defaultValue={taste}
                  placeholder="Enter coffee taste"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl ">Category</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="category"
                  defaultValue={category}
                  placeholder="Enter coffee category"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl ">Details</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="details"
                  defaultValue={details}
                  placeholder="Enter coffee details"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-2xl ">Photo</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="photo_URL"
                defaultValue={photo_URL}
                placeholder="Enter photo URL"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <input
            type="submit"
            className="w-full cursor-pointer bg-[#D2B48C] text-black my-5 rounded-sm py-2 font-bold"
            value="Add Coffee"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateCoffee;
