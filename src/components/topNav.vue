<template>
  <nav class="nav has-shadow has-fixed-size">
    <div class="container header">
      <div class="nav-left">
        <a class="nav-item" href="https://github.com" target="_blank">
          <img src="../assets/gitLogo.png" />
        </a>
      </div>
      <div class="headTitle">Search for Github Repositories</div>
      <div />
    </div>
  </nav>
</template>

<script>
export default {
  name: 'topNav'
}
</script>

<style scoped>
.nav {
  width: 100%;
  background-color: #333333;
}

.nav-left {
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.headTitle {
  color: whitesmoke;
  font-weight: 500;
  font-size: 24px;
}

@media screen and (max-width: 768px) {
  #menu-toggle:checked + .nav-menu {
    display: block;
  }

  .headTitle {
    left: 35%;
  }
}
</style>
