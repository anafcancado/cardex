const API_URL = 'http://localhost:3001/api';

// Salvar token no localStorage
export const saveToken = (token) => {
  localStorage.setItem('cardex_token', token);
};

// Obter token do localStorage
export const getToken = () => {
  return localStorage.getItem('cardex_token');
};

// Remover token do localStorage
export const removeToken = () => {
  localStorage.removeItem('cardex_token');
};

// Salvar usuário no localStorage
export const saveUser = (user) => {
  localStorage.setItem('cardex_user', JSON.stringify(user));
};

// Obter usuário do localStorage
export const getUser = () => {
  const user = localStorage.getItem('cardex_user');
  return user ? JSON.parse(user) : null;
};

// Remover usuário do localStorage
export const removeUser = () => {
  localStorage.removeItem('cardex_user');
};

// Verificar se está autenticado
export const isAuthenticated = () => {
  return !!getToken();
};

// Cadastro
export const register = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao cadastrar');
    }

    // Salvar token e usuário
    saveToken(data.token);
    saveUser(data.user);

    return data;
  } catch (error) {
    throw error;
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao fazer login');
    }

    // Salvar token e usuário
    saveToken(data.token);
    saveUser(data.user);

    return data;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logout = () => {
  removeToken();
  removeUser();
};

// Obter perfil do usuário
export const getProfile = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao buscar perfil');
    }

    return data.user;
  } catch (error) {
    throw error;
  }
};
