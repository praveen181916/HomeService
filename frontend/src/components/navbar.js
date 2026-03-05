// Reusable navbar utility
function initNavbar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const authBtn = document.getElementById('authBtn');
  if (authBtn && user) {
    authBtn.textContent = user.role === 'admin' ? '⚙️ Admin' : `👤 ${user.name.split(' ')[0]}`;
    authBtn.href = user.role === 'admin' ? 'admin.html' : 'bookings.html';
  }
}
