import { useState } from 'react';

const App = () => {
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [giveFeedback, setGiveFeedback] = useState(false);
    const [giveReply, setGiveReply] = useState(false);

    // Function to generate XPath
    const getXPath = (element) => {
        if (element.id) {
            return `//*[@id="${element.id}"]`;
        }
        if (element === document.body) {
            return "/html/body";
        }
        let index = 1;
        let siblings = element.parentNode ? element.parentNode.childNodes : [];
        for (let sibling of siblings) {
            if (sibling === element) break;
            if (sibling.nodeType === 1 && sibling.nodeName === element.nodeName) {
                index++;
            }
        }
        const tagName = element.nodeName.toLowerCase();
        return (
            getXPath(element.parentNode) +
            "/" +
            tagName +
            (index > 1 ? `[${index}]` : "")
        );
    };

    // onClick handler for the container
    const handleClick = (event) => {
        const clickedElement = event.target;
        const relativeXPath = getXPath(clickedElement);
        console.log("Clicked element's XPath:", relativeXPath);
    };

    const handleCommentSubmit = () => {
        setComments([...comments, { id: Date.now(), text: newComment, position: modalPosition, completed: false, replies: [] }]);
        setNewComment('');
        setShowModal(false);
    };

    const handleReplySubmit = (comment) => {
        comment.replies = [...comment.replies, { id: Date.now(), text: newReply }]
        setNewReply('');
        closeCommentPopup();
    }

    const handleMarkerClick = (comment) => {
        setSelectedComment(comment);
    };


    const closeCommentPopup = () => {
        setSelectedComment(null);
    };

    const setCompleted = (comment) => {
        comment.completed = true;
    };

    return (
        <div onClick={giveFeedback ? handleClick : null} style={{ height: '100vh', cursor: 'pointer' }}>
            <div>
                <h1>Click anywhere to leave a comment!</h1>
                <br /> <br />
                <h2>This is a heading 2</h2>
                <h3>This is a heading 3</h3>
                <h4>This is a heading 4</h4>
                <h5>This is a heading 5</h5>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque laboriosam dicta quaerat quod totam excepturi nesciunt asperiores quis quas nam.</p>
                <br />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptates nisi cumque assumenda voluptatum deleniti voluptate eligendi saepe voluptatibus! Vero.</p>
                <br />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti error aliquid nostrum? Ipsam recusandae quis sequi. Ipsum quidem maiores aliquam.</p>
                <br />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum cum, perspiciatis fuga rem id blanditiis! Culpa perferendis itaque laudantium beatae!</p>
                <br />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci et laborum magnam tempora nulla ex facilis porro ab doloribus corporis!</p>
                <br />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et voluptatum quasi ex consequuntur voluptatibus tenetur similique fuga impedit voluptatem omnis.</p>
                <br />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, nostrum eos suscipit voluptate illo quas! Dolores eos magni sit necessitatibus!</p>



            </div>


            {/* Button to activate comment */}
            <button
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    fontWeight: `${giveFeedback ? 'bold' : 'normal'}`
                }}
                onClick={() => setGiveFeedback(!giveFeedback)}
            >{`${giveFeedback ? 'Deactivate' : 'Activate'}`}</button>

            {/* Markers for each comment */}
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    style={{
                        position: 'absolute',
                        top: comment.position.y,
                        left: comment.position.x,
                        width: '20px',
                        height: '20px',
                        backgroundColor: `${comment.completed ? 'green' : 'red'}`,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transform: 'translate(-50%, -50%)',
                    }}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                        handleMarkerClick(comment);
                    }}
                />
            ))}

            {/* Modal for adding a new comment */}
            {showModal && (
                <div
                    style={{
                        position: 'absolute',
                        top: modalPosition.y,
                        left: modalPosition.x,
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <form onSubmit={handleCommentSubmit}>
                        <label htmlFor="comment">Put your feedback here: </label>
                        <textarea name="comment" id="comment" rows={5} value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add your comment"></textarea>
                        <input type='submit' value={"Post"} />
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </form>

                </div>
            )}

            {/* Popup to show selected comment */}
            {selectedComment && (
                <div
                    style={{
                        position: 'absolute',
                        top: selectedComment.position.y,
                        left: selectedComment.position.x,
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        backgroundColor: 'white',
                        color: 'black',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000
                    }}
                >
                    <p>{selectedComment.text}</p>
                    <h4>Replies: </h4>
                    {
                        selectedComment.replies.map(reply => (
                            <div key={reply.id}>
                                <p>{reply.text}</p>
                            </div>
                        ))
                    }
                    {
                        giveReply && <form onSubmit={() => handleReplySubmit(selectedComment)}>
                            <label htmlFor="comment">Put your reply here: </label>
                            <textarea name="reply" id="reply" rows={5} value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Add your reply"></textarea>
                            <input type='submit' value={"Post"} />
                        </form>
                    }
                    {(selectedComment.completed || giveReply) || <button onClick={() => setGiveReply(true)}>Reply</button>}
                    <button onClick={closeCommentPopup}>Close</button>
                    {selectedComment.completed || <button onClick={() => setCompleted(selectedComment)}>Complete</button>}
                </div>
            )}
        </div>
    );
};

export default App;
