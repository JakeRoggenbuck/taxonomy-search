import logo from './logo.svg';
import styles from './App.module.css';
import { createSignal, createEffect } from 'solid-js';


function Search() {
	const [word, setWord] = createSignal("felis");
	const [list, setList] = createSignal([]);

	async function setListofWords() {
		const response = await fetch(`http://localhost:8000/?q=${word()}`);
	  	const wordsList = await response.json();
		setList(wordsList);
	}

	createEffect(() => {
		setListofWords();
	});

	return (
	<div>
		<h2 class="text-3xl m-3">Taxonomy Search</h2>
		<input onInput={(e) => { setWord(e.target.value); }} autocomplete="off" placeholder="felis" class="outline m-2 mb-5 text-slate-800" type="text" id="search" name="search"/>
		<hr class="py-2"/>

		<div class="grid grid-cols-4 gap-4">
			<For each={list()}>{(item, i) =>
				<a href={`https://en.wikipedia.org/wiki/${item}`}>
					<div class="bg-slate-200 py-2 ml-2 mr-2 rounded-md">
						<p class="underline m-0">{item}</p>
					</div>
				</a>
			}</For>
		</div>
	</div>);
}

function Footing() {
	return (
		<div class="absolute bottom-0 p-2 bg-white w-full">
			<p>Created by <a class="underline text-sky-500" href="https://jr0.org">Jake Roggenbuck</a></p>
		</div>);
}

function App() {
  return (
    <div class={styles.App}>
		<Search/>
		<Footing/>
    </div>
  );
}

export default App;
