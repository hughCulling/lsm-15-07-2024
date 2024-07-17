export const metadata = {
  title: "Sign Up | Live Stream Music",
};

export default function SignUpPage() {
  return (
    <>
      <h2>Sign Up</h2>
      <form method="post">
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" autoComplete="name"></input>
        <br />
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
