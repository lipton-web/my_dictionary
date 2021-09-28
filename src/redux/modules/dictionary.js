import { db } from '../../firebase';
import { collection, getDoc, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Action
const LOAD = 'dictionary/LOAD';
const CREATE = 'dictionary/CREATE';

const initialState = {
	list: [
		{word: "ㅎ1ㅎ1", explain:"히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.", ex:"저 친구가 초콜릿을 줬어. ㅎ1ㅎ1."},
		{word: "ㅎㅓㅎㅏ", explain:"히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.", ex:"저 친구가 초콜릿을 줬어. ㅎㅓㅎㅏ."},
		{word: "ㅎㅗㅎㅗ", explain:"히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.", ex:"저 친구가 초콜릿을 줬어. ㅎㅗㅎㅗ."},
	]
}

// Action 생성

// load
export function loadDictionary(dictionary) {
	return {type: LOAD, dictionary};
}

// Create
export function createWord(word, explain, ex) {
	return {type: CREATE, word, explain, ex};
}




// **middlewares

export const loadDictionaryFB = () => {
	return async function(dispatch) {
		const dictionary_data = await getDocs(collection(db, 'myDictionary'));

		let dictionary_list = [];

		dictionary_data.forEach((doc) => { 
			// console.log(doc.data());
			// dictionary_list = [...dictionary_list, {...doc.data()}] //이렇게도 dictionary_list에 추가 가능
			dictionary_list.push({id: doc.id, ...doc.data()});
		});

		console.log(dictionary_list, 'aa');
		dispatch(loadDictionary(dictionary_list));

	}
}


export const createDictionaryFB = (word, explain, ex) => {
	return async function (dispatch) {
		const docRef = await addDoc(collection(db, 'myDictionary'), word, explain, ex);
		const _dictionary = await getDoc(docRef); // 생성하기 눌렀을 때 생성한 정보 자료들 (word, explain, ex 등..) 다 가져오기
		const dictionary = {id: _dictionary.id, ..._dictionary.data()} //id값은 수정할때 필요함
		// console.log((await getDoc(docRef)).data()); //생성한 데이터 firestore에서 가져와서 콘솔에 출력

		console.log(dictionary);
		dispatch(createWord(dictionary));
	}
}

//**Reducer
export default function reducer(state = initialState, action = {}) {
	switch(action.type) {

		case LOAD: {
			return {list: action.dictionary};
		}

		case CREATE: {
			console.log('CREATE')
			const new_dictionary_list = [...state.list, action.word] //왜 action.word 만 작동하나?  action.explain, action.ex는 작동 안함. 3개 다 쓰면 undifined
			console.log(new_dictionary_list)
			return {...state, list: new_dictionary_list }
		}

		default: 
			return state;
	}
}