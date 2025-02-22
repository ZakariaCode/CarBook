import * as React from 'react';
import Forgotpassword from './Forgotpassword';
//import jwt_decode from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login({
    
    setUser
}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [authState, setAuthState] = React.useState('login');
    const navigate = useNavigate();

    //const navigate = useNavigate();
    ///const decoded = jwt_decode(credentialResponse.credential);
       // console.log('User Info:', decoded);
        // Exemple : { email, name, picture }
    //};

    const handleError = () => {
        console.error('Login failed');
    };

    // gestion d'authentification via une API
    const handleLogin = async () => {
        if (email !== '' && password !== '') {
            try {
                const response = await fetch('http://localhost:8080/api/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                const data = await response.json();  // Récupérer la réponse JSON du serveur
    
                if (response.ok) {
                    const storage = rememberMe ? localStorage : sessionStorage;
                    storage.setItem('token', data.token);
                    console.log('Login successful:', data.status);
                    const userRole = data.role;
                    localStorage.setItem('userRole', userRole)
                    //setUser(data.user || email);  // Exemple de gestion de la réponse
                    setAuthState(userRole === 'Admin' ? 'Admin' : 'Client');
                    if (userRole === 'Admin') {
                        setAuthState('Admin');
                        navigate('/admin');
                
                     }else{
                        setAuthState('Client');
                        navigate('/vehicules');

                     }
                    }else {
                    console.error('Error response from API:', data.status);
                    alert(data.message);  // Affichage du message d'erreur envoyé par le backend
                }
            } catch (err) {
                console.error('Login failed:', err);
                alert('An error occurred during login');
            }
        } else {
            alert('Please enter both email and password');
        };
        /*if (userRole === 'Admin') {
            setAuthState('Admin');
            navigate('/admin'); // Rediriger vers la page admin
        } else {
            setAuthState('Client');
            navigate('/client'); // Rediriger vers la page client
        } */}
    
    const handleForgotpassword=async () => {
        navigate("/forgot-password")
    }
    

    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2 mt-20">
                <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100 mt-20">
                    <h1 className="text-3xl font-semibold">Sign in</h1>
                    <p className="font-medium text-lg text-gray-500 mt-4">
                        Welcome back! Please enter your details.
                    </p>
                    <div className="mt-8">
                        <div className="flex flex-col">
                            <label className="text-lg font-medium">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className="text-lg font-medium">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                placeholder="Enter your password"
                                type="password"
                            />
                        </div>
                        <div className="mt-8 flex justify-between items-center">
                    

                      <div>
                          <input 
                            type="checkbox" 
                            id="remember" 
                            checked={rememberMe} 
                            onChange={() => setRememberMe(!rememberMe)} 
                               />
                            <label className="ml-2 font-medium text-base" htmlFor="remember">
                            Remember me for 30 days
                           </label>
                     </div>

                     <button 
                       className="font-medium text-base text-customYellow"
                           onClick={handleForgotpassword}>
                                   Forgot password
                            </button>
                            

                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button
                                onClick={handleLogin}
                                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-customYellow rounded-xl text-white font-bold text-lg"
                            >
                                Sign in
                            </button>
                            <GoogleOAuthProvider clientId="1005441791638-g0kr2a9md7jkg91b9de7drl5nss2jp38.apps.googleusercontent.com">
                            <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                                        fill="#EA4335"
                                    />
                                    <path
                                        d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                                        fill="#4A90E2"
                                    />
                                    <path
                                        d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                                        fill="#FBBC05"
                                    />
                                </svg>
                                Sign in with Google
                            </button>
                            </GoogleOAuthProvider>
                        </div>
                        <div className="mt-8 flex justify-center items-center">
                            <p className="font-medium text-base">Don't have an account?</p>
                            <button
                                onClick={() => navigate("/register")}
                                className="ml-2 font-medium text-base text-customYellow"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
            <div className="relative flex items-center justify-center w-64 h-32 bg-gray-700 rounded-lg shadow-lg">
        {/* Headlights */}
        <div className="absolute top-10 left-0 w-16 h-8 bg-customYellow opacity-0 animate-flash rounded-l-lg"></div>
        <div className="absolute top-10 right-0 w-16 h-8 bg-customYellow opacity-0 animate-flash rounded-r-lg"></div>

        {/* Car Details */}
        <div className="absolute bottom-0 w-full h-12 bg-gray-900 rounded-b-lg"></div>
        <div className="absolute -bottom-6 left-8 w-12 h-12 bg-black rounded-full"></div>
        <div className="absolute -bottom-6 right-8 w-12 h-12 bg-black rounded-full"></div>
      </div>
            </div>
            
        </div>
    );}
export default Login;
