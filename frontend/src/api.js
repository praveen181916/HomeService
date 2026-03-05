// API Configuration
const API_BASE = 'http://localhost:5000/api';

// ========== AUTH ========== //
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  } catch (err) {
    throw err;
  }
}

// Auth functions
async function register(name, email, password, phone) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, phone })
  });
}

async function login(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

async function getProfile() {
  return apiRequest('/auth/me');
}

// Service functions
async function getServices(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/services${query ? '?' + query : ''}`);
}

async function getService(id) {
  return apiRequest(`/services/${id}`);
}

async function createService(data) {
  return apiRequest('/services', { method: 'POST', body: JSON.stringify(data) });
}

async function updateService(id, data) {
  return apiRequest(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

async function deleteService(id) {
  return apiRequest(`/services/${id}`, { method: 'DELETE' });
}

// Booking functions
async function createBooking(data) {
  return apiRequest('/bookings', { method: 'POST', body: JSON.stringify(data) });
}

async function getUserBookings() {
  return apiRequest('/bookings/my');
}

async function getAllBookings(status = '') {
  return apiRequest(`/bookings${status ? '?status=' + status : ''}`);
}

async function updateBookingStatus(id, status) {
  return apiRequest(`/bookings/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
}

async function cancelBooking(id) {
  return apiRequest(`/bookings/${id}/cancel`, { method: 'PUT' });
}

async function getAnalytics() {
  return apiRequest('/bookings/analytics');
}

// Provider functions
async function getProviders() {
  return apiRequest('/providers');
}

async function createProvider(data) {
  return apiRequest('/providers', { method: 'POST', body: JSON.stringify(data) });
}

async function deleteProvider(id) {
  return apiRequest(`/providers/${id}`, { method: 'DELETE' });
}

// ========== HELPERS ========== //
function getUser() {
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : null;
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

function isAdmin() {
  const user = getUser();
  return user && user.role === 'admin';
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function showNotification(message, type = 'success') {
  let notif = document.getElementById('notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notification';
    notif.className = 'notification';
    notif.innerHTML = `<span class="notification-icon"></span><span class="notification-msg"></span>`;
    document.body.appendChild(notif);
  }
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  notif.querySelector('.notification-icon').textContent = icon;
  notif.querySelector('.notification-msg').textContent = message;
  notif.style.borderLeftColor = type === 'success' ? '#0d9488' : type === 'error' ? '#ef4444' : '#3b82f6';
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 3500);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// Nav active state
function setActiveNav() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.navbar-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Hamburger menu
function initHamburger() {
  const ham = document.querySelector('.hamburger');
  const links = document.querySelector('.navbar-links');
  if (ham && links) {
    ham.addEventListener('click', () => links.classList.toggle('open'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initHamburger();

  // Update navbar based on login state
  const loginLink = document.getElementById('nav-login');
  const userMenu = document.getElementById('nav-user');
  const user = getUser();

  if (loginLink && userMenu) {
    if (isLoggedIn() && user) {
      loginLink.style.display = 'none';
      userMenu.style.display = 'flex';
      const nameEl = document.getElementById('nav-user-name');
      if (nameEl) nameEl.textContent = user.name.split(' ')[0];
    } else {
      loginLink.style.display = '';
      userMenu.style.display = 'none';
    }
  }
});
