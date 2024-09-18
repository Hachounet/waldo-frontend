import Avatar from '../components/Avatar';
import Ring from '../components/Ring';
export default function CharactersHub() {
  return (
    <>
      <div className="max-w-fit max-h-fit flex gap-4 p-2 absolute top-0 right-96 z-20">
        <Ring characterName="Batman">
          <Avatar src="src/assets/batman.png" />
        </Ring>
        <Ring characterName="Gladys">
          <Avatar src="src/assets/gladys.png" />
        </Ring>
        <Ring characterName="Grievious">
          {' '}
          <Avatar src="src/assets/grievious.png" />
        </Ring>
        <Ring characterName="Mr.Book">
          {' '}
          <Avatar src="src/assets/mrbook.png" />
        </Ring>
      </div>
    </>
  );
}
