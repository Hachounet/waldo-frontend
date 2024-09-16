import Avatar from '../components/Avatar';
import Ring from '../components/Ring';
export default function CharactersHub() {
  return (
    <>
      <div className="max-w-fit max-h-fit flex gap-4 p-2 absolute top-0 right-96 z-20">
        <Ring characterID="1">
          <Avatar src="src/assets/batman.png" />
        </Ring>
        <Ring characterID="2">
          <Avatar src="src/assets/gladys.png" />
        </Ring>
        <Ring characterID="3">
          {' '}
          <Avatar src="src/assets/grievious.png" />
        </Ring>
        <Ring characterID="4">
          {' '}
          <Avatar src="src/assets/mrbook.png" />
        </Ring>
      </div>
    </>
  );
}
