import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Node from "~/models/Node";
import MoveSelected from "./MoveSelected";
import { onNodeClick } from "~/actions/controller";
import { ACTIVE_COLOR, NODE_COLOR } from "~/constants";

class NodeDrawing extends React.Component {
	onMouseDown(event) {
		const { node } = this.props;
		MoveSelected.move(event, node);
		onNodeClick(node, event.ctrlKey);
		event.stopPropagation();
	}

	getFillColor() {
		const { node, activeItem } = this.props;
		if (
			activeItem &&
			activeItem.type === "NODE" &&
			node.name === activeItem.name
		) {
			return ACTIVE_COLOR;
		}
		return NODE_COLOR;
	}

	renderTitle() {
		const { node, showProperties } = this.props;
		if (!showProperties) return null;

		return (
			<text x={node.x + 12} y={node.y + 4} className="small-svg-text">
				{node.toString()}
			</text>
		);
	}

	render() {
		const { node } = this.props;
		return (
			<g>
				<ellipse
					fill={this.getFillColor()}
					cx={node.x}
					cy={node.y}
					rx="10"
					ry="10"
					cursor="move"
					onMouseDown={event => {
						this.onMouseDown(event);
					}}
				>
					<title>{node.toString()}</title>
				</ellipse>
				{this.renderTitle()}
			</g>
		);
	}
}

NodeDrawing.propTypes = {
	node: PropTypes.instanceOf(Node).isRequired,
	activeItem: PropTypes.objectOf(PropTypes.any),
	showProperties: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	activeItem: state.activeItem,
	showProperties: state.showProperties,
});

export default connect(mapStateToProps, null)(NodeDrawing);