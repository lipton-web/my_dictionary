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


		const word_ref = React.useRef(null)
		const explain_ref = React.useRef(null)
		const ex_ref = React.useRef(null)


		// 수정버튼 함수
		const updateDictionary = () => {
			const updateData = {
				word: word_ref.current.value, 
				explain: explain_ref.current.value, 
				ex: ex_ref.current.value
			}
			console.log(updateData);

			dispatch(updateDictionaryFB(my_list[list_index].id, updateData));
			history.goBack();
		}

		// 삭제버튼 함수
		const deleteDictionary = () => {
			dispatch(deleteDictionaryFB(my_list[list_index].id));
			history.goBack();
		}

	return (
		<div>
			<h1>{my_list[list_index] ? my_list[list_index].word : ''}</h1>

			<ListStyle>
				<Container>
					<Subject>단어</Subject>
					<Input defaultValue={my_list[list_index] ? my_list[list_index].word : ''} ref={word_ref} />
				</Container>
			</ListStyle>
			
			<ListStyle>
				<Container>
					<Subject>설명</Subject>
					<Textarea defaultValue={my_list[list_index] ? my_list[list_index].explain : ''} ref={explain_ref} />
				</Container>
			</ListStyle>
			
			<ListStyle>
				<Container>
					<Subject>예시</Subject>
					<Textarea defaultValue={my_list[list_index] ? my_list[list_index].ex : ''}  ref={ex_ref} />
				</Container>
			</ListStyle>
			
			<ButtonWrap>
				<Button style={{background: 'yellowgreen'}} onClick={updateDictionary}>수정</Button>
				<Button style={{background: '#ff8787'}} onClick={deleteDictionary}>삭제</Button>
			</ButtonWrap>

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

const ButtonWrap = styled.div`
	display: flex;
	justify-content: space-around;
`;

const Button = styled.button`
	border-radius: 15px;
	margin-top: 50px;
	color: #fff;
	font-size: 20px;
	font-weight: 900;
	border-width: 0;
	width: 20%;
	height: 50px;
`;