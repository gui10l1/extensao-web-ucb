import { useForm, Controller } from "react-hook-form";
import { Container } from "./styles";
import { IForm } from "./interfaces";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../services/api";

export const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<IForm>();

  const handleLogin = useCallback(async (data: IForm) => {
    try {
      const { data: user } = await api.post('/users/login', data);

      localStorage.setItem('LucasUcb@Authentication', JSON.stringify(user));

      navigate('/home');
    } catch (err: any) {
      if (err?.response?.data?.message) {
        enqueueSnackbar(err?.response?.data?.message, {
          variant: 'error',
        });
      }
    }
  }, [navigate, enqueueSnackbar]);

  return (
    <Container>
      <h1>Bem vindo de novo! Entre com a sua conta</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field: { name, onChange } }) => {
              return (
                <input
                  id="email"
                  required
                  type="email"
                  name={name}
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <Controller
            name="password"
            control={control}
            render={({ field: { name, onChange } }) => {
              return (
                <input
                  id="password"
                  required
                  type="password"
                  name={name}
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <div className="link-wrapper">
        <Link to="/sign-up">
          Não tem conta? Faça seu cadastro!
        </Link>
      </div>
    </Container>
  );
};
