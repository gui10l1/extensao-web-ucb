import { useCallback, useEffect, useState } from "react";
import { Container, Header } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { IForm, IUser } from "./interfaces";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useSnackbar } from "notistack";
import { FiLogOut } from "react-icons/fi";

export const Profile = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<IForm>();

  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStored = localStorage.getItem("LucasUcb@Authentication");

    if (userStored) {
      setUser(JSON.parse(userStored));
    }

    setLoading(false);
  }, []);

  const handleUpdateUser = useCallback(
    async (data: IForm) => {
      try {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
          enqueueSnackbar("As senhas não são iguais!", {
            variant: "info",
          });
          return;
        }

        await api.put(`/users/${user?.id}`, {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        });

        enqueueSnackbar("Perfil atualizado com sucesso!", {
          variant: "success",
        });
      } catch (err: any) {
        if (err?.response?.data?.message) {
          enqueueSnackbar(err?.response?.data?.message, {
            variant: "error",
          });
        }
      }
    },
    [enqueueSnackbar, user]
  );

  const handleLogout = useCallback(() => {
    localStorage.clear();

    navigate("/");
  }, [navigate]);

  return (
    <>
      <Header>
        <span>Olá, {user?.name}</span>

        <div>
          <Link to="/home">Dashboard</Link>

          <button onClick={handleLogout}>
            Sair
            <FiLogOut size={20} color="#141414" />
          </button>
        </div>
      </Header>

      <Container>
        <h1>Seus dados...</h1>

        {!loading && user && (
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div>
              <label htmlFor="name">Nome</label>
              <Controller
                name="name"
                control={control}
                defaultValue={user.name}
                render={({ field: { name, onChange, value } }) => {
                  return (
                    <input
                      id="name"
                      required
                      type="text"
                      name={name}
                      onChange={onChange}
                      defaultValue={value}
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
                defaultValue={user.email}
                render={({ field: { name, onChange, value } }) => {
                  return (
                    <input
                      id="email"
                      required
                      type="email"
                      name={name}
                      onChange={onChange}
                      defaultValue={value}
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
                defaultValue={user.phone}
                render={({ field: { name, onChange, value } }) => {
                  return (
                    <input
                      id="phone"
                      required
                      type="text"
                      name={name}
                      onChange={onChange}
                      defaultValue={value}
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
                defaultValue={user.password}
                render={({ field: { name, onChange, value } }) => {
                  return (
                    <input
                      id="password"
                      required
                      type="text"
                      name={name}
                      onChange={onChange}
                      defaultValue={value}
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
                      type="text"
                      name={name}
                      onChange={onChange}
                    />
                  );
                }}
              />
            </div>

            <button type="submit">Atualizar meus dados</button>
          </form>
        )}
      </Container>
    </>
  );
};
