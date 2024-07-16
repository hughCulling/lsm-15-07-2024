export default function SignInPage() {
  return (
    <>
      <h2>Sign In</h2>
      <form method="post">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
        ></input>
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
        ></input>
        <br />
        <input type="submit"></input>
      </form>
    </>
  );
}
