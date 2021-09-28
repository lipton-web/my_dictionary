import React, { useCallback, useState } from "react";
import styled from 'styled-components';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteDictionaryFB, updateDictionaryFB } from "./redux/modules/dictionary";
import { ListStyle, Container, Subject } from './elements';


const Detail = (props) => {
	const dispatch  = useDispatch();
	const history = useHistory();
	const params = useParams();
	const list_index = params.index;
	const my_list = useSelector((state) => state.dictionary.list);

	console.log(my_list, list_index, 'my_list')

	// const [value, setValue] = useState('입력');

	// const onChange = useCallback(e => {
	// 	setValue(e.target.value);
	// },[])

	
		// const [wordText, wordSetText] = useState(my_list[list_index].word);
	
		// const wordOnChange = (e) => {
		// 	wordSetText(e.target.value);
		// };
	
		// const [text, setText] = useState(my_list[list_index].explain);
	
		// const onChange = (e) => {
		// 	setText(e.target.value);
		// };
	
		// const [exText, exSetText] = useState(my_list[list_index].ex);
	
		// const exOnChange = (e) => {
		// 	exSetText(e.target.value);
		// };
	

		const word_ref = React.useRef(null)
		const explain_ref = React.useRef(null)
		const ex_ref = React.useRef(null)


		// 수정버튼 함수
		// const updateDictionary = () => {
		// 	dispatch(updateDictionaryFB(my_list[list_index].id, 
		// 		// new_word = [word_ref, explain_ref, ex_ref]
		// 		// my_list[list_index].word, my_list[list_index].ex));
		// 	history.goBack()
		// }

		// 삭제버튼 함수
		const deleteDictionary = () => {
			dispatch(deleteDictionaryFB(my_list[list_index].id));
			history.goBack();
		}

	return (
		<div>
			<h1>{my_list[list_index] ? my_list[list_index].word : ''}</h1>
			{/* <input type="text" value={wordText} onChange={wordSetText} />
			<input type="text" value={text} onChange={onChange} />
			<input type="text" value={exText} onChange={exOnChange} /> */}
			<ListStyle>
				<Container>
					<Subject>단어</Subject>
					<Input defaultValue={my_list[list_index] ? my_list[list_index].word:''} ref={word_ref} />
					{/* <Input value={my_list[list_index].word} /> */}
				</Container>
			</ListStyle>
			
			<ListStyle>
				<Container>
					<Subject>설명</Subject>
					<Textarea defaultValue={my_list[list_index] ? my_list[list_index].explain:''} ref={explain_ref} />
					{/* <Input value={my_list[list_index].explain} /> */}
				</Container>
			</ListStyle>
			
			<ListStyle>
				<Container>
					<Subject>예시</Subject>
					<Textarea defaultValue={my_list[list_index] ? my_list[list_index].ex:''}  ref={ex_ref} />
					{/* <Input value={my_list[list_index].ex} /> */}
				</Container>
			</ListStyle>
			
			<button onClick={() => {dispatch(updateDictionaryFB(my_list[list_index].id, my_list[list_index].word))}}>수정</button>
			<button onClick={deleteDictionary}>삭제</button>

		</div>
	)
}

export default Detail;


const Input = styled.input`
width: 100%;
height: 50px;
`;

const Textarea = styled.textarea`
width: 100%;
height: 50px;
`;

const Button = styled.button`
margin-top: 50px;
background: #5825f8;
color: #fff;
font-size: 20px;
font-weight: 900;
border-width: 0;
width: 100%;
height: 50px;
`;