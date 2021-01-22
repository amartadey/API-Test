const friend1 = {
  name: "Laurence",
};
const friend2 = {
  name: "John",
};
const friend3 = {
  name: "Jane",
};
const friends = [friend1, friend2];
friends.push(friend3);

friends.forEach((friend) => {
  friend.lastname = "Smith";
});
console.log(JSON.stringify(friends));
const str =
  '[{"name":"Laurence","lastname":"Smith"},{"name":"John","lastname":"Smith"},{"name":"Jane","lastname":"Smith"}]';
const parse = JSON.parse(str);

console.log(parse);
