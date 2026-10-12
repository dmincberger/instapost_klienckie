<template>
  <div class="auth-shell">
    <div class="auth-card confirm-card">
      <p class="brand-mark">Insta<span>post</span></p>
      <h1>Potwierdzenie konta</h1>
      <p class="status-message ok" v-if="confirmation_message">
        {{ confirmation_message }}
      </p>
      <p class="pending" v-else>Trwa weryfikacja…</p>
      <RouterLink class="btn-cta" to="/login">Przejdź do logowania</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmation_message: null,
    };
  },
  async created() {
    let token = window.location.href.split("=")[1];
    console.log(token);
    let data = await this.$store.dispatch("CONFIRM_ACCOUNT", token);
    console.log("DATA W VUE: " + JSON.stringify(data));
    this.confirmation_message = data;
  },
  methods: {},
};
</script>

<style scoped>
.confirm-card {
  text-align: center;
}

.brand-mark {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.pending {
  color: var(--muted);
  margin-bottom: 1.25rem;
}

.btn-cta {
  display: inline-flex;
  margin-top: 1rem;
  padding: 0.7rem 1.25rem;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: #fff;
  font-weight: 600;
}

.btn-cta:hover {
  background: var(--accent-deep);
}
</style>
