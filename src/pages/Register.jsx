import { Link } from "react-router-dom";
import bg from "../assets/images/more/login.jpg";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updatedUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo_URL.value;
    const password = form.password.value;

    createUser(email, password)
      .then((res) => {
      
        updatedUser(name, photo)
          .then(() => {
            console.log("profile updated");
          })
          .catch((err) => console.log(err));
        const creationTime = res.user?.metadata?.creationTime;
        const user = {
          name,
          email,
          password,
          photo,
          creationTime,
        };
        console.log(res.user);

        Swal.fire({
          title: "Success!",
          text: "Successfully User created",
          icon: "success",
          confirmButtonText: "Done",
        });
        form.reset();
        fetch(
          "https://coffee-store-server-f074xxx5n-mahfuja5768.vercel.app/users",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              console.log(data);
            }
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-[1280px] mx-auto  py-12">
        <form onSubmit={handleSubmit} className=" px-24">
          <div className="grid grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-white text-2xl">
                  Your Name
                </span>
              </label>
              <label className="">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter coffee name"
                  className="input input-bordered bg-[#F4F3F0] rounded w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-white text-2xl ">
                  Your Email
                </span>
              </label>
              <label className="">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-[#F4F3F0] rounded w-full"
                />
              </label>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-white text-2xl ">Password</span>
            </label>
            <label className="">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered bg-[#F4F3F0] rounded w-full"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text  text-white text-2xl ">Photo</span>
            </label>
            <label className="">
              <input
                type="text"
                name="photo_URL"
                placeholder="Enter photo URL"
                className="input input-bordered bg-[#F4F3F0] rounded w-full"
              />
            </label>
          </div>
          <p className="text-white text-xl my-5">
            Already have an account{" "}
            <Link to="/login" className="link ms-2">
              Login now
            </Link>
          </p>

          <input
            type="submit"
            className="w-full text-2xl cursor-pointer bg-[#D2B48C] text-black my-5 rounded-sm py-2 font-bold"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
