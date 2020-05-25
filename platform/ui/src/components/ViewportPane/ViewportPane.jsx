import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrop } from 'react-dnd';

// NOTE: If we found a way to make `useDrop` conditional,
// Or we provided a HOC of this component, we could provide
// this UI without the DragAndDropContext dependency.
function ViewportPane({
  children,
  className,
  isActive,
  onClick,
  onDrop,
  onScroll,
  onWheel,
  acceptDropsFor,
}) {
  const [{ isHovered, isHighlighted }, drop] = useDrop({
    accept: acceptDropsFor,
    // TODO: pass in as prop?
    drop: (droppedItem, monitor) => {
      const canDrop = monitor.canDrop();
      const isOver = monitor.isOver();

      if (canDrop && isOver && onDrop) {
        onDrop(droppedItem);
      }
    },
    // Monitor, and collect props; returned as values by `useDrop`
    collect: monitor => ({
      isHighlighted: monitor.canDrop(),
      isHovered: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      // onInteraction...
      // https://reactjs.org/docs/events.html#mouse-events
      // https://stackoverflow.com/questions/8378243/catch-scrolling-event-on-overflowhidden-element
      // setActiveViewport
      onClick={onClick}
      onScroll={onScroll}
      onWheel={onWheel}
      onSc
      className={classnames(
        'rounded-lg hover:border-primary-light transition duration-300 outline-none overflow-hidden',
        {
          'border-2 border-primary-light m-0': isActive,
          'border border-secondary-light': !isActive,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

ViewportPane.propTypes = {
  /** The ViewportComp */
  children: PropTypes.node.isRequired,
  /** Classes to append to container */
  className: PropTypes.string,
  /** Bool to show active styling */
  isActive: PropTypes.bool.isRequired,
  /** Indicates drag items we should accept for drops */
  acceptDropsFor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  /** Function that handles drop events */
  onDrop: PropTypes.func.isRequired,
  onScroll: PropTypes.func,
  onWheel: PropTypes.func,
};

const noop = () => {};

ViewportPane.defaultProps = {
  onClick: noop,
  onScroll: noop,
  onWheel: noop,
}

export default ViewportPane;
