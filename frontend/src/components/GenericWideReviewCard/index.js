import React, { useState, useEffect } from "react";
import defaultProfilePic from "../../assets/images/default-profile-pic.jpg";
import DayJS from "react-dayjs";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GenericReviewComment from "../GenericReviewComment";

import {
  WideReviewCard,
  WideUserCardProfile,
  StarContainer,
  WideReviewCardText,
  PostComment,
  StarRatingWrapper,
} from "../../style/GlobalWrappers";

import { CommentInput } from "../../style/GlobalInputs";
import {
  SmallButton,
  LikeButton,
  CommentButton,
  SplitButton,
} from "../../style/GlobalButtons";
import StarRatingFix from "../StarRatingFix";
import { getReviewCommentsAction } from "../../store/actions/commentActions";
import { connect, useDispatch } from "react-redux";
import Spinner from "../GenericSpinner";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  color: #e47d31;
`;

const Comments = ({ handleRenderComments, commentsList, content }) => {
  console.log(commentsList);
  return (
    <>
      <WideReviewCardText>
        <p>{content}</p>

        <PostComment>
          <CommentInput
            placeholder="Comment Input Field"
            type="text"
          ></CommentInput>
          <SmallButton>Post</SmallButton>
          <a onClick={handleRenderComments}>Hide</a>
        </PostComment>
      </WideReviewCardText>
      {commentsList ? (
        commentsList.map((comment, index) => {
          return <GenericReviewComment key={index} comment={comment} />;
        })
      ) : (
        <Spinner />
      )}
    </>
  );
};

const LikeCommentView = ({
  handleRenderComments,
  content,
  amount_of_comments,
  amount_of_likes,
}) => {
  return (
    <WideReviewCardText>
      <p>{content}</p>

      <div>
        <SplitButton>
          <LikeButton>
            <FontAwesomeIcon icon={["fa", "thumbs-up"]} />
            Like {amount_of_likes}
          </LikeButton>
          <CommentButton onClick={handleRenderComments}>
            Comment {amount_of_comments}
          </CommentButton>
        </SplitButton>
        <a onClick={handleRenderComments}>View all comments</a>
      </div>
    </WideReviewCardText>
  );
};

const GenericWideReviewCard = (props) => {
  const dispatch = useDispatch();
  const {
    review: {
      content,
      restaurant: { name },
      author: { first_name, last_name, amount_of_reviews, avatar, id },
      created,
      rating,
      amount_of_comments,
      amount_of_likes,
    },
  } = props;

  const [commentsData, setComments] = useState({
    showComments: false,
    commentsList: null,
    content: ``,
  });

  const handleRenderComments = async (e) => {
    if (commentsData.showComments === false) {
      const response = await dispatch(getReviewCommentsAction(id));
      setComments({
        ...commentsData,
        commentsList: response.data,
        showComments: !commentsData.showComments,
      });
    } else {
      setComments({
        showComments: false,
        commentsList: null,
        content: ``,
      });
    }
  };

  return (
    <>
      <WideReviewCard>
        <WideUserCardProfile>
          <div>
            <Link to={`/users/${id}`}>
              <img src={avatar ? avatar : defaultProfilePic}></img>
            </Link>
            <div>
              <StyledLink to={`/users/${id}`}>
                {first_name + " " + last_name}
              </StyledLink>
              <p>{amount_of_reviews} Reviews in Total</p>
            </div>
            <StarRatingWrapper>
              <StarRatingFix avg_rating={rating} />
            </StarRatingWrapper>
          </div>
          <div>
            <p>
              <DayJS format="MM.DD.YYYY HH:mm">{created}</DayJS>
            </p>
          </div>
        </WideUserCardProfile>
        {commentsData.showComments ? (
          <Comments
            handleRenderComments={handleRenderComments}
            commentsList={commentsData.commentsList}
            content={content}
          />
        ) : (
          <LikeCommentView
            handleRenderComments={handleRenderComments}
            content={content}
            amount_of_comments={amount_of_comments}
            amount_of_likes={amount_of_likes}
          />
        )}
      </WideReviewCard>
    </>
  );
};

export default GenericWideReviewCard;
