<template>
  <div class="whole-class">
    <div class="spinner"></div>
    <div class="loader"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.whole-class {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #30303080;
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
}

.spinner {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  animation: spin 1s infinite;
  margin-bottom: 25px;
}

@keyframes spin {
  0%{
    background-color: red;
  }

  25%{
    background-color: yellow;
  }

  50%{
    background-color: green;
  }

  75%{
    background-color: black;
  }

  100%{
    background-color: blue;
  }
  
}

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #303030;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
