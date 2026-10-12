<template>
  <div class="home">
    <header class="home-nav">
      <p class="brand-mark">Insta<span>post</span></p>
      <nav class="home-nav-links">
        <RouterLink class="btn-ghost" to="/login">Zaloguj się</RouterLink>
        <RouterLink class="btn-cta" to="/register">Dołącz</RouterLink>
      </nav>
    </header>

    <main class="hero">
      <div class="hero-copy">
        <h1 class="brand-hero">Insta<span>post</span></h1>
        <p class="hero-lead">
          Udostępniaj zdjęcia, filtruj je i buduj swój wizualny dziennik —
          w czystym, spokojnym miejscu na Twoje ujęcia.
        </p>
        <div class="hero-actions">
          <RouterLink class="btn-cta" to="/register">Załóż konto</RouterLink>
          <RouterLink class="btn-ghost" to="/login">Mam już konto</RouterLink>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="frame frame-a"></div>
        <div class="frame frame-b"></div>
        <div class="frame frame-c"></div>
      </div>
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.home {
  min-height: 100vh;
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 1.25rem 0 3rem;
  display: flex;
  flex-direction: column;
}

.home-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0 1.5rem;
  animation: fade-in 0.5s var(--ease-out) both;
}

.brand-mark {
  font-size: 1.35rem;
}

.home-nav-links {
  display: flex;
  gap: 0.65rem;
  align-items: center;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.25rem;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  transition: transform 0.2s var(--ease-out), background 0.2s var(--ease-out);
}

.btn-cta:hover {
  background: var(--accent-deep);
  transform: translateY(-1px);
}

.hero {
  flex: 1;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  align-items: center;
  min-height: calc(100vh - 7rem);
}

.hero-copy {
  animation: fade-up 0.7s var(--ease-out) 0.1s both;
}

.brand-hero {
  font-size: clamp(3.4rem, 8vw, 5.6rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.95;
  margin-bottom: 1.25rem;
}

.brand-hero span {
  color: var(--accent);
}

.hero-lead {
  max-width: 28rem;
  font-size: 1.1rem;
  color: var(--ink-soft);
  margin-bottom: 1.75rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-visual {
  position: relative;
  height: min(520px, 70vh);
  animation: fade-up 0.8s var(--ease-out) 0.2s both;
}

.frame {
  position: absolute;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: var(--shadow-soft);
  background-size: cover;
  background-position: center;
}

.frame-a {
  inset: 8% 18% 22% 8%;
  background:
    linear-gradient(145deg, rgba(20, 24, 31, 0.15), transparent 50%),
    linear-gradient(160deg, #7a95a8, #c5d4df);
  animation: soft-float 7s ease-in-out infinite;
}

.frame-b {
  inset: 28% 4% 8% 38%;
  background:
    linear-gradient(200deg, rgba(226, 75, 59, 0.25), transparent 55%),
    linear-gradient(40deg, #4a5d6e, #9eb0bf);
  animation: soft-float 8s ease-in-out 0.8s infinite;
}

.frame-c {
  width: 38%;
  height: 32%;
  top: 4%;
  right: 6%;
  background: linear-gradient(135deg, #e24b3b, #f08a6e);
  animation: soft-float 6s ease-in-out 0.4s infinite;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    gap: 2rem;
    padding-top: 1rem;
  }

  .hero-visual {
    height: 320px;
    order: -1;
  }

  .home-nav-links .btn-ghost {
    display: none;
  }
}
</style>
