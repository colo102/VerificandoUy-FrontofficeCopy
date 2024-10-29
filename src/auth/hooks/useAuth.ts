import {
  LoginArgs,
  RegisterUsuarioArgs,
} from "../../store/apis/types/verificandoUy.types";
import {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from "../../store/apis/verificandoUyBackend/verificandoUyBackend.api";
import { useAppDispatch } from "../../store/hooks/storeHooks";
import { LogoutArgs } from "../../store/apis/types/verificandoUy.types";
import {
  addError,
  addSuccess,
  addUser,
  loadingOff,
  loadingOn,
  removeUser,
} from "../../store/verificandoUy/verificandoUySlice";

const useAuth = () => {
  const [loginTrigger] = useLoginMutation();
  const [signupTrigger] = useSignupMutation();
  const [logoutTrigger] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const onSuccess = (message: string) => {
    dispatch(loadingOff());
    dispatch(addSuccess({ successMessage: message }));
  };

  const onError = (
    error: unknown,
    action: "loguearse" | "desloguearse" | "registrarse"
  ) => {
    dispatch(loadingOff());
    const errorMessage =
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof error.data === "string"
        ? error.data
        : `Algo salio mal al tratar de ${action}`;
    dispatch(addError({ errorMessage }));
  };

  const login = async (credentials: LoginArgs) => {
    try {
      dispatch(loadingOn());
      const token = await loginTrigger(credentials).unwrap();
      //TODO:centralizar despues esta funcion dentro del onSuccess si despues de registrar a un usuario se le haga login automatico.
      dispatch(addUser({ token }));
      //TODO:centralizar esta funcion para que varios componentes puedan reutilizarla al querer guardar algun dato en el localstorage
      localStorage.setItem("token", token);
      onSuccess("¡logueado exitosamente!");
    } catch (error: unknown) {
      console.log(error);
      onError(error, "loguearse");
    }
  };

  const signup = async (userData: RegisterUsuarioArgs) => {
    try {
      dispatch(loadingOn());
      const message = await signupTrigger(userData).unwrap();
      onSuccess(message);
    } catch (error) {
      onError(error, "registrarse");
    }
  };

  const logout = async ({ jwt }: LogoutArgs) => {
    try {
      dispatch(loadingOn());
      const message = await logoutTrigger({ jwt }).unwrap();
      dispatch(removeUser());
      localStorage.removeItem("token");
      onSuccess(message);
    } catch (error) {
      console.log(error);
      onError(error, "desloguearse");
    }
  };

  return { login, signup, logout };
};

export default useAuth;
