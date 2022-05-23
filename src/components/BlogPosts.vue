<script setup>
(async () => {
  await fetch('https://medium.com/feed/@losmuertos')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => console.log(data))
})()
</script>

<template>
  <div class="text-center">
    Blog posts
  </div>
</template>