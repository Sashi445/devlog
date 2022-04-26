const axios = require("axios");
class Node {
  constructor(sha, nodeId, message) {
    this.sha = sha;
    this.nodeId = nodeId;
    this.message = message;
    this.children = [];
  }

  printNode(){
    console.log({ 
        sha : this.sha,
        node : this.nodeId,
        message : this.message
     });
  }
}

function addChildren(root, node) {
    if (node.parents[0].sha === root.sha) {
        root.children = [...root.children, new Node(node.sha, node.node_id, node.commit.message)];
    } else {
      root.children.forEach(element => {
          addChildren(element, node);
      });
    }
}

function printTree(root){

    let queue = [];

    queue.push(root);

    while(queue.length > 0) {
        const first = queue.shift();
        first.printNode();
        first.children.forEach(e => {
            queue.push(e);
        })
    }
}


async function getCommits() {
  try {
    const response = await axios.get(
      "https://api.github.com/repos/Sashi445/DatastructuresandAlgorithms/commits",
      {
        headers: {
          Authorization: "Bearer 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",
          accept: "application/json",
        },
      }
    );

    return response.data
      .map((e) => {
        const { sha, node_id, parents, commit } = e;
        return { sha, node_id, parents, commit };
      })
      .reverse();
  } catch (e) {
    return e.message;
  }
}

getCommits()
  .then((res) => {
    let root = null;
    res.map((e) => {
      if (root == null) {
        root = new Node(e.sha, e.node_id, e.commit.message);
      } else {
        addChildren(root, e);
      }
    });
    printTree(root);
  
  })
  .catch((e) => {
    console.log(e.message);
  });
