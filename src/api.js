const API_URL = "https://dummyjson.com";
const token = localStorage.getItem("token");

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const json = await response.json();
  return json.token;
}

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();

  return json.products;
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
}
