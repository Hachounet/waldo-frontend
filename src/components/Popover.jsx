import { useState, useRef, useEffect } from 'react';
import Avatar from './Avatar';

const Popover = ({ children, position }) => {
  const [isVisible, setIsVisible] = useState(false); // Manages the visibility state of the popover
  const popoverRef = useRef(null); // Reference to the popover element
  const triggerRef = useRef(null); // Reference to the button element that triggers the popover

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsVisible(false); // Close the popover if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="popover-container">
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className="popover-trigger"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {children}
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className="popover-content z-10 bg-transparent backdrop-blur-sm backdrop-saturate-50"
          role="dialog"
          aria-modal="true"
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
          }}
        >
          <div className="">
            <span className=" text-yellow-50">Character</span>
            <ul className="flex flex-col">
              <li>
                <button>
                  <Avatar src="src/assets/batman.png" />
                </button>
              </li>
              <li>
                <button>
                  <Avatar src="src/assets/gladys.png" />
                </button>
              </li>
              <li>
                <button>
                  <Avatar src="src/assets/grievious.png" />
                </button>
              </li>
              <li>
                <button>
                  <Avatar src="src/assets/mrbook.png" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
