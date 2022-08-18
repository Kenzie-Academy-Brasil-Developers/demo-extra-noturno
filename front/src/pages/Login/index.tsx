import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { useAuth } from "../../providers/AuthProvider";

interface SignInData {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  const onSubmit = (data: SignInData) => {
    console.log(data);
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <button>Enviar</button>
    </form>
  );
};

export default Login;
