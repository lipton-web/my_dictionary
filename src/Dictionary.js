import React from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { ListStyle, Container, Subject } from './elements';

const Dictionary = (props) => {
	const history = useHistory();
	const my_list = useSelector((state) => state.dictionary.list);
	console.log(my_list, 'dictionary');


	return (
		<div>
			{/* 헤더 */}
			<h1 style={{textAlign: 'left', margin: '12px'}}>MY DICTIONARY</h1>

			{/* 단어장 목록 */}
			<div>
				{my_list.map((list, index) => {
					return (
						<ListStyle key={index}>

							<Container>
								<Subject>단어</Subject>
								<H3>{list.word}</H3>
							</Container>

							<Container>
								<Subject>설명</Subject>
								<H3>{list.explain}</H3>
							</Container>

							<Container>
								<Subject>예시</Subject>
								<H3 style={{color:'#a0ccff'}}>{list.ex}</H3>
							</Container>

						</ListStyle>
					);
				})}
			</div>
			

			{/* 버튼 */}
			<Button onClick={()=>history.push('/addword')}>+</Button>

		</div>
	)
}

export default Dictionary;

// const Back = styled.div`
// 	/* style={{ background:'#e2fff8', padding: '12px'}} */
// 	background: #e2fff8;
// 	padding: 12px;
// 	height: 100vh;
// `;

const Button = styled.button`
	position: fixed;
	width: 60px;
	height: 60px;
	top: 88%;
	left: 80%;
	border-radius: 50%;
	font-size: 50px;
	font-weight: 900;
	text-align: center;
	color: #fff;
	background: #5825f8;
	border-width: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const H3 = styled.h3`
	white-space: normal;
`;
