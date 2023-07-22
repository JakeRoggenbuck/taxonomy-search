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
		<h2>Search Bar</h2>
		<input onInput={(e) => { setWord(e.target.value); }} class="m-2 text-slate-800" type="text" id="search" name="search"/>


		<For each={list()}>{(item, i) =>
  			<li>
      			{item}
  			</li>
		}</For>
	</div>);
}

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
		  <Search/>
      </header>
    </div>
  );
}

export default App;
