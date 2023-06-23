import "./signin.style.css";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  /** Methodes */
  const onSubmit = (data) => console.log(data);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-alert">
          <p htmlFor="">
            Votre identifiant ou votre mot de passe est incorrect
          </p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Identifiant ou courriel :</label>
          <input {...register("email")} id="email" />
        </div>

        <div className="form-control">
          <label htmlFor="password">Mot de passe</label>
          <input {...register("password")} id="password" type="password" />
        </div>

        <input type="submit" />
        <hr />

        <p className="small">Mot de passe oublié ?</p>
      </form>
    </div>
  );
};

export default SignIn;
