<template>
  <div class="auth-shell">
    <div class="auth-card">
      <RouterLink to="/" class="brand-mark auth-brand">Insta<span>post</span></RouterLink>
      <h1 class="auth-title">Witaj z powrotem</h1>
      <p class="auth-sub">Zaloguj się, żeby wrócić do swojego feedu.</p>

      <form @submit="login" class="auth-form">
        <div class="field">
          <label for="email">Email</label>
          <InputText type="text" id="email" />
        </div>
        <div class="field">
          <label for="password">Hasło</label>
          <InputText type="password" id="password" />
        </div>
        <Button type="submit" class="submit-btn" label="Zaloguj się" />
      </form>

      <p v-if="login_error" class="status-message">{{ error_message }}</p>

      <p class="auth-footer">
        Nie masz konta?
        <RouterLink to="/register">Zarejestruj się</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test_token: null,
      error_message: null,
      login_error: false,
    };
  },
  created() {
    this.test_token = this.$store.getters.GET_AUTH_TOKEN;
  },
  methods: {
    async login(e) {
      console.log("lglg");
      e.preventDefault();

      let login_info = {};
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      login_info["email"] = email;
      login_info["password"] = password;
      console.log("CO WYSYLAM: " + JSON.stringify(login_info));
      let odpowiedz = await this.$store.dispatch("LOGIN_USER", login_info);
      if (odpowiedz["JWT"] != undefined) {
        this.test_token = this.$store.getters.GET_AUTH_TOKEN;
        this.login_error = false;
        this.$router.push("/dashboard");
      } else {
        this.error_message = odpowiedz;
        this.login_error = true;
      }
    },
  },
};
</script>

<style scoped>
.auth-brand {
  display: inline-block;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.auth-title {
  font-size: 1.85rem;
  margin-bottom: 0.4rem;
}

.auth-sub {
  color: var(--muted);
  margin-bottom: 1.75rem;
}

.submit-btn {
  width: 100%;
  margin-top: 0.35rem;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.95rem;
}

.auth-footer a {
  color: var(--accent);
  font-weight: 600;
  margin-left: 0.25rem;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
