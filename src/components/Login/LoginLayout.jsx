import { AiOutlineUser } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import HeadLayoutDynamic from "../globals/HeadLayoutDynamic";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { url } from "../../lib/urlFecth";

export default function LoginLayout() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    //guardar sesion si se usa la checkbox
    const remember = document.getElementById("remember").checked;

    const res = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    if (res.status === 200) {
      if (remember) {
        localStorage.setItem("remember", true);
        localStorage.setItem("username", credentials.username);
      } else {
        localStorage.setItem("remember", false);
        localStorage.removeItem("username");
      }
      router.push("/dashboard");
    }
    if (res.status === 404) {
      setModalDescription("Usuario no encontrado");
      setShowModal(true);
    }
    if (res.status === 500) {
      setModalDescription("Error en el servidor");
      setShowModal(true);
    }
    if (res.status === 401) {
      setModalDescription("Contraseña incorrecta");
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (localStorage.remember === true) {
      setCredentials({
        ...credentials,
        username: localStorage.username,
      });
      let remember = document.getElementById("remember");
      remember.checked = true;
    }
  }, []);

  return (
    <>
      <HeadLayoutDynamic
        title="ERP KARAZ"
        description="Sistema de Gestion Documentaria, Contable y Ventas."
        keywords="ERP, KARAZ, SISTEMA, GESTION, DOCUMENTARIA, CONTABLE, VENTAS"
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
            <div className="w-3/5 p-5">
              <div className="text-left font-bold">
                <span>AIBR </span>
                <span className="text-red-500">KARAZ</span>
              </div>
              <div className="py-10">
                <h2 className="text-3xl font-bold text-red-500 mb-2">
                  ERP KARAZ
                </h2>
                <div className="border-2 w-10 border-red-500 inline-block mb-2"></div>
                <p className="text-gray-400 my-3">
                  Introduce tus datos de ingreso
                </p>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <AiOutlineUser className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Usuario"
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                      className="bg-gray-100 border-none outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400" />
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                      placeholder="Contraseña"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                      className="bg-gray-100 border-none outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="flex items-center justify-between w-64 mt-1">
                    <div>
                      <label
                        className="block text-gray-500 font-bold"
                        htmlFor="remember"
                      >
                        <input
                          className="ml-2 leading-tight"
                          type="checkbox"
                          id="remember"
                          name="remember"
                        />
                        <span className="text-sm">Recordar</span>
                      </label>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-orange-500 hover:text-orange-800 cursor-pointer">
                        Olvide mi contraseña
                      </p>
                    </div>
                  </div>
                  <button
                    className="border-2 border-red-500 text-red-500 mt-10 rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-500 hover:text-white disabled:opacity-30"
                    onClick={() => handleSubmit()}
                    disabled={credentials.username === ""}
                  >
                    Ingresar
                  </button>
                </div>
              </div>
              {showModal && (
                <div role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    {"Error"}
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{modalDescription}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="w-2/5 bg-red-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
              <h2 className="text-3xl font-bold mb-2">Bienvenido!</h2>
              <div className="border-2 w-10 border-white inline-block mb-2"></div>
              <p className="mb-2">
                Sistema de Gestion Documentaria, Contable y Ventas.
              </p>
              <p className="mb-2">
                Si no eres un trabajador de la empresa puedes visitar nuestra
                pagina en el siguiente link
              </p>
              <Link
                href="http://aibrkaraz.com"
                className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-red-500"
              >
                Website
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
