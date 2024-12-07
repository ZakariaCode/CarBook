import React, { useState } from "react";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  const [authState, setAuthState] = useState('login');

  return (
    <div>
     {authState === 'login' && <Login setAuthState={setAuthState} />}
     {authState === 'register' && <Register setAuthState={setAuthState} />}
    </div>
  );
}

export default App;

/*
 return (
  <div className="min-h-screen flex items-center justify-center bg-white">
    {userType === "" ? (
    // Choix entre Admin et Client
    <div className="w-full h-screen flex">
      {/* Partie Admin - Fond noir, texte blanc} 
      <div
      className="w-1/2 h-full bg-black text-white flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-white hover:text-black hover:scale-105 shadow-2xl transform"
      onClick={() => setUserType("admin")}
      >
      <button className="text-4xl font-bold shadow-md hover:shadow-lg transition duration-500 w-full h-full flex items-center justify-center">
        Admin
      </button>
      </div>

      //Partie Client - Fond orange, texte blanc 
      <div
      className="w-1/2 h-full bg-orange-500 text-white flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-white hover:text-orange-500 hover:scale-105 shadow-2xl transform"
      onClick={() => setUserType("client")}
      >
      <button className="text-4xl font-bold shadow-md hover:shadow-lg transition duration-500 w-full h-full flex items-center justify-center">
        Client
      </button>
      </div>
    </div>
    ) : userType === "admin" ? (
    // Page de login pour Admin
    <div className="w-full max-w-md bg-neutral-800 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-400">Connexion Admin</h2>
      <form>
      <div className="mb-6">
        <label className="block text-lg mb-2 text-white">Nom d'utilisateur</label>
        <input
        type="text"
        className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
        placeholder="Entrez votre nom d'utilisateur"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg mb-2 text-white">Mot de passe</label>
        <input
        type="password"
        className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
        placeholder="Entrez votre mot de passe"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-400 hover:bg-orange-500 py-3 rounded-lg text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
      >
        Connexion
      </button>
      </form>
    </div>
    ) : (
    // Page de Login et Signup pour Client
    <div className="w-full max-w-md bg-neutral-100 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-400">
      {isSignUp ? "Créer un compte" : "Connexion Client"}
      </h2>
      <form>
      {isSignUp && (
        <>
        <div className="mb-6">
          <label className="block text-lg mb-2 text-black">Nom</label>
          <input
          type="text"
          className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          placeholder="Entrez votre nom"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-black">Email</label>
          <input
          type="email"
          className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          placeholder="Entrez votre email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-black">CIN</label>
          <input
          type="text"
          className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          placeholder="Entrez votre CIN"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-black">Adresse</label>
          <input
          type="text"
          className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          placeholder="Entrez votre adresse"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-black">Ville</label>
          <input
          type="text"
          className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          placeholder="Entrez votre ville"
          />
        </div>
      </>
      )}

      <div className="mb-6">
        <label className="block text-lg mb-2 text-black">Mot de passe</label>
        <input
        type="password"
        className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
        placeholder="Entrez votre mot de passe"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg mb-2 text-black">Confirmer le mot de passe</label>
        <input
        type="password"
        className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
        placeholder="Confirmez votre mot de passe"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-400 hover:bg-orange-500 py-3 rounded-lg text-lg font-semibold shadow-lg transform transition-all duration-300
        {isSignUp ? "Créer mon compte" : "Connexion"}
      </button>
      </form>

      //{ Partie pour basculer entre Connexion et Inscription }
      <div className="text-center mt-4">
      <p className="mb-2 text-black">
        {isSignUp ? "Déjà un compte ?" : "Pas de compte ?"}
      </p>
      <button
        className="bg-transparent text-orange-400 hover:underline text-lg"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Se connecter" : "Créer un compte"}
      </button>
      </div>
    </div>
    )}
  </div>
  );
        // Choix entre Admin et Client
        <div className="w-full h-screen flex">
          //{ Partie Admin - Fond noir, texte blanc }
          <div
            className="w-1/2 h-full bg-black text-white flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-white hover:text-black hover:scale-105 shadow-2xl transform"
            onClick={() => setUserType("admin")}
          >
            <button className="text-4xl font-bold shadow-md hover:shadow-lg transition duration-500 w-full h-full flex items-center justify-center">
              Admin
            </button>
          </div>

          //{ Partie Client - Fond orange, texte blanc }
          <div
            className="w-1/2 h-full bg-orange-500 text-white flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-white hover:text-orange-500 hover:scale-105 shadow-2xl transform"
            onClick={() => setUserType("client")}
          >
            <button className="text-4xl font-bold shadow-md hover:shadow-lg transition duration-500 w-full h-full flex items-center justify-center">
              Client
            </button>
          </div>
        </div>
      ) : userType === "admin" ? (
        // Page de login pour Admin
        <div className="w-full max-w-md bg-neutral-800 p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-400">Connexion Admin</h2>
          <form>
            <div className="mb-6">
              <label className="block text-lg mb-2 text-white">Nom d'utilisateur</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                placeholder="Entrez votre nom d'utilisateur"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg mb-2 text-white">Mot de passe</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                placeholder="Entrez votre mot de passe"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 py-3 rounded-lg text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Connexion
            </button>
          </form>
        </div>
      ) : (
        // Page de Login et Signup pour Client
        <div className="w-full max-w-md bg-neutral-100 p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-400">
            {isSignUp ? "Créer un compte" : "Connexion Client"}
          </h2>
          <form>
            {isSignUp && (
              <>
                <div className="mb-6">
                  <label className="block text-lg mb-2 text-black">Nom</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                    placeholder="Entrez votre nom"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-lg mb-2 text-black">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                    placeholder="Entrez votre email"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-lg mb-2 text-black">CIN</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                    placeholder="Entrez votre CIN"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-lg mb-2 text-black">Adresse</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                    placeholder="Entrez votre adresse"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-lg mb-2 text-black">Ville</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                    placeholder="Entrez votre ville"
                  />
                </div>
            </>
            )}

            <div className="mb-6">
              <label className="block text-lg mb-2 text-black">Mot de passe</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                placeholder="Entrez votre mot de passe"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg mb-2 text-black">Confirmer le mot de passe</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                placeholder="Confirmez votre mot de passe"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 py-3 rounded-lg text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              {isSignUp ? "Créer mon compte" : "Connexion"}
            </button>
          </form>

          //{ Partie pour basculer entre Connexion et Inscription }
          <div className="text-center mt-4">
            <p className="mb-2 text-black">
              {isSignUp ? "Déjà un compte ?" : "Pas de compte ?"}
            </p>
            <button
              className="bg-transparent text-orange-400 hover:underline text-lg"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Se connecter" : "Créer un compte"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
*/

