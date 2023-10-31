import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = e => {
        e.preventDefault();
        const [email, password, accepted] = [e.target.email.value, e.target.password.value, e.target.terms.checked];
        setRegisterError('');
        setSuccessMessage('')

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters!');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have at least one uppercase character!');
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setRegisterError('Password should have at least one number!');
            return;
        }
        else if(!accepted){
            setRegisterError('You must accept our terms and conditions!');
            return;
        }

        // create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccessMessage('User Creation Successful :)')
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            });
    }

    return (
        <div className="w-1/3 mx-auto">
            <h2 className="text-3xl mb-4">Please Register</h2>
            <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit}>
                <input type="email" name="email" className="border-2 border-gray-500 focus:outline-none focus:border-[green] rounded-xl px-3 py-2" placeholder="Email Address" autoFocus required />
                <div className="flex">
                    <input type={showPassword && "text" || "password"} name="password" className="flex-1 border-2 border-r-0 border-gray-500 focus:outline-none focus:border-[green] rounded-l-xl px-3 py-2" placeholder="Password" required />
                    <button onClick={e => {e.preventDefault(); setShowPassword(!showPassword)}} className="btn btn-primary rounded-l-none w-[75px] font-medium text-lg mx-auto lowercase">{showPassword && "hide" || "show"}</button>
                </div>
                <label htmlFor="terms" className="flex gap-4 justify-center items-center text-lg"><input type="checkbox" name="terms" id="terms" />Accept our terms and conditions.</label>
                <br />
                <input type="submit" className="btn btn-primary mx-auto text-xl font-semibold capitalize" value="Submit" />
            </form>
            {
                (successMessage && <p className="text-green-700 text-xl text-center my-3">{successMessage}</p>) || (registerError && <p className="text-red-700 text-xl text-center my-3">{registerError}</p>)
            }
        </div>
    );
};

export default Register;