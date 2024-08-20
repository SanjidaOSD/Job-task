import { Link } from "react-router-dom";

const SignUp = () => {
    const handleSignUp = event =>{
        event.preventDefault();
    }
    return (
        <div>
        <div className="hero">
            <div className="hero-content flex-col">
                <h1 className="text-3xl font-bold">Please Sign Up</h1>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignUp} className="card-body">
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
                    </form>
                    <p className="my-4 text-center">Allready have an accout?<Link className="text-pink-600 font-bold" to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default SignUp;