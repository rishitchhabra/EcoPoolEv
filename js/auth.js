/**
 * EcoPool EV — Auth Utility
 * Shared across all pages. Handles auth state in navbar.
 */

const Auth = {
  // Check if user is logged in and return user data
  async getUser() {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) return null;
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  // Logout
  async logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch { /* ignore */ }
    window.location.href = '/login.html';
  },

  // Update navbar based on auth state
  async updateNavbar() {
    const user = await this.getUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return user;

    // Find the login button
    const loginBtn = navLinks.querySelector('.nav-login-btn');
    if (!loginBtn) return user;

    if (user) {
      // Replace login button with user menu
      loginBtn.outerHTML = `
        <div class="nav-user-menu" style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 0.875rem; color: var(--emerald-200);">Hi, <strong>${user.name.split(' ')[0]}</strong></span>
          <button onclick="Auth.logout()" class="nav-login-btn" style="background-color: rgba(255,255,255,0.15); font-size: 0.8rem; padding: 0.4rem 0.8rem;">
            Logout
          </button>
        </div>
      `;
    }

    return user;
  },

  // Require login — redirect to login page if not authenticated
  async requireLogin() {
    const user = await this.updateNavbar();
    if (!user) {
      window.location.href = '/login.html';
      return null;
    }
    return user;
  },

  // Optional auth check — update navbar but don't redirect
  async optionalCheck() {
    return await this.updateNavbar();
  }
};
