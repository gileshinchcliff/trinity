const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const get = require('lodash/get');

console.log("is this working?")
exports.onCreateNode = async (
    { node, actions, store, cache, createNodeId },
    options
) => {
    const { createNode } = actions;
    const {
        nodeType = 'GoogleCalendarEvent',
        imagePath = 'nodes.attachments[].fileUrl',
        name = 'localImage',
        auth = {},
        ext = null,
        prepareUrl = null,
    } = options;
    const createImageNodeOptions = {
        store,
        cache,
        createNode,
        createNodeId,
        auth,
        ext,
        name,
        prepareUrl,
    };
    console.log(node.internal.type)
    if (node.internal.type === nodeType) {
        console.log(node.internal.type)
        // Check if any part of the path indicates the node is an array and splits at those indicators
        let imagePathSegments = [];
        if (imagePath.includes('[].')) {
            imagePathSegments = imagePath.split('[].');
        }
        console.log(imagePathSegments)
        if (imagePathSegments.length) {
            await createImageNodesInArrays(imagePathSegments[0], node, {
                imagePathSegments,
                ...createImageNodeOptions,
            });
        } else {
            const url = getPath(node, imagePath, ext);
            await createImageNode(url, node, createImageNodeOptions);
        }
    }
};

// Returns value from path, adding extension when supplied
function getPath(node, path, ext = null) {
    const value = get(node, path);
    console.log(value)
    return ext ? value + ext : value;
}

// Creates a file node and associates the parent node to its new child
async function createImageNode(url, node, options) {
    console.log(url)
    console.log(node)
    console.log(options)
    const { name, imagePathSegments, prepareUrl, ...restOfOptions } = options;
    let fileNode;

    if (!url) {
        return;
    }

    if (typeof prepareUrl === 'function') {
        url = prepareUrl(url);
    }
    console.log(url)
    try {
        fileNode = await createRemoteFileNode({
            ...restOfOptions,
            url,
            parentNodeId: node.id,
        });
    } catch (e) {
        console.error('gatsby-plugin-remote-images ERROR:', e);
    }
    // Adds a field `localImage` or custom name to the node
    // ___NODE appendix tells Gatsby that this field will link to another node
    if (fileNode) {
        node[`${name}___NODE`] = fileNode.id;
    }
}

// Recursively traverses objects/arrays at each path part, then operates on targeted leaf node
async function createImageNodesInArrays(path, node, options) {
    if (!path || !node) {
        return;
    }
    const { imagePathSegments, ext } = options;
    const pathIndex = imagePathSegments.indexOf(path),
        isPathToLeafProperty = pathIndex === imagePathSegments.length - 1,
        nextValue = getPath(node, path, isPathToLeafProperty ? ext : null);
    // attachments = node.attachments
    // attachments.map( item =>
    //     console.log(item.fileUrl))

    // grab the parent of the leaf property, if it's not the current value of `node` already
    // ex: `parentNode` in `myNodes[].parentNode.leafProperty`
    let nextNode = node;
    if (isPathToLeafProperty && path.includes('.')) {
        const pathToLastParent = path
            .split('.')
            .slice(0, -1)
            .join('.');
        nextNode = get(node, pathToLastParent);
    }
    // console.log(nextNode)
    return Array.isArray(nextValue)
        ? // Recursively call function with next path segment for each array element
        Promise.all(
            nextValue.map(item =>
                createImageNodesInArrays(
                    imagePathSegments[pathIndex + 1],
                    item,
                    options
                ),
                // console.log("running function")
            ),
        )
        : // otherwise, handle leaf node
        createImageNode(nextValue, nextNode, options);
}
