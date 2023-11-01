import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [forgotError, setForgotError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);


    const handleSubmit = e => {
        e.preventDefault();
        const [email, password] = [emailRef.current.value, e.target.password.value];
        setLoginError('');
        setSuccessMessage('')
        setForgotError('');

        if (password.length < 6) {
            setLoginError('Password should be at least 6 characters!');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setLoginError('Password should have at least one uppercase character!');
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setLoginError('Password should have at least one number!');
            return;
        }

        // login user with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccessMessage('User Login Successful :)')
                setUser(result.user);
            })
            .catch(error => {
                console.error(error);
                setLoginError(error.message);
            });
    }

    // handle forgot password
    const handleForgotPassword = () => {
        setSuccessMessage('');
        setLoginError('');
        setForgotError('');

        const email = emailRef.current.value;
        if (!email) {
            setForgotError('Please provide an email address!');
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setForgotError('Invalid email! Provide a valid email address.')
            return;
        }
        // requesting forgot email
        sendPasswordResetEmail(auth, email)
            .then(() => alert("Check your email"))
            .catch(error => setForgotError(error.message));
    }

    return (
        <div className="w-1/3 mx-auto">
            <h2 className="text-3xl mb-4">Please Login</h2>
            <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit}>
                <input type="email" name="email" ref={emailRef} className="border-2 border-gray-500 focus:outline-none focus:border-[green] rounded-xl px-3 py-2" placeholder="Email Address" autoFocus required />
                <div className="flex">
                    <input type={showPassword && "text" || "password"} name="password" className="flex-1 border-2 border-r-0 border-gray-500 focus:outline-none focus:border-[green] rounded-l-xl px-3 py-2" placeholder="Password" required />
                    <button onClick={e => { e.preventDefault(); setShowPassword(!showPassword) }} className="btn btn-primary rounded-l-none w-[75px] font-medium text-lg mx-auto lowercase">{showPassword && "hide" || "show"}</button>
                </div>
                <p className="mx-auto select-none">Forgot password? <span className="font-medium py-1 px-2 bg-[#dddeee] rounded-lg cursor-pointer active:text-[15px] transition-all" onClick={handleForgotPassword}>Send Email</span></p>
                <br />
                <input type="submit" className="btn btn-primary mx-auto text-xl font-semibold capitalize" value="Login" />
            </form>
            {
                (successMessage && <div><p className="text-green-700 text-xl text-center my-3">{successMessage}</p><h2 className="text-black text-xl text-center font-semibold">Welcome, <span className="text-green-700 text-2xl">{user.displayName || user.email}!</span></h2></div>) || (forgotError && <p className="text-red-700 text-xl text-center my-3">{forgotError}</p>) || (loginError ? <><p className="text-red-700 text-xl text-center my-3">{loginError}</p><p className="text-center">New to this website? Register <Link className="text-lg font-medium" to={'/register'}>Here</Link></p></> : <p className="text-center">New to this website? Register <Link className="text-lg font-medium" to={'/register'}>Here</Link></p>)
            }
        </div>
    );
};

export default Login;