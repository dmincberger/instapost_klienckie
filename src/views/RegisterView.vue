<template>
  <div class="auth-shell">
    <div class="auth-card">
      <RouterLink to="/" class="brand-mark auth-brand">Insta<span>post</span></RouterLink>
      <h1 class="auth-title">Dołącz do Instapost</h1>
      <p class="auth-sub">Załóż konto i zacznij dzielić się zdjęciami.</p>

      <div class="form_div">
        <form @submit="register" class="auth-form">
          <div class="field">
            <label for="name">Imię</label>
            <InputText type="text" id="name" />
          </div>
          <div class="field">
            <label for="lastName">Nazwisko</label>
            <InputText type="text" id="lastName" />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <InputText type="text" id="email" />
          </div>
          <div class="field">
            <label for="password">Hasło</label>
            <InputText type="password" id="password" />
          </div>
          <Button type="submit" class="submit-btn" label="Zarejestruj się" />
        </form>
      </div>

      <p v-if="register_state" class="status-message ok">{{ register_message }}</p>
      <p v-else-if="confirmation_error" class="status-message">{{ confirmation_error }}</p>

      <p class="auth-footer">
        Masz już konto?
        <RouterLink to="/login">Zaloguj się</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register_message:
        "Na maila został wysłany link aktywacyjny. Uwaga!: jest ważny jedynie przez godzinę",
      register_state: null,
      confirmation_error: null,
    };
  },
  methods: {
    async register(e) {
      console.log("lglg");
      e.preventDefault();

      let register_info = {};
      let email = document.getElementById("email").value;
      let name = document.getElementById("name").value;
      let lastName = document.getElementById("lastName").value;
      let password = document.getElementById("password").value;
      register_info["email"] = email;
      register_info["name"] = name;
      register_info["lastName"] = lastName;
      register_info["password"] = password;
      let odpowiedz = await this.$store.dispatch("REGISTER_USER", register_info);
      if (
        odpowiedz.match(
          /\/confirm\?token=([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/
        )
      ) {
        console.log("ZMATCHOWALO");
        this.register_state = true;
      } else {
        this.confirmation_error = odpowiedz;
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
