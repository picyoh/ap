export const removeTags = () => {
  // get answer's tags nodes
  const answerTags = document.querySelectorAll(".answer_tag");
  // get values array
  const ansTagArray = Array.from(answerTags, (node) => node.value);
  // get tags nodes
  const tags = document.querySelectorAll(".tag");
  // get tags array 
  const tagsArray = Array.from(tags, (node) => node.id);
  //console.log(tagsArray, ansTagArray);
  
  // comparing tag container and answer tags values
  tagsArray.forEach((tag) => {
    if (!ansTagArray.includes(tag)) {
      document.getElementById(tag).remove();
    }
  });
};
