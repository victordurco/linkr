import React from 'react';
import styled from 'styled-components';
// import HashtagTrending from '../shared/HashtagTrending';


export default function Hashtag(){
	// TODO: Refazer essa página
	return(
		<>
			<HeaderTest />

			<MainBodyTest>
				{/* <HashtagTrending /> */}
			</MainBodyTest>
		</>
	);
}


const HeaderTest = styled.header`
	width: 100%;
	height: 72px;
	background-color: #151515;
`;

const MainBodyTest = styled.div`
	width: 100%;
	height: calc(100vh - 72px);
	background-color: #333333;
`;
