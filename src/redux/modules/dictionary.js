import { db } from '../../firebase';
import { collection, getDoc, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Action
const LOAD = 'dictionary/LOAD';
const CREATE = 'dictionary/CREATE';
const UPDATE =  'dictionary/UPDATE';
const DELETE = 'dictionary/DELETE';

const initialState = {
	list: [
		// {word: "ㅎ1ㅎ1", explain:"히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.", ex:"저 친구가 초콜릿을 줬어. ㅎ1ㅎ1."},
		// {word: "ㅎㅓㅎㅏ", explain:"히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.", ex:"저 친구가 초콜릿을 줬어. ㅎㅓㅎㅏ."},
		// {word: "ㅎㅗㅎㅗ", explain:"히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.", ex:"저 친구가 초콜릿을 줬어. ㅎㅗㅎㅗ."},
	]
}

// Action 생성

// load
export function loadDictionary(dictionary) {
	return {type: LOAD, dictionary};
}

// Create
export function createWord(word) {
	return {type: CREATE, word};
}

//Update
export function updateDictionary(updateData) {
	return {type: UPDATE, updateData};
}

//Delete
export function deleteDictionary(dictionary_index) {
	return {type: DELETE, dictionary_index};
}


// **middlewares
// load Dictionary middlewares
export const loadDictionaryFB = () => {
	return async function(dispatch) {
		const dictionary_data = await getDocs(collection(db, 'myDictionary'));

		let dictionary_list = [];

		dictionary_data.forEach((doc) => { 
			// console.log(doc.data());
			// dictionary_list = [...dictionary_list, {...doc.data()}] //이렇게도 dictionary_list에 추가 가능
			dictionary_list.push({id: doc.id, ...doc.data()});
		});

		console.log(dictionary_list, 'loadDictionaryFB');
		dispatch(loadDictionary(dictionary_list));

	}
}


//create Dictionary middlewares
export const createDictionaryFB = (word) => {
	return async function (dispatch) {
		const docRef = await addDoc(collection(db, 'myDictionary'), word);
		const _dictionary = await getDoc(docRef); // 생성하기 눌렀을 때 생성한 정보 자료들 (word, explain, ex 등..) 다 가져오기
		const dictionary = {id: _dictionary.id, ..._dictionary.data()} //id값은 수정할때 필요함
		// console.log((await getDoc(docRef)).data()); //생성한 데이터 firestore에서 가져와서 콘솔에 출력

		console.log(dictionary, 'create');
		dispatch(createWord(dictionary));
	}
}


// update Dictionary middlewares
export const updateDictionaryFB = (dictionary_id, updateData) => {
	return async function (dispatch, getState) {
		const docRef = doc(db, 'myDictionary', dictionary_id); //어느걸 수정할지 doc 잡아오기
		
		await updateDoc(docRef, { ...updateData });

		const _dictionary_list = getState().dictionary.list;
		const dictionary_index = _dictionary_list.findIndex((b) => {
			return b.id === dictionary_id;
		})
		const data = { index : dictionary_index, updateData: updateData}
		dispatch(updateDictionary(data));
		// console.log(bucket_index);
	}
}


// delete Dictionary middlewares
export const deleteDictionaryFB = (dictionary_id) => {
	return async function (dispatch, getState) {
		if(!dictionary_id) {
			window.alert('아이디가 없네요!')
			return;
		}
		const docRef = doc(db, 'myDictionary', dictionary_id);
		await deleteDoc(docRef);

		// 리덕스에서 삭제
		const _dictionary_list = getState().dictionary.list;
		const dictionary_index = _dictionary_list.findIndex((b) => {
			return b.id === dictionary_id;  //똑같은 인덱스 가져와
		});

		dispatch(deleteDictionary(dictionary_index));
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
			const new_dictionary_list = [...state.list, action.word]
			console.log(new_dictionary_list)
			return {...state, list: new_dictionary_list }
		}

		case UPDATE: {
			// console.log('UPDATE')
			const new_dictionary_list = state.list.map((list, idx) => {
				if(parseInt(action.updateData.index) === idx) {
					return{...list, ...action.updateData.updateData};
				} else {
					return list;
				}
			})
			console.log({...action.updateData.updateData}, '...action')
			console.log(new_dictionary_list, 'UPDATE')
			return {...state, list: new_dictionary_list};
		}

		case DELETE: {
			console.log(state, action);
			const new_dictionary_list = state.list.filter((l, idx) => {
				// console.log(parseInt(action.bucket_index) !== idx, parseInt(action.bucket_index), idx);
				return parseInt(action.dictionary_index) !== idx;
			});
			console.log(new_dictionary_list, 'sdada');
			return {...state, list: new_dictionary_list} 
		} 

		default: 
			return state;
	}
}



