import { useState } from 'react';
import './App.css'

function App() {
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);

  const handlePageClick = (e) => {
    // Get click coordinates relative to the viewport
    const { clientX, clientY } = e;
    setModalPosition({ x: clientX, y: clientY });
    setShowModal(true); // Show the modal at click position
  };

  const closeModal = (event) => {
    const form = event.target;
    const comment = form.comment.value;
    console.log(comment);
    setShowModal(false);
  };

  return (
    <div onClick={handlePageClick} style={{ height: '100vh', cursor: 'pointer' }}>
      <h2>Page Title</h2>

      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nostrum perferendis voluptas praesentium voluptate fuga cum quaerat dicta numquam perspiciatis odit, assumenda architecto exercitationem dignissimos cumque magni quo corporis. Et rerum nostrum voluptate odio nobis cum officia repudiandae reiciendis in assumenda ad aspernatur quo, sequi sint numquam. Doloremque harum commodi deleniti iure qui architecto consequuntur ipsa aliquam esse, voluptas possimus quasi ipsum voluptatum rem ut nobis odio cum beatae quia, veritatis provident corporis. Iusto non neque aperiam cupiditate dolore tempora excepturi reiciendis, veniam corrupti deserunt, blanditiis in aliquam est quis corporis maxime temporibus similique libero? Repellendus error odit veniam quisquam!</p>
      <br /> <br />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod natus aliquam consectetur excepturi sed eius earum, accusamus quas, tempora minus, laudantium doloribus architecto harum cumque magni! Iusto reiciendis quas dolorem consequuntur accusantium. Nobis veniam cupiditate sapiente blanditiis deserunt voluptatum unde quam itaque molestiae est impedit provident at sunt in nostrum quibusdam illo earum veritatis inventore, quasi accusantium alias esse! Quaerat impedit deleniti, cum tempora nesciunt ea id ipsa harum necessitatibus blanditiis omnis, animi voluptatum perspiciatis tenetur. Amet voluptatum facere laboriosam laudantium quasi ex ipsa? Nesciunt tenetur sequi eveniet explicabo officiis ullam itaque id laboriosam, quam tempore dignissimos vel, exercitationem corrupti.</p>
      <br /> <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dignissimos voluptate repellendus aliquam quis quisquam omnis quas adipisci consequatur iure voluptatem dolore et, similique ad veniam id eos, dolorum beatae consequuntur iste ratione quam non quo? Id qui dolores officiis quam excepturi corrupti voluptate iste eos error ea, possimus voluptatem magnam quos? Rem, dignissimos quo! Voluptates nostrum quis atque amet expedita ex. Sapiente perspiciatis facilis obcaecati ut nihil corporis nostrum. Consequatur, accusamus dicta ipsam eligendi ex animi eaque quia aliquam repellendus neque saepe explicabo voluptatibus minus placeat est odit rerum corrupti omnis tempora. Provident eligendi tempora, molestiae libero ipsa cum.</p>


      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: 'absolute',
            top: modalPosition.y,
            left: modalPosition.x,
            transform: 'translate(-50%, -50%)', // Center the modal at the click position
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
          }}
          onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
        >
          <form onSubmit={closeModal}>
            <label htmlFor="comment">Put your feedback here: </label>
            <textarea name="comment" id="comment" rows={5}></textarea>
            <input type='submit' value={"Post"} />
          </form>
        </div>
      )}
    </div>
  )
}

export default App
