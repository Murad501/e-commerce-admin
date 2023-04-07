export const saveUser = (user) => {
  fetch(`https://e-commerce-admin-server-tawny.vercel.app/user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then(() => {});
};
