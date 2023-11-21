import { useCallback } from "react";
import { Container } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { IForm } from "./interfaces";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useSnackbar } from 'notistack';

export const SignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<IForm>();

  const handleLogin = useCallback(async (data: IForm) => {
    try {
      const { password, confirmPassword } = data;

      if (password !== confirmPassword) {
        enqueueSnackbar('As senhas não são iguais!', {
          variant: 'info',
        });
        return;
      }

      await api.post(`/users`, {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });

      enqueueSnackbar('Cadastro feito com sucesso!', {
        variant: 'success',
        onClose: () => {
          navigate('/login');
        },
      });
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
      <h1>Faça seu cadastro!</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label htmlFor="name">Nome</label>
          <Controller
            name="name"
            control={control}
            render={({ field: { name, onChange } }) => {
              return (
                <input
                  id="name"
                  required
                  type="text"
                  name={name}
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

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
          <label htmlFor="phone">Celular</label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { name, onChange } }) => {
              return (
                <input
                  id="phone"
                  required
                  type="text"
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

        <div>
          <label htmlFor="confirmPassword">Confirme sua senha</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { name, onChange } }) => {
              return (
                <input
                  id="confirmPassword"
                  required
                  type="password"
                  name={name}
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        <button type="submit">Finalizar cadastro</button>
      </form>

      <div className="link-wrapper">
        <Link to="/login">
          Já tem conta? Entre com suas credenciais!
        </Link>
      </div>
    </Container>
  );
}