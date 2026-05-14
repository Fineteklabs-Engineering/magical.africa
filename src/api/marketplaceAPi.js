import api from './axiosConfig';



// Get all products
export const getAllProducts = async () => {
  const { data } = await api.get('/api/v1/products/all');
  return data;
};

// Get best sellers — active + available, sorted by position, first 4
export const getBestSellerProducts = async () => {
  const { data } = await api.get('/api/v1/products/all');
  return data
    .filter(p => p.active && p.available)
    .sort((a, b) => a.position - b.position)
    .slice(0, 4);
};

// Get products by name
export const getProductsByName = async (name) => {
  const { data } = await api.get(`/api/v1/products/names/${encodeURIComponent(name)}/get/all`);
  return data;
};

// Get available products only
export const getAvailableProducts = async (available = true) => {
  const { data } = await api.get(`/api/v1/products/available/${available}get/all`);
  return data;
};

// Get product by public ID
export const getProductById = async (publicId) => {
  const { data } = await api.get(`/api/v1/products/ids/${publicId}/get`);
  return data;
};

// Get all products by listing category
export const getProductsByListingCategory = async (categoryId) => {
  const { data } = await api.get(`/api/v1/products/listing/${categoryId}/all`);
  return data;
};

// Get products by department ID
export const getProductsByDepartmentId = async (departmentId) => {
  const { data } = await api.get(`/api/v1/departments/ids/${departmentId}/products`);
  return data;
};

//DEPARTMENT CATEGORIES 
// Get all department categories
export const getAllDepartmentCategories = async () => {
  const { data } = await api.get('/api/v1/departments/categories/all');
  return data;
};

// Get department category by name (single)
export const getDepartmentCategoryByName = async (name) => {
  const { data } = await api.get(`/api/v1/departments/categories/names/${encodeURIComponent(name)}`);
  return data;
};

// Get ALL department categories by name
export const getAllDepartmentCategoriesByName = async (name) => {
  const { data } = await api.get(`/api/v1/departments/categories/names/${encodeURIComponent(name)}/all`);
  return data;
};

// Get department category by ID
export const getDepartmentCategoryById = async (departmentCategoryId) => {
  const { data } = await api.get(`/api/v1/departments/categories/ids/${departmentCategoryId}`);
  return data;
};

// Get all department categories by listing section ID
export const getDepartmentCategoriesBySectionId = async (listingSectionId) => {
  const { data } = await api.get(`/api/v1/listings/ids/${listingSectionId}/departments/categories/`);
  return data;
};


// ─── AUTH 

export const signin = async (email, password) => {
  const { data } = await api.post('/users/auth/signin', { email, password });
  if (data.token) {
    localStorage.setItem('ma_token', data.token);
    localStorage.setItem('ma_refresh_token', data.refresh_token);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  }
  return data;
};