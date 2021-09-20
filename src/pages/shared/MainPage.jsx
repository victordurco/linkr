import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import Header from '../shared/Header';
import CirclesLoader from '../shared/CirclesLoader';
import pageReloadErrorAlert from '../shared/pageReloadErrorAlert';
import NoPostMessage from '../shared/NoPostMessage';
import Post from '../shared/Post';
import Trending from '../shared/Trending';


export default function MainPage(props) {
	let {
		// TODO: Não tem jeito melhor de deixar isso? Coloquei
		// como let porque a 'titleText' não pode ser const
		getPosts,
		titleText,
		CreatePost,
		params={},
		isSomeonesPage
	} = props;
	const { hashtag, someonesId } = params;

	const { userInfo: { token, userId } } = useContext(UserContext);
	
	const [postsList, setPostsList] = useState([]);
	const [loaderIsActive, setLoaderIsActive] = useState(false);
	const [someonesName, setSomeonesName] = useState('');
	const history = useHistory();

	window.scrollTo(0, 0);


	const loadPosts = () => {
		setLoaderIsActive(true);
		if (token) {
			getPosts({ token, userId, hashtag, someonesId })
				.then(({ data: { posts } }) => {
					if (isSomeonesPage) {
						// TODO: Tirar esse if daqui. Achei ele meio bizarro, mas não pensei em nada
						// que dê para tirar ele, porque ele depende da resposta do server, e a resposta
						// eu não queria jogar para a página em si
						setSomeonesName(posts[0].user.username);
						if (Number(someonesId) === userId) history.push('/teste/my-posts');
					}
					setPostsList(posts);
				})
				.catch(pageReloadErrorAlert)
				.finally(() => setLoaderIsActive(false));
		}
	};

	useEffect(loadPosts, [token, hashtag]);

	const postListJSX = (postsList) => {
		return postsList.map((post) => <Post key={post.id} postInfo={post} />);
	};


	if (isSomeonesPage) {
		titleText = `${someonesName}'s posts`;
	}

	return (
		<>
			<Header />
			<Background>
				<TimelineContent>
					{loaderIsActive
						? <h1>Carregando...</h1>
						: <h1>{titleText}</h1>
					}

					{CreatePost
						? <CreatePost loadTimelinePosts={loadPosts}/>
						: <></>
					}

					{loaderIsActive
						? <CirclesLoader />
						: (postsList.length)
							? postListJSX(postsList)
							: <NoPostMessage />
					}
				</TimelineContent>
				
				<HashtagContainer>
					{token
						? <Trending loaderIsActive={loaderIsActive} />
						:	<></>
					}
				</HashtagContainer>
			</Background>
		</>
	);
}

const Background = styled.div`
	width: 100%;
	min-width: 100%;
	height: auto;
	min-height: 100vh;
	display: inline-flex;
	background-color: #333;
	justify-content: center;
	gap: 25px;
	padding: 72px;

	@media (max-width: 611px) {
		padding: 19px 0px;
  }
`;

const TimelineContent = styled.div`
	width: 611px;
	height: auto;

	h1 {
		font-family: 'Oswald';
		font-weight: 700;
		font-size: 43px;
		color: #fff;
		margin: 53px 0px 43px 0px;
		justify-content: flex-start;
		line-height: 63px;
		word-break: break-all;

		@media (max-width: 611px) {
			margin: 53px 0px 12px 17px;
			font-size: 33px;
			line-height: 49px;
		}
	}

	@media (max-width: 611px) {
		width: 100vw;    
	}
`;

const HashtagContainer = styled.div`
	width: 301px; 
	height: 406px;
	background-color: #333;
	margin-top: 160px;
	border-radius: 16px;
	position: sticky;
	top: 80px;

	@media (max-width: 1024px) {
		display: none;
	}
`;