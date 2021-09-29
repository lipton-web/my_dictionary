import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDictionaryFB, createWord } from "./redux/modules/dictionary";
import { ListStyle, Container, Subject } from './elements';
import styled from "styled-components";
import { useHistory } from "react-router";

const Addword = (props) => {
	const history = useHistory();

	const dispatch = useDispatch() //액션호출, useDispatch:액션을 일으킴
	
	// const word = useSelector(state => state.dictionary.list.)

	const word_ref = React.useRef(null)
	const explain_ref = React.useRef(null)
	const ex_ref = React.useRef(null)

	const alertText = () => {
		const htmlCode = '정보를 입력해 주세요';
		return <p dangerouslySetInnerHTML={{__html: htmlCode}}></p>
	}

	const addDictionary = () => {
		// dispatch(createWord({word: word_ref.current.value, explain: explain_ref.current.value, ex: ex_ref.current.value}))
		if (word_ref.current.value && explain_ref.current.value && ex_ref.current.value) {
			dispatch(createDictionaryFB({word: word_ref.current.value, explain: explain_ref.current.value, ex: ex_ref.current.value}));
			history.goBack()
		} else {
			alert('정보를 입력해 주세요')
		}
	}

	return (
		<div>
			<h1>단어 추가하기</h1>
			
			<ListStyle>
				<Container>
					<Subject>단어</Subject>
					<Input ref={word_ref} />
				</Container>
			</ListStyle>

			<ListStyle>
				<Container>
					<Subject>설명</Subject>
					<Textarea ref={explain_ref} />
				</Container>
			</ListStyle>

			<ListStyle>
				<Container>
					<Subject>예시</Subject>
					<Textarea ref={ex_ref} />
				</Container>
			</ListStyle>

			{/* <div>{alertText}</div> */}
			<Button onClick={addDictionary} >
				추가하기
			</Button>
			
		</div>
	)
}

export default Addword;

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
