<script lang="ts">
  let definition = "definition"

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const word = form.elements.namedItem('word') as HTMLInputElement;

    const result = await fetchDefinition(word.value);
    definition = result[0].meanings[0].definitions[0].definition;
  }

  async function fetchDefinition(word: string) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    return data;
  }

</script>

<form class="flex flex-col w-fit m-auto mt-12" on:submit|preventDefault={handleSubmit}>
  <label for="word" >Word</label>
  <input 
    type="text"
    class="border border-black rounded-md indent-1 min-w-0" 
    id="word" 
    name="word"/>
  <button class="bg-blue-300 w-fit px-2 mt-4 text-lg rounded-md hover:bg-blue-400">Submit</button>
</form>
<p class="m-auto">{definition}</p> 
