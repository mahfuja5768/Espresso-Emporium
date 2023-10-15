import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/more/logo1.png";
import userProfile from "../assets/user.png";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  const navList = (
    <>
      <li className="text-xl bg-transparent hover:text-yellow-200">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-xl bg-transparent hover:text-yellow-200">
        <NavLink to="/addCoffee">Add Coffee</NavLink>
      </li>

      <li className="text-xl bg-transparent hover:text-yellow-200">
        <NavLink to="/users">All Users</NavLink>
      </li>
      <li className="text-xl bg-transparent hover:text-yellow-200">
        <NavLink to="/register">Register</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logout()
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully logout!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" bg-amber-950 text-white ">
      <div className="navbar max-w-[1280px] mx-auto">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu text-black gap-3 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navList}
            </ul>
          </div>
          <Link className="btn btn-ghost normal-case text-xl">
            <span>
              <img src={logo} className="w-12" alt="" />
            </span>
            <span>Espresso Emporium</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navList}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-3">
            <div>
              {user ? (
                <>
                  {user?.photoURL ? (
                    <img
                      src={user?.photoURL}
                      className="w-12 rounded-full"
                      alt=""
                    />
                  ) : (
                    <img
                      src={userProfile}
                      className="w-12 rounded-full"
                      alt=""
                    />
                  )}
                </>
              ) : (
                <img src={userProfile} className="w-12 rounded-full" alt="" />
              )}
            </div>

            <div>{user ? <h3>{user.displayName}</h3> : ""}</div>
            <div>
              {user ? (
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="btn normal-case text-xl"
                >
                  Logout
                </Link>
              ) : (
                <Link to="/login" className="btn normal-case">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
