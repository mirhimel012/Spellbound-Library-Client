import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const {signInUser} = useAuth();
    const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const{email, password} = data;
    signInUser(email, password)
      .then(result => {
        console.log(result.user);// issue
        // const from = '/';
      })
      .catch(error =>{
        console.log(error)
      })
  };

  // Social Login Auth Receive
  const {googleLogin} = useAuth();

  // navigation system
  const navigate = useNavigate()
  const location = useLocation()
  const from = location ?.state || '/'

  const handleSocialLogin = socialProvider => {
    socialProvider().then(result => {
      if(result.user){
        navigate(from);
      }
    })
  }
    return (
        <div className="m-10">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
    
    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
            <img className="w-10 md:w-14" src="https://i.ibb.co/4dDWk3Q/books.png" alt=""/>
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
        </p>

        <button onClick={()=>handleSocialLogin(googleLogin)} className="w-full flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="px-4 py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
        </button>

        <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                with email</a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email" type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
          <span className="absolute mt-14 ml-48 lg:ml-72" onClick={()=> setShowPassword(!showPassword)}>
	            {
	              showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
	            }
            </span>
          {errors.password && <span className="text-red-500">This field is required</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <div className="text-center text-xl mt-2">      
	       <p>New Here? Please <Link className="text-lime-600 font-bold" to="/register">Register</Link></p>
        </div>
      </form>
    </div>
    
    <div className="hidden bg-cover lg:block lg:w-1/2"><img className="h-full" src="https://i.ibb.co/DWDY1v8/reading-8575569-1280.jpg" alt="" />
    </div>
</div>
        </div>
    );
};

export default Login;