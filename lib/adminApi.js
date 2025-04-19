const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function loginAdmin(admin) {
  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
      credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`Error logging in: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export async function addUser(user) {
  try {
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`Error adding user: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const response = await fetch(`${apiUrl}/api/admin/get-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export async function addProduct(product) {
  try {
    const response = await fetch(`${apiUrl}/api/admin/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
      credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`Error adding product: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};