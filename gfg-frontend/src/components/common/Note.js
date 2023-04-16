const Note = ({heading:heading}) => {
    return ( 
        <div className="note">
            {heading? <h1 className="h">{heading[0]} <span id="blue">{heading[1]}</span> {heading[2]}</h1> :""}
            <div className="bx">
                <h1>Heading</h1>
                <p>
                    Normal text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, exercitation ullamco laboris nisi ut aliquip ex ea commodo
                </p>
                <br />
                <h1>Heading</h1>
                <p>
                    Normal text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, exercitation ullamco laboris nisi ut aliquip ex ea commodo
                </p>
            </div>
        </div>
     );
}
 
export default Note;