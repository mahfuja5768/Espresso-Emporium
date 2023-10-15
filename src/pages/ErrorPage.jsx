import error from "../assets/images/404/404.gif"

const ErrorPage = () => {
    return (
        <div className="h-[100vh] grid place-content-center">
             <img src={error} alt="" />
        </div>
    );
};

export default ErrorPage;