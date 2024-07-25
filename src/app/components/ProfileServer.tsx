// Profile information is available through the 'user' property exposed by 'getSession()' function.
// This is an example of how to use it in a Server Component.
import { getSession } from "@auth0/nextjs-auth0";

// export default async function ProfileServer() {
//   const { user } = await getSession();

//   return (
//     user && (
//       <div>
//         {/* <img src={user.picture} alt={user.name} /> */}
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//       </div>
//     )
//   );
// }
