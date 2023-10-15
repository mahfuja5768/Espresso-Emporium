import { Link, useLocation, useNavigate } from "react-router-dom";
import bg from "../assets/images/more/login.jpg";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((res) => {
        if(res.user){
          Swal.fire({
            title: "Success!",
            text: "Successfully User Logged in",
            icon: "success",
            confirmButtonText: "Done",
          });
          return navigate(location?.state ? location.state : '/')
        }
        console.log(res.user);
        const user = {
          email,
          lastLoggedAt: res.user?.metadata?.lastSignInTime,
        };
        fetch(
          "https://coffee-store-server-f074xxx5n-mahfuja5768.vercel.app/users",
          {
            method: "PATCH",
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

        // Swal.fire({
        //   title: "Success!",
        //   text: "Successfully User Logged in",
        //   icon: "success",
        //   confirmButtonText: "Done",
        // });
        form.reset();
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
      <div className="max-w-[1280px] mx-auto py-12">
        <form onSubmit={handleSubmit} className=" px-24">
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
          <p className="text-white text-xl my-5">
            New to Espresso{" "}
            <Link to="/register" className="link  ms-2">
              Register now
            </Link>
          </p>
          <input
            type="submit"
            className="w-full text-2xl cursor-pointer bg-[#D2B48C] text-black rounded-sm py-2 font-bold"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
