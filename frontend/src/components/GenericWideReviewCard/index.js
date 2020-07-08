import React from "react";
import placeHolderProfilePic from "../../assets/images/small-user-image.png";

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

const Comments = ({ handleRenderComments }) => {
  return (
    <>
      <WideReviewCardText>
        <p>
          This location at the Bahnhofstrasse is quite friendly and easily
          located across the street from the train station. The people there
          seem to be quite good and helpful in their service.
        </p>

        <PostComment>
          <CommentInput
            placeholder="Comment Input Field"
            type="text"
          ></CommentInput>
          <SmallButton>Post</SmallButton>
          <a onClick={handleRenderComments}>Hide</a>
        </PostComment>
      </WideReviewCardText>
      <GenericReviewComment />
    </>
  );
};

const LikeCommentView = ({ handleRenderComments }) => {
  return (
    <WideReviewCardText>
      <p>
        This location at the Bahnhofstrasse is quite friendly and easily located
        across the street from the train station. The people there seem to be
        quite good and helpful in their service.
      </p>
      <div>
        <SplitButton>
          <LikeButton>
            <FontAwesomeIcon icon={["fa", "thumbs-up"]} />
            Like 11
          </LikeButton>
          <CommentButton>Comment 22</CommentButton>
        </SplitButton>
        <a onClick={handleRenderComments}>View all comments</a>
      </div>
    </WideReviewCardText>
  );
};

const GenericWideReviewCard = (props) => {
  const [showComments, setshowComments] = React.useState(false);

  const handleRenderComments = () => {
    setshowComments(!showComments);
  };

  return (
    <>
      <WideReviewCard>
        <WideUserCardProfile>
          <div>
            <img src={placeHolderProfilePic}></img>
            <div>
              <h1>Name</h1>
              <p>6 Reviews in Total</p>
            </div>
            <StarRatingWrapper>
              <StarRatingFix />
            </StarRatingWrapper>
          </div>
          <div>
            <p>01.01.2018 15:22</p>
          </div>
        </WideUserCardProfile>
        {showComments ? (
          <Comments handleRenderComments={handleRenderComments} />
        ) : (
          <LikeCommentView handleRenderComments={handleRenderComments} />
        )}
      </WideReviewCard>
    </>
  );
};

export default GenericWideReviewCard;
