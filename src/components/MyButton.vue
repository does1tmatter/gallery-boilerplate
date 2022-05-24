<template>
  <button class="
    disabled:cursor-not-allowed
    disabled:opacity-60
    text-white
    disabled:hover:bg-zinc-700
    dark:disabled:hover:bg-purple-500
    bg-zinc-700
    dark:bg-purple-500
    rounded-lg
    py-[5px]
    px-[10px]
    hover:bg-zinc-400
    dark:hover:bg-purple-400
    transition-all
  ">
    <slot />
  </button>
</template>