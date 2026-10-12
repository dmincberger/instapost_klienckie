<template>
  <header class="topbar">
    <div class="topbar-inner">
      <RouterLink to="/dashboard" class="brand-mark">Insta<span>post</span></RouterLink>
      <nav class="topbar-nav" aria-label="Główne">
        <button
          v-for="item in items"
          :key="item.url"
          type="button"
          class="nav-item"
          @click="change_view(item.url)"
        >
          <span :class="item.icon" aria-hidden="true"></span>
          <span class="nav-label">{{ item.name }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      items: [
        {
          icon: "pi pi-home",
          name: "Feed",
          url: "/dashboard",
        },
        {
          icon: "pi pi-user",
          name: "Profil",
          url: "/profile",
        },
        {
          icon: "pi pi-sign-out",
          name: "Wyloguj",
          url: "/logout",
        },
      ],
    };
  },
  methods: {
    change_view(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--nav-height);
  backdrop-filter: blur(14px);
  background: rgba(243, 245, 247, 0.78);
  border-bottom: 1px solid var(--line);
  animation: fade-in 0.4s var(--ease-out) both;
}

.topbar-inner {
  width: min(1120px, calc(100% - 2rem));
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand-mark {
  font-size: 1.35rem;
}

.topbar-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: none;
  background: transparent;
  color: var(--ink-soft);
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.2s var(--ease-out), background 0.2s var(--ease-out);
}

.nav-item:hover {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.7);
}

.nav-item .pi {
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .nav-label {
    display: none;
  }

  .nav-item {
    padding: 0.65rem;
  }
}
</style>
