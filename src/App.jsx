import { useState } from 'react';
import image1 from '../public/images/image1.jpg';
import image2 from '../public/images/image2.jpg';
import image3 from '../public/images/image3.jpg';
import image4 from '../public/images/image4.jpg';

const App = () => {
    const [modal, setModal] = useState({
        isVisible: false,
        x: 0,
        y: 0,
        xpath: "",
    });
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [giveFeedback, setGiveFeedback] = useState(false);

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

    // Get element position using XPath
    const getElementPosition = (xpath) => {
        const element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (element) {
            const rect = element.getBoundingClientRect();
            return {
                x: rect.left + window.scrollX + rect.width / 2,
                y: rect.top + window.scrollY + rect.height / 2,
            };
        }
        return null;
    };

    // onClick handler for the container
    const handleClick = (event) => {
        const clickedElement = event.target;
        const relativeXPath = getXPath(clickedElement);
        console.log("Clicked element's XPath:", relativeXPath);

        // Get position of the clicked element
        const rect = clickedElement.getBoundingClientRect();

        // Update state to show modal at the clicked location
        setModal({
            isVisible: true,
            x: rect.left + window.scrollX + rect.width / 2,
            y: rect.top + window.scrollY + rect.height / 2,
            xpath: relativeXPath,
        });
    };

    // Close modal
    const closeModal = () => {
        setModal({
            isVisible: false,
            x: 0,
            y: 0,
            xpath: "",
        });
    };

    const handleCommentSubmit = () => {
        setComments([...comments, { id: Date.now(), text: newComment, xpath: modal.xpath, completed: false, giveReply: false, replies: [] }]);
        setNewComment('');
        closeModal();
    };

    const activateReply = (comment) => {
        comment.giveReply = true;
    }

    const handleReplySubmit = (comment) => {
        comment.replies = [...comment.replies, { id: Date.now(), text: newReply }]
        setNewReply('');
        closeCommentPopup();
        comment.giveReply = false;
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
        <div onClick={giveFeedback ? handleClick : null} style={{ height: '100vh', width: '100vw', cursor: 'pointer' }}>
            <div>
                <h1>Click anywhere to leave a comment!</h1>
                <br /> <br />
                <h2>This is a heading 2</h2>
                <h3>This is a heading 3</h3>
                <h4>This is a heading 4</h4>
                <h5>This is a heading 5</h5>

                <img src={image1} width={500} alt="" />
                <img src={image2} width={500} alt="" />
                <img src={image3} width={500} alt="" />
                <img src={image4} width={500} alt="" />

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
            {giveFeedback && comments.map((comment) => {
                const position = getElementPosition(comment.xpath);
                return (
                    <div
                        key={comment.id}
                        style={{
                            position: 'absolute',
                            top: position.y,
                            left: position.x,
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
                    ></div>
                )
            }

            )}

            {/* Modal for adding a new comment */}
            {modal.isVisible && (
                <div
                    style={{
                        position: "absolute",
                        top: modal.y,
                        left: modal.x,
                        backgroundColor: "white",
                        border: "1px solid black",
                        padding: "10px",
                        zIndex: 1000,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <form onSubmit={handleCommentSubmit}>
                        <label htmlFor="comment">Put your feedback here: </label>
                        <textarea name="comment" id="comment" rows={5} value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add your comment"></textarea>
                        <input type='submit' value={"Post"} />
                        <button onClick={closeModal}>Close</button>
                    </form>

                </div>
            )}

            {/* Popup to show selected comment */}
            {selectedComment && (
                <div
                    style={{
                        position: 'absolute',
                        top: selectedComment.y,
                        left: selectedComment.x,
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
                        selectedComment.giveReply && <form onSubmit={() => handleReplySubmit(selectedComment)}>
                            <label htmlFor="comment">Put your reply here: </label>
                            <textarea name="reply" id="reply" rows={5} value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Add your reply"></textarea>
                            <input type='submit' value={"Post"} />
                        </form>
                    }
                    {(selectedComment.completed || selectedComment.giveReply) || <button onClick={() => activateReply(selectedComment)}>Reply</button>}
                    <button onClick={closeCommentPopup}>Close</button>
                    {selectedComment.completed || <button onClick={() => setCompleted(selectedComment)}>Complete</button>}
                </div>
            )}
        </div>
    );
};

export default App;
