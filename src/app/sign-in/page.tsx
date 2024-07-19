export const metadata = {
  title: "Sign In | Live Stream Music",
};

export default function SignInPage() {
  return (
    <>
      <h2>Sign In</h2>
      <form>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        ></input>
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
        ></input>
        <br />
        <input type="submit"></input>
      </form>
    </>
  );
}
