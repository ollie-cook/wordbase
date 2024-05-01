<script lang="ts">
  import Saved from "./components/Saved.svelte";

  let formElement: HTMLFormElement;
  let definition = ""
  let wordState = true;
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

<div class="w-5/6 m-auto mt-12 pb-6 sm:w-[32rem]">
  <div class="flex justify-stretch w-full">
    <button 
      class={`p-2 grow border border-black rounded-t-md ${wordState ? 'border-b-0 border-r-0 bg-white' : 'rounded-br-md bg-neutral-100 hover:bg-white'}`}
      on:click={() => wordState = true}
    >
      Word
    </button>
    <button 
      class={`p-2 grow border border-black rounded-t-md ${!wordState ? 'border-b-0 border-l-0 bg-white' : 'rounded-bl-md bg-neutral-100 hover:bg-white'}`}
      on:click={() => wordState = false}
    >
      Phrase
    </button>
  </div>
  <form bind:this={formElement} class="flex flex-col px-8 py-12 m-auto border border-t-0 border-black rounded-b-md bg-white sm:px-20" on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      class="border border-black rounded-sm indent-1 min-w-0" 
      id="word" 
      name="word"
    />
    <div class="flex justify-between">
      <button 
        type="button"
        class="bg-blue-300 w-fit px-2 mt-4 text-lg rounded-sm hover:bg-blue-400"
        on:click={getDefinition}
      >Get Definition</button>
      <button class="bg-blue-300 w-fit px-2 mt-4 text-lg rounded-sm hover:bg-blue-400">Save</button>
    </div>
  </form>
  <p class="mx-auto">{definition}</p>
</div>
<Saved savedWords={data} />


