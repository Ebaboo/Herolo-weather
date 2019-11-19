export function extractCityName(MyString) {
  const splittedString = MyString.split('/');
  let withoutDashLocationName = splittedString[5].replace('-', ' ');

  withoutDashLocationName = withoutDashLocationName.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');

  return withoutDashLocationName;
}