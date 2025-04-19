const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProduct(id, category) {
  try {
    const response = await fetch(
      `${apiUrl}/api/product/search/${category}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Need to check this function cuz its AI generated
export async function fetchProducts(category) {
  try {
    const response = await fetch(`${apiUrl}/api/product/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function loginCustomer(customer) {
  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
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
}

export async function registerCustomer(customer) {
  try {
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error registering customer: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error registering customer:", error);
    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await fetch(`${apiUrl}/api/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
