//Este componente React representa um formulário de cadastro de usuário. 
//Ele coleta informações como nome, gênero, email, senha, endereço e dados de contato 
//através de diversos campos de entrada. Ao submeter o formulário, a função handleSubmit valida os dados e envia uma requisição POST para a API, 
//cadastrando o usuário no sistema. Se o cadastro for bem-sucedido, o usuário é redirecionado para a página /home. 
//O componente utiliza o axiosInstance para realizar a requisição e o useNavigate para redirecionar o usuário após o cadastro. 
//Além disso, oferece a opção de redirecionamento para a página de login caso o usuário já possua uma conta.

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../axiosConfig';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [numero, setNumero] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [referencia, setReferencia] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.includes("@") &&
      password.length >= 8 &&
      phoneNumber.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== "" &&
      address.trim() !== ""
    ) {
      try {
        const response = await axiosInstance.post('/users/endereco/cadastrar', {
          nome: firstName + " " + lastName,
          cpf,
          sexo: genero,
          email,
          password,
          dataNascimento,
          telefone: phoneNumber,
          cep,
          logradouro: address,
          numero,
          bairro,
          cidade: city,
          estado: state,
          complemento,
          referencia
        });

        if (response.status === 201) {
          alert("Usuário registrado com sucesso!");
          navigate('/home');
        } else {
          alert("Erro ao registrar o usuário.");
        }
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert("Erro ao registrar o usuário.");
      }
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8 text-white min-w-[500px]">
      <div
        id="login_card"
        className="bg-black flex flex-col justify-center items-center w-[70%] rounded-[7px] mb-[50px]"
      >
        <p className="mt-3 text-[1.5rem] text-bold">CADASTRO</p>

        <form onSubmit={handleSubmit} className="text-black w-[60%]">
          <div id="input_group" className="mt-4 mb-4 flex flex-col justify-center items-center w-[100%]">
            <div className="flex w-[100%]">
              <input
                type="text"
                name="firstName"
                placeholder="Nome..."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 mr-3"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Sobrenome..."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 ml-3 mr-3"
              />
              <select
                name="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 ml-3"
              >
                <option value="">Gênero</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className="flex justify-between w-[100%]">
              <input
                type="email"
                name="email"
                placeholder="E-mail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 mr-3"
              />
              <input
                type="text"
                name="cpf"
                placeholder="CPF..."
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 ml-3"
              />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2"
            />
            <div className="flex justify-between w-[100%]">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Telefone..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 ml-3 mr-3"
              />
              <input
                type="date"
                name="dataNascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 ml-3 mr-3"
              />
            </div>
            <p className="mt-2 mb-1 text-[1.5rem] text-bold text-white">ENDEREÇO</p>
            <div className="flex justify-between w-[100%]">
              <input
                type="text"
                name="address"
                placeholder="Endereço..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-[7px] w-[70%] rounded-[7px] mb-2 mt-2 mr-2 flex-grow"
              />
              <input
                type="text"
                name="address"
                placeholder="Nº..."
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="p-[7px] w-[15%] rounded-[7px] mb-2 mt-2 flex-shrink ml-2"
              />
            </div>
            <div className="flex justify-between w-[100%]">
              <input
                type="text"
                name="bairro"
                placeholder="Bairro..."
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 mr-2"
              />
              <input
                type="text"
                name="city"
                placeholder="Cidade..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 ml-2"
              />
            </div>
            <div className="flex justify-between w-[100%]">
              <input
                type="text"
                name="state"
                placeholder="Estado..."
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="p-[7px] w-[70%] rounded-[7px] mb-2 mt-2 mr-2 flex-grow"
              />
              <input
                type="text"
                name="cep"
                placeholder="Cep..."
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="p-[7px] w-[30%] rounded-[7px] mb-2 mt-2 ml-2 flex-shrink"
              />
            </div>

            <div className="flex justify-between w-[100%]">
              <input
                type="text"
                name="complemento"
                placeholder="Complemento..."
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 mr-2"
              />
              <input
                type="text"
                name="referencia"
                placeholder="Referencia..."
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                className="p-[7px] w-[100%] rounded-[7px] mb-2 mt-2 ml-2"
              />
            </div>
          </div>
          <div id="login" className="flex flex-col mb-3 mt-3 text-white justify-center items-center">
            <p>Já possui uma conta?</p>
            <Link to={"/login"} className="hover:underline">
              Logar-se
            </Link>
          </div>

          <button
            type="submit"
            id="loginButton"
            className="bg-white hover:bg-green-950 hover:text-white duration-300 w-[100%] rounded-[7px] p-[7px] text-black font-bold mb-10">
            Cadastrar-se
          </button>
        </form>
      </div >
    </div >
  );
};

export default RegisterPage;
