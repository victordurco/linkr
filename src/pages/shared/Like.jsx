import React , {useState} from 'react';
import { HeartOutline, HeartSharp } from 'react-ionicons';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { postLikeOrDislike } from '../../service/service.posts';

export default function Like ({id, userInfo, likes}) {
	const [liked, setLiked] = useState(checkLike());


	function likeOrDislike(){
		const action = (liked) ? 'dislike' : 'like';
		setLiked(!liked);
		postLikeOrDislike(userInfo.token, id, action)
			.then()
			.catch(() => {
				setLiked(!liked);
			});
	}

	function checkLike(){
		return !! likes.find((l) => {
			return l.userId===userInfo.userId;
		});
	}

	const peopleWhoLiked = likes.filter(l=>l.userId !== userInfo.userId).map(l=>l['user.username']);

	function dataTip(){
		if (!peopleWhoLiked.length){
			return (liked) ? 'You' : 'Nobody';
		}
		if (peopleWhoLiked.length === 1){
			return (liked) 
				? 'You and ' + peopleWhoLiked[0]
				: peopleWhoLiked[0];
		}
		if (peopleWhoLiked.length === 2){
			return (liked)
				? `You, ${peopleWhoLiked[0]} and ${peopleWhoLiked[1]}`
				: `${peopleWhoLiked[0]} and ${peopleWhoLiked[1]}`;
		}
		if (peopleWhoLiked.length === 3){
			return (liked)
				? `You, ${peopleWhoLiked[0]} and 2 others`
				: `${peopleWhoLiked[0]}, ${peopleWhoLiked[1]} and ${peopleWhoLiked[2]}`;
		}
		return (liked)
			? `You, ${peopleWhoLiked[0]} and ${peopleWhoLiked.length - 1} others`
			: `${peopleWhoLiked[0]}, ${peopleWhoLiked[1]} and ${peopleWhoLiked.length - 2} others`;
	}
	const text = dataTip();
	
	return (
		<LikeContainer >
			<div data-tip={text}  onClick={likeOrDislike}>
				{liked 
					?<HeartSharp
						color={'#ef2929'} 
						height="22px"
						width="22px"
					/>
					:<HeartOutline
						color={'#fff'} 
						height="22px"
						width="22px"
					/>
				}
				<ReactTooltip 
					type="light"
					textColor="#505050"
					place="bottom"
					effect="solid"
				/>
			</div>
			<LikesQntt>{`${(liked) ? peopleWhoLiked.length + 1 : peopleWhoLiked.length} likes`}</LikesQntt>
		</LikeContainer>		
	);
}

const LikeContainer = styled.div`
	position: absolute;
	top: 86px;
	left: 20px;
	font-family: "Lato";
	display: flex;
	flex-direction: column;
	align-items: center;
	div {
		cursor: pointer;
	}
`;
const LikesQntt = styled.p`
	color: #fff;
	margin-top: 3px;
`;




