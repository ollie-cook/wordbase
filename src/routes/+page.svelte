<script lang="ts">
  import Saved from "./components/Saved.svelte";

  let formElement: HTMLFormElement;
  let definition = ""
  export let data: Word[];

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const word = form.elements.namedItem('word') as HTMLInputElement;

  }

  async function getDefinition() {
    const word = formElement.word.value;

    const result = await fetchDefinition(word);
    definition = result[0].meanings[0].definitions[0].definition;
  }

  async function fetchDefinition(word: string) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    return data;
  }

</script>

<div class="w-5/6 bg-emerald-400 m-auto mt-12 pb-6">
  <div class="flex justify-stretch w-full">
    <button class="p-2 grow bg-red-200">Word</button>
    <button class="p-2 grow bg-yellow-200">Phrase</button>
  </div>
  
  <form bind:this={formElement} class="flex flex-col w-5/6 m-auto mt-6" on:submit|preventDefault={handleSubmit}>
    <input 
      type="text"
      class="border border-black rounded-md indent-1 min-w-0" 
      id="word" 
      name="word"
    />
    <div class="flex justify-between">
      <button 
        type="button"
        class="bg-blue-300 w-fit px-2 mt-4 text-lg rounded-md hover:bg-blue-400"
        on:click={getDefinition}
      >Get Definition</button>
      <button class="bg-blue-300 w-fit px-2 mt-4 text-lg rounded-md hover:bg-blue-400">Submit</button>
    </div>
    
  </form>
  <p class="mx-auto">{definition}</p>
</div>
<Saved savedWords={data} />


