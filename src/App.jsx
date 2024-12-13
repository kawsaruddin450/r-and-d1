import { useState } from 'react';

const App = () => {
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [giveFeedback, setGiveFeedback] = useState(false);

    const handlePageClick = (e) => {
        const { pageX, pageY } = e;
        setModalPosition({ x: pageX, y: pageY });
        setShowModal(true);
    };

    const handleCommentSubmit = () => {
        setComments([...comments, { id: Date.now(), text: newComment, position: modalPosition, completed: false }]);
        setNewComment('');
        setShowModal(false);
    };

    const handleMarkerClick = (comment) => {
        setSelectedComment(comment);
    };

    const closeCommentPopup = () => {
        setSelectedComment(null);
    };

    const setCompleted = (comment)=> {
        comment.completed = true;
    }

    return (
        <div style={{ height: '100vh', cursor: 'pointer' }}>
            <div onClick={giveFeedback ? handlePageClick : null}>
                <h1>Click anywhere to leave a comment!</h1>
                <br /> <br />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, quam error? Hic vitae rem iusto voluptatem consequuntur quasi et animi, laudantium ab libero facere veritatis pariatur blanditiis totam voluptates quod nam vero! Consectetur commodi doloremque quo? Quae illo a hic! Harum incidunt molestias repellendus esse libero cumque architecto deleniti? In impedit laudantium dolore error ipsum soluta eligendi pariatur alias nulla reiciendis enim, ex dignissimos. Officia eos voluptates expedita? Aut minima quis officiis. Molestiae itaque voluptas at dignissimos. Molestias molestiae tenetur veritatis, harum tempore voluptate quasi qui, architecto, sit optio dolor inventore? Distinctio tempora hic veritatis consectetur id consequuntur adipisci doloremque.</p>
                <br /><br />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores necessitatibus doloremque adipisci. Accusantium perspiciatis quisquam repudiandae dolorem ducimus libero! Voluptatum tempore repellendus laboriosam enim voluptas optio vitae provident eos iste? Voluptate earum enim sed culpa ab veritatis ea omnis. Perferendis autem minus dolor quas pariatur alias, explicabo ea, nostrum voluptatem culpa tenetur temporibus. Quod, nulla accusantium quidem, molestias maiores perspiciatis dolor iure voluptates deserunt quo id, nesciunt reprehenderit ratione esse et! Totam voluptatem vel nesciunt maiores. Magnam impedit minima dolorum omnis iusto quam minus! Assumenda perspiciatis dolore deserunt nesciunt repellendus natus nihil itaque veniam modi, ullam provident distinctio ipsum.</p>
                <br /><br />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur distinctio, animi quisquam labore dolor vero odio eos vel quia quasi tenetur impedit? Maiores impedit numquam aperiam dicta magni delectus ea consequuntur incidunt sint, error ratione natus repudiandae eaque quam est inventore debitis? Amet fugit nesciunt omnis aperiam nihil, necessitatibus itaque quisquam quas nisi est quod aliquam similique delectus rem voluptatem nemo, eius odit, aut soluta ut id. Accusantium officia, corporis officiis ducimus exercitationem ipsa! Quo nobis alias quae dolores hic officia eum ut consectetur. Natus exercitationem ducimus quae sunt consequuntur at, blanditiis iste et omnis amet sint in porro quam?</p>
            </div>


            {/* Button to activate comment */}
            <button
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    fontWeight: `${giveFeedback? 'bold' : 'normal'}`
                }}
                onClick={() => setGiveFeedback(!giveFeedback)}
            >{`${giveFeedback? 'Deactivate' : 'Activate'}`}</button>

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
                    <button onClick={closeCommentPopup}>Close</button>
                    {selectedComment.completed || <button onClick={()=> setCompleted(selectedComment)}>Complete</button>}
                </div>
            )}
        </div>
    );
};

export default App;
