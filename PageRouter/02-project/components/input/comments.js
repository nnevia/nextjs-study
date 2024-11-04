import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';
function Comments(props) {
  const { eventsId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setisFetchingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setisFetchingComments(true);
      fetch(`/api/comments/${eventsId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setisFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'sending comment...',
      message: 'loading...',
      status: 'pending',
    });
    setshowNotification('loading...');
    console.log(showNotification),
      fetch(`/api/comments/${eventsId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        })
        .then((data) =>
          notificationCtx.showNotification({
            title: 'Success',
            message: 'Comment added successfully!',
            status: 'success',
          }),
        )
        .catch((error) =>
          notificationCtx.showNotification({
            title: 'Error',
            message: error.message || 'Something went wrong',
            status: 'error',
          }),
        );
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>loading...</p>}
    </section>
  );
}

export default Comments;
