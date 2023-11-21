import { Container, Footer, Header, Main, TableAction } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IProduct, IProductForm, IUser } from "./interfaces";
import api from "../../services/api";
import DataTable from "react-data-table-component";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { FiTrash2, FiEdit, FiLogOut } from "react-icons/fi";

export const Home = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm<IProductForm>();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState<IUser>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<number>();

  useEffect(() => {
    const userStored = localStorage.getItem("LucasUcb@Authentication");

    if (userStored) {
      setUser(JSON.parse(userStored));
    }
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get(`/products`);

      setProducts(data);
    }

    loadProducts();
  }, []);

  const handleDeleteProduct = useCallback(async (id: number) => {
    await api.delete(`/products/${id}`);

    setProducts((oldState) => {
      return oldState.filter((state) => state.id !== id);
    });
  }, []);

  const columns = useMemo(() => {
    const numberFormat = new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format;

    return [
      {
        name: "Nome do produto",
        selector: (row: IProduct) => row.name,
      },
      {
        name: "Preço do produto",
        selector: (row: IProduct) => numberFormat(row.price),
      },
      {
        name: "Quantidade disponível",
        selector: (row: IProduct) => `${row.quantity}x`,
      },
      {
        name: "Descrição",
        selector: (row: IProduct) => row.description || "-",
      },
      {
        name: "Ações",
        cell: (row: IProduct) => {
          return (
            <TableAction>
              <button
                className="warning"
                onClick={() => {
                  setEditing(true);
                  setShowProductForm(true);

                  const { name, price, quantity, description, id } = row;

                  setEditId(id);

                  setValue("name", name);
                  setValue("price", price);
                  setValue("quantity", quantity);
                  setValue("description", description);
                }}
              >
                <FiEdit size={20} color="#fff" />
              </button>

              <button
                className="danger"
                onClick={() => {
                  const confirmed = confirm(
                    "Você tem certeza que quer deletar esse registro?"
                  );

                  if (confirmed) handleDeleteProduct(row.id);
                }}
              >
                <FiTrash2 size={20} color="#fff" />
              </button>
            </TableAction>
          );
        },
      },
    ];
  }, [setValue, handleDeleteProduct]);

  const dataTable = useMemo(() => {
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
    }));
  }, [products]);

  const handleClearForm = useCallback(() => {
    setEditing(false);
    setShowProductForm(false);
    setEditId(undefined);

    setValue("name", "");
    setValue("description", "");
    setValue("price", undefined);
    setValue("quantity", undefined);
  }, [setValue]);

  const handleProductFormSubmit = useCallback(
    async (data: IProductForm) => {
      try {
        if (editing) {
          const { data: updatedProduct } = await api.put(
            `/products/${editId}`,
            data
          );

          setProducts((oldState) => {
            const findIndex = oldState.findIndex(
              (item) => item.id === updatedProduct.id
            );
            const updatedState = [...oldState];

            updatedState[findIndex] = updatedProduct;

            return updatedState;
          });
        } else {
          const { data: productSaved } = await api.post("/products", data);

          setProducts((oldState) => [...oldState, productSaved]);
        }

        enqueueSnackbar(
          `Produto ${editing ? "atualizado" : "criado"} com sucesso!`,
          {
            variant: "success",
            autoHideDuration: 3000,
          }
        );
        handleClearForm();
      } catch (err: any) {
        if (err?.response?.data?.message) {
          enqueueSnackbar(err?.response?.data?.message, {
            variant: "error",
          });
        }
      }
    },
    [enqueueSnackbar, editing, editId, handleClearForm]
  );

  const handleLogout = useCallback(() => {
    localStorage.clear();

    navigate('/');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <span>Olá, {user?.name}</span>

        <div>
          <Link to="/profile">Ver perfil</Link>

          <button onClick={handleLogout}>
            Sair
            <FiLogOut size={20} color="#141414" />
          </button>
        </div>
      </Header>

      <Main>
        <DataTable data={dataTable} columns={columns} striped />
      </Main>

      <Footer>
        {!showProductForm && (
          <button type="button" onClick={() => setShowProductForm(true)}>
            Adicionar novo produto
          </button>
        )}

        {showProductForm && (
          <form onSubmit={handleSubmit(handleProductFormSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, name, value } }) => {
                return (
                  <input
                    name={name}
                    onChange={onChange}
                    placeholder="Nome do produto"
                    defaultValue={value}
                    required
                  />
                );
              }}
            />

            <Controller
              name="price"
              control={control}
              render={({ field: { onChange, name, value } }) => {
                return (
                  <input
                    type="number"
                    max={999999.99}
                    name={name}
                    onChange={onChange}
                    placeholder="Preço"
                    defaultValue={value}
                    required
                  />
                );
              }}
            />

            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, name, value } }) => {
                return (
                  <input
                    name={name}
                    onChange={onChange}
                    placeholder="Descrição"
                    defaultValue={value}
                    required
                  />
                );
              }}
            />

            <Controller
              name="quantity"
              control={control}
              render={({ field: { onChange, name, value } }) => {
                return (
                  <input
                    type="number"
                    min={1}
                    max={999}
                    name={name}
                    onChange={onChange}
                    placeholder="Quantidade"
                    defaultValue={value}
                    required
                  />
                );
              }}
            />

            <button type="button" onClick={handleClearForm}>
              Cancelar
            </button>

            <button
              type="submit"
              style={editing ? { backgroundColor: "gold" } : {}}
            >
              {editing ? "Atualizar" : "Adicionar"}
            </button>
          </form>
        )}
      </Footer>
    </Container>
  );
};
