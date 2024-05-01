<script lang="ts">
  import Word from './Word.svelte'

  export let savedWords: Word[];
</script>

<div class="w-5/6 sm:w-[32rem] mx-auto p-4 border border-black rounded-md">
  <h1>Saved Words</h1>
  <Word word={savedWords[0].word} definition={savedWords[0].definition} />
</div>
