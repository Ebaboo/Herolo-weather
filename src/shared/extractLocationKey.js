export function extractLocationKey(MyString) {
  const splittedString = MyString.split('/');
  return splittedString[6].toUpperCase();
}