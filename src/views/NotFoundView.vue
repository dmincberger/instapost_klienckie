<template>
  <div class="auth-shell">
    <div class="auth-card not-found">
      <p class="brand-mark">Insta<span>post</span></p>
      <p class="code">404</p>
      <h1>Tej strony nie ma</h1>
      <p class="sub">Sprawdź adres albo wróć na początek.</p>
      <RouterLink class="btn-cta" to="/">Strona główna</RouterLink>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.not-found {
  text-align: center;
}

.brand-mark {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.code {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.06em;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 0.4rem;
}

.sub {
  color: var(--muted);
  margin-bottom: 1.25rem;
}

.btn-cta {
  display: inline-flex;
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
