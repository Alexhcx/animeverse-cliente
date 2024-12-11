//Este componente React implementa um formulário de login com validação de email e senha. 
//Ele captura as entradas do usuário para email e senha, exibindo mensagens de erro caso os 
//formatos estejam inválidos. Ao submeter o formulário, ele envia uma requisição POST para a API 
//usando axiosInstance. Se a autenticação for bem-sucedida (status 200), o componente armazena os 
//dados do usuário no localStorage, exibe um alerta de sucesso e redireciona o usuário para a página inicial (/), 
//recarregando a página para refletir as mudanças de login. Em caso de erro, mensagens informativas são exibidas 
//ao usuário. O componente utiliza useState para gerenciar o estado dos campos de entrada, mensagens de erro e 
//useNavigate para lidar com o redirecionamento.


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../axiosConfig'; // Importe sua configuração do axios

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      setEmailError("");
    } else {
      setEmailError("Por favor, insira um email válido.");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordError("");
    } else {
      setPasswordError("Sua senha deve ter pelo menos 8 caracteres.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
        try {
            const response = await axiosInstance.post('/users/login', {
                email,
                password
            });
            if (response.status === 200) { 
                alert("Login bem-sucedido!"); 
                const userData = response.data; 
                localStorage.setItem('userId', userData.id); 
                localStorage.setItem('userName', userData.nome); 
                navigate('/');
                window.location.reload(); 
            } else {
                setLoginError("Email ou senha inválidos."); 
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setLoginError("Erro ao fazer login. Por favor, tente novamente."); 
        }
    }
};

  return (
      <div className="flex justify-center items-center text-white mt-[100px] mb-[175px] ml-10 mr-10">
        <div
            id="login_card"
            className="bg-black flex justify-center items-center p-6 m-10 w-[50%] rounded-[7px] flex-col"
        >
          <span className="mt-1 mb-1 text-[1.5rem] font-bold">LOGIN</span>

          <form action="" onSubmit={handleSubmit} className="flex-row items-center">
            <div id="input_group" className="mt-6 text-black flex-row justify-center items-center">
              <input
                  type="email"
                  name="email-login"
                  id="email-login"
                  placeholder="E-mail..."
                  className={`p-[7px] w-[300px] m-3 flex justify-center items-center rounded-[7px] ${emailError ? "border-red-500" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
              />
              {emailError && <p className="text-black flex justify-center">{emailError}</p>}

              <input
                  type="password"
                  name="password-login"
                  id="password-login"
                  placeholder="Senha..."
                  className={`p-[7px] w-[300px] rounded-[7px] m-3 text-black ${passwordError ? "border-red-500" : ""}`}
                  value={password}
                  onChange={handlePasswordChange}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>

            {loginError && <p className="text-red-500">{loginError}</p>}

            <div id="cadastro" className="flex flex-col items-center mb-3">
              <span>Ainda não tem uma conta?</span>
              <Link to={"/register"} className="hover:underline">Cadastre-se</Link>
            </div>

            <button
                type="submit"
                id="loginButton"
                className="bg-white hover:bg-green-950 hover:text-white duration-300 w-[300px] rounded-[7px] p-[7px] m-3 text-black font-bold">
              Entrar
            </button>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;
