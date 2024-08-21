import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const Login = () => {
    const { signIn } = useContext(AuthContext);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(error => console.log(error));
    }

    const handleGoogleLogin = ()=>{

    }
    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col">
                    <h1 className="text-3xl font-bold">Please Login now</h1>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-pink-600 text-white" type="submit" value="login" />
                            </div>
                            <button  onClick={handleGoogleLogin}><FcGoogle className="text-3xl"></FcGoogle>
                            </button>
                        </form>

                        <p className="my-4 text-center">Don't have an accout?<Link className="text-pink-600 font-bold" to='/signup'>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;