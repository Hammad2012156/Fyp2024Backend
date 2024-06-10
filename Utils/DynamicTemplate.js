// exports.Template = (template, keyword) => {
//   try {
//     let dynamictemplate = template;
//     const keys = Object.keys(keyword);
//     console.log(keys);
//     console.log(keyword);
//     for (const i of keys) {
//       dynamictemplate = dynamictemplate.replaceAll(`[user]`, keyword);
//     }
//     return dynamictemplate;
//   } catch (err) {
//     throw new Error("Invalid Format!");
//   }
// };
exports.replacePlaceholders = (htmlString, data) => {
  console.log(data, "replace wala");
  var regex = /\[(.*?)\]/g;
  var replacedString = htmlString.replace(regex, function (match, placeholder) {
    return data[placeholder] || "";
  });
  return replacedString;
};
