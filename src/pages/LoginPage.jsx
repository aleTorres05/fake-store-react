import { login } from "../api";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(data) {
    try {
      const token = await login(data.username, data.password);
      if (token) {
        window.localStorage.setItem("token", token);
        navigate("/productos");
      } else {
        toast.error("Usuario o contraseña incorrecta");
        setError("root.credentials", {
          type: "manual",
          message: "Credenciales invalidas",
        });
      }
    } catch (error) {
      toast.error("Error al iniciar session");
      console.error("[login error]", error);
    }
  }

  function handleShowHidePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <main className="flex justify-center flex-col items-center w-full min-h-dvh">
      <h1 className="text-4xl font-bold text-center">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          "border border-white/50 rounded p-4 flex flex-col gap-4 max-w-sm w-full ",
          {
            "border-red-500": errors.root?.credentials,
          }
        )}
      >
        <input
          type="text"
          className="border rounded p-2 text-black"
          {...register("username", {
            required: { value: true, message: "Nombre de usario requerido" },
          })}
        />
        <input
          type={showPassword ? "text" : "password"}
          className="border rounded p-2 text-black"
          {...register("password", {
            required: { value: true, message: "Contrasña requerido" },
          })}
        />
        <span
          onClick={handleShowHidePassword}
          className="text-sx text-white/50 cursor-pointer hover:text-white"
        >
          {showPassword ? "🙈 Hide" : "🙉 Show"} Password
        </span>
        <button className="bg-teal-400 border rounded border-black">
          Ingresar
        </button>
        {errors.root?.credentials && (
          <p className="text-red-500 text-center">Credenciales Invalidas</p>
        )}
      </form>
    </main>
  );
}
